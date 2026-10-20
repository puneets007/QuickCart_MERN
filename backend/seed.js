const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immersive sound experience with advanced active noise cancellation.',
    price: 299.99,
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ratings: 4.8,
    numReviews: 24
  },
  {
    name: 'Minimalist Modern Chair',
    description: 'A stylish and comfortable addition to any contemporary living room.',
    price: 150.00,
    category: 'Furniture',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ratings: 4.2,
    numReviews: 12
  },
  {
    name: 'Professional DSLR Camera',
    description: 'Capture stunning moments with high-resolution clarity and speed.',
    price: 1199.99,
    category: 'Electronics',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ratings: 4.9,
    numReviews: 50
  },
  {
    name: 'Classic White Sneakers',
    description: 'Versatile and comfortable, a staple for any casual outfit.',
    price: 85.00,
    category: 'Clothing',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ratings: 4.5,
    numReviews: 89
  }
];

const importData = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: 'admin@quickcart.com' });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('Password123', salt);
      await User.create({
        name: 'Admin User',
        email: 'admin@quickcart.com',
        password,
        role: 'admin'
      });
      console.log('Admin user created.');
    } else {
      console.log('Admin user already exists; leaving it unchanged.');
    }

    const existingNames = new Set(await Product.distinct('name'));
    const productsToInsert = sampleProducts.filter(({ name }) => !existingNames.has(name));
    if (productsToInsert.length > 0) {
      await Product.insertMany(productsToInsert);
    }

    console.log(`Seed complete: added ${productsToInsert.length} sample product(s); existing data was preserved.`);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

importData();