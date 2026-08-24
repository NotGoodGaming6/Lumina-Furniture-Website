const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Calculate distance from nested file back to the 'src' root.
const calculateAliasPath = (filePath, matchedImportPath) => {
  // filePath is absolute path to the file.
  // matchedImportPath is the relative string like '../../context/AuthContext'
  
  const fileDir = path.dirname(filePath);
  const absoluteTarget = path.resolve(fileDir, matchedImportPath);
  
  // If the target is NOT inside the srcDir (e.g., node_modules, or traversing above src), we skip it.
  if (!absoluteTarget.startsWith(srcDir)) {
    return null;
  }
  
  // Get relative path from srcDir to the target.
  const relativeToSrc = path.relative(srcDir, absoluteTarget);
  
  // Format with the alias
  // Replace Windows backslashes with standard forward slashes for imports
  const aliasPath = `@/${relativeToSrc.replace(/\\/g, '/')}`;
  return aliasPath;
};

const processFile = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Pattern to match import and export from statements: import ... from '../../xyz'
    // Matches quotes '...' or "..." starting with '.' or '..'
    const importRegex = /(?:import|export)\s+(?:.*?)\s+from\s+['"](\.{1,2}\/[^'"]+)['"]/g;
    
    // Also match dynamic imports: import('../../xyz')
    const dynamicImportRegex = /import\(['"](\.{1,2}\/[^'"]+)['"]\)/g;

    const replacer = (match, p1) => {
      const newAlias = calculateAliasPath(filePath, p1);
      if (newAlias) {
        modified = true;
        return match.replace(p1, newAlias);
      }
      return match;
    };

    content = content.replace(importRegex, replacer);
    content = content.replace(dynamicImportRegex, replacer);

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`[OPTIMIZED] Vite Alias Applied -> ${path.relative(__dirname, filePath)}`);
    }
  } catch (e) {
    console.error(`Error processing ${filePath}:`, e);
  }
};

const crawl = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      crawl(fullPath);
    } else if (['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(fullPath))) {
      processFile(fullPath);
    }
  }
};

console.log('--- STARTING REACT VITE ALIAS SWEEP ---');
crawl(srcDir);
console.log('--- ALGORITHMIC SWEEP COMPLETE ---');
