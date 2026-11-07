import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function fixPaths(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    
    if (file.isDirectory()) {
      await fixPaths(fullPath);
    } else if (file.name.endsWith('.html')) {
      let content = await readFile(fullPath, 'utf-8');
      
      // Contar niveles de profundidad desde dist/
      const depth = fullPath.split('/').length - fullPath.split('dist')[0].split('/').length - 1;
      const prefix = depth > 0 ? '../'.repeat(depth) : './';
      
      // Reemplazar rutas absolutas por relativas
      content = content
        .replace(/href="\//g, `href="${prefix}`)
        .replace(/src="\//g, `src="${prefix}`)
        .replace(/poster="\//g, `poster="${prefix}`)
        .replace(/href='\//g, `href='${prefix}`)
        .replace(/src='\//g, `src='${prefix}`)
        // Corregir rutas en background-image dentro de style
        .replace(/url\('\/([^']+)'\)/g, `url('${prefix}$1')`)
        .replace(/url\("\/([^"]+)"\)/g, `url("${prefix}$1")`)
        .replace(/url\(\/([^)]+)\)/g, `url(${prefix}$1)`)
        // No tocar URLs externas
        .replace(/href="\.\.\/https:/g, 'href="https:')
        .replace(/src="\.\.\/https:/g, 'src="https:')
        .replace(/href="\.\/https:/g, 'href="https:')
        .replace(/src="\.\/https:/g, 'src="https:')
        .replace(/url\('\.\.\/https:/g, "url('https:")
        .replace(/url\("\.\.\/https:/g, 'url("https:')
        .replace(/url\(\.\.\/https:/g, 'url(https:')
        .replace(/url\('\.\/https:/g, "url('https:")
        .replace(/url\("\.\/https:/g, 'url("https:')
        .replace(/url\(\.\/https:/g, 'url(https:');
      
      await writeFile(fullPath, content);
      console.log(`✓ Fixed: ${fullPath}`);
    }
  }
}

fixPaths('./dist').then(() => {
  console.log('✅ All paths fixed!');
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
