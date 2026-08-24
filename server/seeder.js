const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const Product = require('./models/misc/product.model.js');
const User = require('./models/user/user.model.js');

mongoose.connect(process.env.MONGO_URI, {
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
});

console.log('Connecting to MongoDB...');

mongoose.connection.on('connected', () => {
  console.log('✓ MongoDB Connected');
  if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  } else {
    console.log('Use -i to import data or -d to destroy data');
    process.exit(0);
  }
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/data/misc/products.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/user/users.json`, 'utf-8')
);

console.log(`Loaded ${products.length} products and ${users.length} users`);

const importData = async () => {
  try {
    console.log('Importing products...');
    await Product.create(products);
    console.log(`✓ Imported ${products.length} products`);

    console.log('Importing users...');
    await User.create(users);
    console.log(`✓ Imported ${users.length} users`);

    console.log('Data Imported Successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Import Error:', err.message);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    console.log('Deleting products...');
    await Product.deleteMany();
    console.log('✓ Products deleted');

    console.log('Deleting users...');
    await User.deleteMany();
    console.log('✓ Users deleted');

    console.log('Data Destroyed Successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Delete Error:', err.message);
    process.exit(1);
  }
};
