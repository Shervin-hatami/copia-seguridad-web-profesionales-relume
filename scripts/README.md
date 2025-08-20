# Script de Backup para Payload CMS

Este directorio contiene un script simple para hacer backup de los datos de tu aplicación Payload CMS.

## 🎯 ¿Qué hace este script?

El script hace backup de todos los datos de tu aplicación Payload CMS usando la API REST. Exporta:

- ✅ **Usuarios** - Todos los usuarios registrados
- ✅ **Posts** - Artículos del blog
- ✅ **Páginas** - Páginas del sitio web
- ✅ **Media** - Imágenes y archivos subidos
- ✅ **Categorías** - Categorías de contenido
- ✅ **Header y Footer** - Configuración global del sitio

## 📋 Requisitos Previos

1. **Aplicación ejecutándose**: Tu aplicación debe estar ejecutándose en `http://localhost:3000`
2. **Variables de entorno**: El archivo `.env` debe contener la configuración correcta de tu base de datos

## 🚀 Uso

### Crear un Backup

Para crear un backup completo de tus datos:

```bash
npm run backup
```

Esto creará un archivo `.json` en el directorio `backups/` con un timestamp en el nombre.

### Ver Backups Disponibles

Los backups se guardan automáticamente en el directorio `backups/` con nombres como:
```
backup-simple-2024-01-15T10-30-00-000Z.json
```

## 📁 Estructura de Archivos

```
scripts/
├── backup.js      # Script para crear backups
└── README.md      # Este archivo

backups/           # Directorio donde se guardan los backups (se crea automáticamente)
├── backup-simple-2024-01-15T10-30-00-000Z.json
├── backup-simple-2024-01-16T14-20-00-000Z.json
└── ...
```

## 🔧 Cómo Funciona

1. **Conecta a la API**: El script se conecta a la API REST de tu aplicación Payload
2. **Exporta datos**: Descarga todos los datos de cada colección y global
3. **Guarda archivo**: Crea un archivo JSON con todos los datos y metadatos
4. **Muestra información**: Te dice cuántos documentos se exportaron

## ⚠️ Limitaciones

- **Solo datos de Payload**: No incluye la estructura completa de la base de datos
- **Requiere aplicación activa**: Tu app debe estar ejecutándose en `localhost:3000`
- **Sin restore automático**: Este script solo hace backup, no restaura

## 🛠️ Solución de Problemas

### Error: "fetch failed"

Verifica que:
1. Tu aplicación esté ejecutándose (`npm run dev`)
2. La URL `http://localhost:3000` sea accesible
3. No haya errores en la consola de tu aplicación

### Error: "DATABASE_URI no está configurada"

Verifica que tu archivo `.env` contenga la variable `DATABASE_URI` con la configuración correcta.

### Error de conexión a la API

Verifica que:
1. Payload CMS esté configurado correctamente
2. Las rutas de la API estén disponibles
3. No haya problemas de CORS

## 📊 Información del Backup

Cada backup incluye:

```json
{
  "metadata": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "version": "1.0",
    "generatedBy": "Simple Backup Script",
    "collections": ["users", "posts", "pages", "media", "categories"],
    "globals": ["header", "footer"]
  },
  "collections": {
    "users": [...],
    "posts": [...],
    "pages": [...],
    "media": [...],
    "categories": [...]
  },
  "globals": {
    "header": {...},
    "footer": {...}
  }
}
```

## 💡 Consejos

- **Haz backups regulares**: Antes de hacer cambios importantes
- **Guarda los archivos**: Los backups están en `.gitignore` para no subirlos al repositorio
- **Verifica el contenido**: Abre el archivo JSON para verificar que se exportó correctamente
- **Usa nombres descriptivos**: Los timestamps te ayudan a identificar cuándo se hizo cada backup

## 🔄 Restauración Manual

Para restaurar datos desde un backup:

1. Abre el archivo JSON del backup
2. Copia los datos que necesites
3. Usa el admin panel de Payload para crear/actualizar los documentos
4. O usa la API de Payload para importar los datos programáticamente

## 📝 Notas

- Los backups se guardan en formato JSON, lo que los hace fáciles de leer y manipular
- El directorio `backups/` está incluido en `.gitignore` para evitar subir archivos grandes al repositorio
- Este script está diseñado para desarrollo local, no para producción
- Los backups incluyen metadatos para facilitar la identificación y gestión
