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

    // Fix db import
    content = content.replace(/import\s+\{\s*db\s*\}\s+from\s+'(.*\/db)'/g, "import { prisma as db } from '$1'");
    
    // Fix Prisma client imports
    // from '@prisma/client' -> from '../../generated/client' or appropriate relative path
    // Need to count depth to src to get relative path correctly. 
    // Or simply: from '@prisma/client' -> from '@prisma/client' might work if we generate it there. 
    // Wait, let's just use a generic regex for params string type cast.
    content = content.replace(/req\.params\.([a-zA-Z0-9_]+)([\s\),])/g, "req.params.$1 as string$2");
    
    // Fix the same for query params if needed
    content = content.replace(/req\.query\.([a-zA-Z0-9_]+)\s+as\s+string/g, "req.query.$1 as string");

    // Also let's fix req.user!.id being string or string[]
    content = content.replace(/req\.user!\.id/g, "req.user!.id as string");
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed:', filePath);
    }
  }
});
