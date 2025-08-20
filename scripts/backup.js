import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para extraer la configuración de la base de datos
function getDatabaseConfig() {
  try {
    // Cargar variables de entorno
    dotenv.config({ path: path.join(__dirname, '..', '.env') });
    
    const databaseUri = process.env.DATABASE_URI;
    if (!databaseUri) {
      throw new Error('DATABASE_URI no está configurada en las variables de entorno');
    }
    
    return databaseUri;
  } catch (error) {
    console.error('Error al obtener la configuración de la base de datos:', error.message);
    process.exit(1);
  }
}

// Función para crear el backup usando fetch a la API de Payload
async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '..', 'backups');
  const backupFile = path.join(backupDir, `backup-simple-${timestamp}.json`);
  
  // Crear directorio de backups si no existe
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  try {
    console.log('🔄 Iniciando backup simple de la base de datos...');
    console.log('📋 Exportando datos usando la API de Payload...');
    
    // URL base de tu aplicación (ajusta según tu configuración)
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    
    // Datos a exportar
    const collections = ['users', 'posts', 'pages', 'media', 'categories'];
    const globals = ['header', 'footer'];
    
    const backupData = {
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0',
        generatedBy: 'Simple Backup Script',
        collections: [],
        globals: []
      },
      collections: {},
      globals: {}
    };
    
    // Exportar colecciones
    console.log('📊 Exportando colecciones...');
    for (const collection of collections) {
      try {
        console.log(`   📝 Procesando: ${collection}`);
        
        // Hacer petición a la API de Payload
        const response = await fetch(`${baseUrl}/api/${collection}?limit=1000`);
        
        if (response.ok) {
          const data = await response.json();
          backupData.collections[collection] = data;
          backupData.metadata.collections.push(collection);
          console.log(`   ✅ ${collection}: ${data.docs?.length || 0} documentos`);
        } else {
          console.log(`   ⚠️  ${collection}: No disponible (${response.status})`);
        }
      } catch (error) {
        console.log(`   ❌ ${collection}: Error - ${error.message}`);
      }
    }
    
    // Exportar globales
    console.log('🌐 Exportando globales...');
    for (const global of globals) {
      try {
        console.log(`   📝 Procesando: ${global}`);
        
        // Hacer petición a la API de Payload
        const response = await fetch(`${baseUrl}/api/globals/${global}`);
        
        if (response.ok) {
          const data = await response.json();
          backupData.globals[global] = data;
          backupData.metadata.globals.push(global);
          console.log(`   ✅ ${global}: Exportado`);
        } else {
          console.log(`   ⚠️  ${global}: No disponible (${response.status})`);
        }
      } catch (error) {
        console.log(`   ❌ ${global}: Error - ${error.message}`);
      }
    }
    
    // Escribir el archivo de backup
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), 'utf8');
    
    const stats = fs.statSync(backupFile);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log('✅ Backup completado exitosamente');
    console.log(`📁 Backup guardado en: ${backupFile}`);
    console.log(`📊 Tamaño del archivo: ${fileSizeInMB} MB`);
    console.log(`📋 Colecciones exportadas: ${backupData.metadata.collections.length}`);
    console.log(`🌐 Globales exportados: ${backupData.metadata.globals.length}`);
    
  } catch (error) {
    console.error('❌ Error durante el backup:', error.message);
    console.log('💡 Verifica que:');
    console.log('   - Tu aplicación esté ejecutándose (npm run dev)');
    console.log('   - La URL base sea correcta');
    console.log('   - Tengas acceso a la API de Payload');
    process.exit(1);
  }
}

// Ejecutar el backup
createBackup().catch(console.error);
