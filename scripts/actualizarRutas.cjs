const fs = require('fs');
const path = require('path');

// Función recursiva para buscar archivos en la carpeta app/ o src/
function buscarYReemplazar(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Ignorar node_modules y carpetas ocultas
      if (file !== 'node_modules' && !file.startsWith('.')) {
        buscarYReemplazar(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let contenido = fs.readFileSync(filePath, 'utf8');
      
      // Expresión regular para buscar /MAPA sin importar comillas simples o dobles
      const regex = /["']\/MAPA["']/g;

      if (regex.test(contenido)) {
        // Reemplaza por la versión en minúscula
        contenido = contenido.replace(/["']\/MAPA["']/g, '"/mapa"');
        fs.writeFileSync(filePath, contenido, 'utf8');
        console.log(`Ruta actualizada en: ${filePath}`);
      }
    }
  });
}

// Ejecutar en la carpeta 'app' (ajusta si usas otra estructura como 'src/app')
const carpetaApp = path.join(__dirname, 'app');
if (fs.existsSync(carpetaApp)) {
  buscarYReemplazar(carpetaApp);
  console.log('¡Proceso terminado con éxito!');
} else {
  console.log('No se encontró la carpeta "app" en la raíz del proyecto.');
}