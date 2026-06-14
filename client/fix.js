const fs = require('fs');
const path = require('path');
const dir = 'src/components/Uploader';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // It currently looks like: ${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/compress-pdf"
  // We want to replace it with: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/compress-pdf`
  
  content = content.replace(/\$\{process\.env\.REACT_APP_API_URL \|\| 'http:\/\/localhost:5000'\}(\/[a-zA-Z0-9\-\/]+)\"/g, (match, p1) => {
    return '`' + "${process.env.REACT_APP_API_URL || 'http://localhost:5000'}" + p1 + '`';
  });

  fs.writeFileSync(filePath, content);
}
console.log('Fixed successfully!');
