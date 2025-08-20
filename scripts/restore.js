import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para listar backups disponibles
function listBackups() {
  const backupDir = path.join(__dirname, '..', 'backups');
  
  if (!fs.existsSync(backupDir)) {
    console.log('❌ No existe el directorio de backups');
    return [];
  }
  
  const files = fs.readdirSync(backupDir)
    .filter(file => file.startsWith('backup-simple-') && file.endsWith('.json'))
    .sort()
    .reverse(); // Más recientes primero
  
  return files;
}

// Función para mostrar información del backup
function showBackupInfo(backupFile) {
  const backupPath = path.join(__dirname, '..', 'backups', backupFile);
  
  if (!fs.existsSync(backupPath)) {
    console.error(`❌ El archivo de backup no existe: ${backupPath}`);
    process.exit(1);
  }
  
  try {
    console.log('📋 Información del backup:');
    console.log(`📁 Archivo: ${backupFile}`);
    
    // Leer el archivo de backup
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    const backupData = JSON.parse(backupContent);
    
    console.log(`📅 Generado: ${backupData.metadata.timestamp}`);
    console.log(`📊 Colecciones: ${backupData.metadata.collections.join(', ')}`);
    console.log(`🌐 Globales: ${backupData.metadata.globals.join(', ')}`);
    
    // Mostrar información detallada de los datos
    console.log('\n📊 Contenido del backup:');
    
    // Información de colecciones
    for (const collectionName of backupData.metadata.collections) {
      const collection = backupData.collections[collectionName];
      const docCount = collection.docs?.length || 0;
      console.log(`   📝 ${collectionName}: ${docCount} documentos`);
    }
    
    // Información de globales
    console.log('\n🌐 Globales:');
    for (const globalName of backupData.metadata.globals) {
      const global = backupData.globals[globalName];
      if (global.navItems && global.navItems.length > 0) {
        console.log(`   ✅ ${globalName}: ${global.navItems.length} elementos de navegación`);
        global.navItems.forEach((item, index) => {
          const label = item.link?.label || 'Sin etiqueta';
          console.log(`      - ${index + 1}. ${label}`);
        });
      } else {
        console.log(`   ⚠️  ${globalName}: Vacío`);
      }
    }
    
    console.log('\n💡 Para restaurar este backup:');
    console.log('   1. Ve a http://localhost:3000/admin');
    console.log('   2. Navega a Globals > Header');
    console.log('   3. Copia los datos del backup y pégalos manualmente');
    console.log('   4. Repite para Footer si es necesario');
    
    // Mostrar los datos del header para copiar fácilmente
    if (backupData.globals.header && backupData.globals.header.navItems) {
      console.log('\n📋 Datos del Header para copiar:');
      console.log(JSON.stringify(backupData.globals.header, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error al leer el backup:', error.message);
    process.exit(1);
  }
}

// Función principal
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('📋 Backups disponibles:');
    const backups = listBackups();
    
    if (backups.length === 0) {
      console.log('❌ No hay backups disponibles');
      console.log('💡 Ejecuta "npm run backup" para crear un backup');
      return;
    }
    
    backups.forEach((file, index) => {
      const stats = fs.statSync(path.join(__dirname, '..', 'backups', file));
      const date = stats.mtime.toLocaleString('es-ES');
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`${index + 1}. ${file} (${date}) - ${fileSizeInMB} MB`);
    });
    
    console.log('\n💡 Para ver información de un backup, ejecuta:');
    console.log('   npm run restore <nombre-del-archivo>');
    console.log('   Ejemplo: npm run restore backup-simple-2025-08-20T09-25-29-735Z.json');
    return;
  }
  
  const backupFile = args[0];
  showBackupInfo(backupFile);
}

// Ejecutar la función principal
main();
