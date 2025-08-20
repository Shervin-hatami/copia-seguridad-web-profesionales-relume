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

// Función para restaurar automáticamente usando el endpoint
async function restoreBackupAuto(backupFile) {
  const backupPath = path.join(__dirname, '..', 'backups', backupFile);
  
  if (!fs.existsSync(backupPath)) {
    console.error(`❌ El archivo de backup no existe: ${backupPath}`);
    process.exit(1);
  }
  
  try {
    console.log('🔄 Iniciando restauración automática...');
    console.log(`📋 Backup: ${backupFile}`);
    
    // URL base de tu aplicación
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    
    // Hacer petición al endpoint de restauración
    const response = await fetch(`${baseUrl}/api/restore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ backupFile })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Restauración automática completada');
      console.log(`📁 Backup restaurado: ${result.backup}`);
      
      if (result.results.success.length > 0) {
        console.log('\n✅ Elementos restaurados:');
        result.results.success.forEach(item => {
          console.log(`   ✅ ${item}`);
        });
      }
      
      if (result.results.errors.length > 0) {
        console.log('\n❌ Errores durante la restauración:');
        result.results.errors.forEach(error => {
          console.log(`   ❌ ${error}`);
        });
      }
      
    } else {
      console.error('❌ Error durante la restauración:', result.error);
      if (result.details) {
        console.error('   Detalles:', result.details);
      }
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('💡 Verifica que:');
    console.log('   - Tu aplicación esté ejecutándose en http://localhost:3000');
    console.log('   - El endpoint /api/restore esté disponible');
    process.exit(1);
  }
}

// Función principal
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('📋 Backups disponibles para restauración automática:');
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
    
    console.log('\n💡 Para restaurar automáticamente, ejecuta:');
    console.log('   npm run restore:auto <nombre-del-archivo>');
    console.log('   Ejemplo: npm run restore:auto backup-simple-2025-08-20T09-25-29-735Z.json');
    return;
  }
  
  const backupFile = args[0];
  restoreBackupAuto(backupFile);
}

// Ejecutar la función principal
main();
