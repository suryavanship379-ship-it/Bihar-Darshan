const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace from '@prisma/client' to from '../../db' (or appropriate relative depending on depth)
    // Actually, easier just to replace all "@prisma/client" with the relative path to db.ts
    // Let's calculate relative path
    const depth = filePath.split(path.sep).length - path.join(__dirname, 'src').split(path.sep).length;
    let prefix = '';
    for(let i=0; i<depth - 1; i++) prefix += '../';
    if(prefix === '') prefix = './';
    
    content = content.replace(/from\s+['"]@prisma\/client['"]/g, `from '${prefix}db'`);
    
    // Also, there are places where I forgot to parse correctly, like publishedDate type
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed Prisma Client Import in:', filePath);
    }
  }
});
