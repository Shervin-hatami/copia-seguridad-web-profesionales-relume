import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { backupFile } = await request.json();
    
    if (!backupFile) {
      return NextResponse.json({ error: 'Backup file name is required' }, { status: 400 });
    }
    
    const backupPath = path.join(process.cwd(), 'backups', backupFile);
    
    if (!fs.existsSync(backupPath)) {
      return NextResponse.json({ error: 'Backup file not found' }, { status: 404 });
    }
    
    // Leer el archivo de backup
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    const backupData = JSON.parse(backupContent);
    
    // Importar Payload dinámicamente
    const { default: payloadConfig } = await import('../../../payload.config');
    const { getPayload } = await import('payload');
    const payload = await getPayload({ config: payloadConfig });
    
    const results: {
      success: string[];
      errors: string[];
    } = {
      success: [],
      errors: []
    };
    
    // Restaurar globales de forma más segura
    for (const globalName of backupData.metadata.globals) {
      try {
        const globalData = backupData.globals[globalName];
        
        // Solo restaurar campos específicos y seguros
        const safeData: any = {};
        
        // Para header: restaurar navItems con referencias convertidas a enlaces simples
        if (globalName === 'header' && globalData.navItems) {
          safeData.navItems = globalData.navItems.map((item: any) => {
            const cleanItem: any = {};
            
            if (item.link) {
              cleanItem.link = {
                type: item.link.type === 'reference' ? 'custom' : item.link.type || 'custom',
                label: item.link.label || '',
                url: item.link.url || '#',
                newTab: item.link.newTab || false
              };
              
              // Si es una referencia, convertir a URL basada en el slug
              if (item.link.type === 'reference' && item.link.reference?.value?.slug) {
                cleanItem.link.url = `/${item.link.reference.value.slug}`;
              }
            }
            
            return cleanItem;
          });
        }
        
        // Para footer: restaurar navItems con referencias convertidas a enlaces simples
        if (globalName === 'footer' && globalData.navItems) {
          safeData.navItems = globalData.navItems.map((item: any) => {
            const cleanItem: any = {};
            
            if (item.link) {
              cleanItem.link = {
                type: item.link.type === 'reference' ? 'custom' : item.link.type || 'custom',
                label: item.link.label || '',
                url: item.link.url || '#',
                newTab: item.link.newTab || false
              };
              
              // Si es una referencia, convertir a URL basada en el slug
              if (item.link.type === 'reference' && item.link.reference?.value?.slug) {
                cleanItem.link.url = `/${item.link.reference.value.slug}`;
              }
            }
            
            return cleanItem;
          });
        }
        
        // También restaurar otros campos del footer si existen
        if (globalName === 'footer') {
          if (globalData.copyright) safeData.copyright = globalData.copyright;
          if (globalData.socialLinks) {
            safeData.socialLinks = globalData.socialLinks.map((link: any) => ({
              platform: link.platform || '',
              url: link.url || '#'
            }));
          }
        }
        
        // Solo actualizar si tenemos datos seguros para restaurar
        if (Object.keys(safeData).length > 0) {
          await payload.updateGlobal({
            slug: globalName,
            data: safeData
          });
          results.success.push(`${globalName}: Restaurado (modo seguro)`);
        } else {
          results.errors.push(`${globalName}: No hay datos seguros para restaurar`);
        }
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        results.errors.push(`${globalName}: ${errorMessage}`);
      }
    }
    
    // Restaurar páginas de forma segura
    if (backupData.collections.pages && backupData.collections.pages.docs) {
      console.log('📄 Restaurando páginas...');
      
      for (const page of backupData.collections.pages.docs) {
        try {
          // Limpiar datos de la página
          const cleanPage: any = {
            title: page.title,
            slug: page.slug,
            _status: page._status || 'published'
          };
          
          // Restaurar hero si existe
          if (page.hero) {
            cleanPage.hero = {
              type: page.hero.type || 'lowImpact',
              richText: page.hero.richText,
              links: page.hero.links || [],
              media: page.hero.media
            };
          }
          
          // Restaurar layout si existe
          if (page.layout && Array.isArray(page.layout)) {
            cleanPage.layout = page.layout.map((block: any) => {
              const cleanBlock: any = {
                blockType: block.blockType,
                blockName: block.blockName
              };
              
              // Copiar campos específicos según el tipo de bloque
              if (block.heading) cleanBlock.heading = block.heading;
              if (block.description) cleanBlock.description = block.description;
              if (block.inputPlaceholder) cleanBlock.inputPlaceholder = block.inputPlaceholder;
              if (block.logo) cleanBlock.logo = block.logo;
              if (block.button) cleanBlock.button = block.button;
              
              return cleanBlock;
            });
          }
          
          // Restaurar meta si existe
          if (page.meta) {
            cleanPage.meta = {
              title: page.meta.title,
              description: page.meta.description,
              image: page.meta.image
            };
          }
          
          // Verificar si la página ya existe
          const existingPage = await payload.find({
            collection: 'pages',
            where: {
              slug: { equals: page.slug }
            }
          });
          
          if (existingPage.docs.length > 0) {
            // Actualizar página existente
            await payload.update({
              collection: 'pages',
              id: existingPage.docs[0].id,
              data: cleanPage
            });
            results.success.push(`Página "${page.title}" actualizada`);
          } else {
            // Crear nueva página
            await payload.create({
              collection: 'pages',
              data: cleanPage
            });
            results.success.push(`Página "${page.title}" creada`);
          }
          
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          results.errors.push(`Página "${page.title}": ${errorMessage}`);
        }
      }
    }
    
    await payload.destroy();
    
    return NextResponse.json({
      message: 'Restauración completada',
      backup: backupFile,
      results
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ 
      error: 'Error durante la restauración',
      details: errorMessage 
    }, { status: 500 });
  }
}
