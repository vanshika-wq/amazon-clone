const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGO_URI);

const users = [
  { name: 'Admin User', email: 'admin@example.com', password: bcrypt.hashSync('123456', 10), isAdmin: true },
  { name: 'John Doe', email: 'john@example.com', password: bcrypt.hashSync('123456', 10) },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = [
      { user: adminUser, name: 'Apple AirPods Pro', image: 'https://images-na.ssl-images-amazon.com/images/I/61SUj2aKoEL._SL1500_.jpg', brand: 'Apple', category: 'Electronics', description: 'Active Noise Cancelling, Transparency mode, Spatial Audio with dynamic head tracking, Adaptive EQ.', rating: 4.5, numReviews: 12, price: 249.99, countInStock: 25 },
      { user: adminUser, name: 'iPhone 15 Pro', image: 'https://images-na.ssl-images-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg', brand: 'Apple', category: 'Electronics', description: 'A17 Pro chip. A monster win for gaming. Titanium design. USB 3 speeds. 48MP Main camera.', rating: 4.8, numReviews: 34, price: 999.99, countInStock: 10 },
      { user: adminUser, name: 'Sony PlayStation 5', image: 'https://images-na.ssl-images-amazon.com/images/I/619T6jM4MpL._SL1500_.jpg', brand: 'Sony', category: 'Gaming', description: 'Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback.', rating: 4.9, numReviews: 60, price: 499.99, countInStock: 5 },
      { user: adminUser, name: 'Samsung 65" 4K Smart TV', image: 'https://images-na.ssl-images-amazon.com/images/I/71ZQ6oBFiQL._SL1500_.jpg', brand: 'Samsung', category: 'Electronics', description: 'Quantum HDR, QLED technology, Real Game Enhancer+, Object Tracking Sound.', rating: 4.6, numReviews: 28, price: 1199.99, countInStock: 8 },
      { user: adminUser, name: 'Nike Air Max 270', image: 'https://images-na.ssl-images-amazon.com/images/I/71ov7yM3+wL._UX500_.jpg', brand: 'Nike', category: 'Clothing', description: 'The Nike Air Max 270 features Nike biggest heel Air unit yet for an extremely plush ride.', rating: 4.3, numReviews: 15, price: 129.99, countInStock: 50 },
      { user: adminUser, name: 'Kindle Paperwhite', image: 'https://images-na.ssl-images-amazon.com/images/I/51Kx5AOYOFL.jpg', brand: 'Amazon', category: 'Electronics', description: 'Thin, light Kindle Paperwhite with a flush-front design, 6.8" display, 300 ppi for crisp text.', rating: 4.7, numReviews: 89, price: 139.99, countInStock: 30 },
    ];

    await Product.insertMany(sampleProducts);
    console.log('✅ Data imported successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

importData();
