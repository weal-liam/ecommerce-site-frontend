const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../../public/products.json');
const outputPath = path.join(__dirname, '../../public/products_transformed.json');

const raw = fs.readFileSync(inputPath, 'utf-8');
const { products } = JSON.parse(raw);

const transformed = products.map(p => ({
  name: p.title, // or p.name if already present
  description: p.description,
  price: p.price,
  image: null, // keep as is
  image_url: p.image, // keep as is, or use p.image_url if present
  is_available: true, // or set as needed
  category: p.category,
}));

fs.writeFileSync(outputPath, JSON.stringify({ products: transformed }, null, 2));
console.log('Transformed products written to', outputPath);