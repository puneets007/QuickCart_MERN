const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const sampleProducts = [
  {
     name: 'Blackout Window Curtains',
  description: 'Room Darkening Window Curtains – Set of 2, Plain Design for Bedroom and Living Room, 5 Feet, Coffee.',
  price: Double('619'),
  category: 'Home Furnishing',
  stock: NumberInt('98'),
  imageUrl: 'https://m.media-amazon.com/images/I/71ETVlbltKL._SY450_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
     name: 'Stylish Sunglasses',
  description: 'Full Rim Square | Polarized Stylish Sunglasses | 100% UV Protected | For Men & Women.',
  price: Double('649'),
  category: 'Clothing & Accessories',
  stock: NumberInt('38'),
  imageUrl: 'https://m.media-amazon.com/images/I/61LuLR7IR5L._SX522_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
    name: 'Basketball',
  description: 'Rubber Moulded Indoor/Outdoor Basketball with Butyl Bladder, Suitable for Practice/Match/Training.',
  price: Double('849'),
  category: 'Sports, Fitness & Outdoors',
  stock: NumberInt('19'),
  imageUrl: 'https://m.media-amazon.com/images/I/71wXaCjnnGL._SL1500_.jpg',
  ratings: Double('4.8'),
  numReviews: NumberInt('24')
  },
  {
   name: '3 Pc Cookware Set',
  description: 'Non-Stick 3 Pc Cookware Set with Glass Lid | 5-Layer Coating | Gas & Induction Compatible | Omni Tawa 25cm | Fry Pan 24cm | Kadai 24cm | Crimson Red |2Y Warranty.',
  price: NumberInt('1749'),
  category: 'Home & Kitchen',
  stock: NumberInt('30'),
  imageUrl: 'https://m.media-amazon.com/images/I/51OUmYcUalL._SL1200_.jpg',
  ratings: Double('4.2'),
  numReviews: NumberInt('12')
  },
  {
    name: 'Steel Dining Chair with Cushion ',
  description: 'Multi-Purpose Chair Heavy Duty for Café, Study, Hostel, Restaurant, Home, Office (1, Black, Standard).',
  price: NumberInt('999'),
  category: 'Furniture',
  stock: NumberInt('50'),
  imageUrl: 'https://m.media-amazon.com/images/I/51NEFDKObiL._SY450_.jpg',
  ratings: Double('4.5'),
  numReviews: NumberInt('89')
  },
  {
    name: 'Wireless Headphones',
  description: 'BT v5.3, Upto 60 hrs Playback, 40mm Drivers, Deep Bass, ENC, Gaming Mode, Dual Pairing, LED Lights, Media/Volume Control, Call Function (Black).',
  price: Double('1099'),
  category: 'Electronics',
  stock: NumberInt('68'),
  imageUrl: 'https://m.media-amazon.com/images/I/61r-vi2d5HL._SY450_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
   name: 'Yoga Mat',
  description: '6mm Dual Color TPE Material Anti-Slip Yoga Mat for Home, Gym, Yoga, Workout and Exercise for Women & Men (6 Months Warranty,Llym115), Navy Blue/Blue.',
  price: Double('399'),
  category: 'Exercise & Fitness',
  stock: NumberInt('56'),
  imageUrl: 'https://m.media-amazon.com/images/I/61+J--H8kHL._SX522_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
   name: 'Wired Multimedia Keyboard',
  description: 'Full-Size Layout with USB Interface, Chiclet Keys, Spill Resistance with 3 Indicator Lights| Plug and Play| Hot Keys: Volume, Mute, Play/Pause, Backward, Forward.',
  price: Double('529'),
  category: 'Computers & Accessories',
  stock: NumberInt('89'),
  imageUrl: 'https://m.media-amazon.com/images/I/61mwM6q4smL._SY450_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
  name: '2-Slice Pop-up Toaster',
  description: '7 Browning Options for Golden Crispy Bread Toasts, Mid-Cycle Cancel Function, Slide-out Crumb Tray, 2-Yr Warranty, Ivory, Electric Toaster.',
  price: Double('1399'),
  category: 'Kitchen & Home Appliances',
  stock: NumberInt('79'),
  imageUrl: 'https://m.media-amazon.com/images/I/71JCygIGtJL._SY450_.jpg',
  ratings: Double('4.8'),
  numReviews: NumberInt('24')
  },
  {
  name: 'Emergency Lantern',
  description: 'Rechargeable 4.8W Lantern Overcharge & Deep Discharge Protection, Easy Plug & Play Charging, 360° Lighting.',
  price: Double('769'),
  category: 'Camping & Hiking',
  stock: NumberInt('38'),
  imageUrl: 'https://m.media-amazon.com/images/I/61pl8l4gTaL._SX466_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
   name: 'Universal Travel Adapter - (25W)',
  description: '5-in-1 Fast Charging Multi Plug Adapter, 2 Type C; 1 USB A; 1 USA Socket; International All in One Charger Adaptor.',
  price: Double('1260'),
  category: 'Mobile Accessories',
  stock: NumberInt('34'),
  imageUrl: 'https://m.media-amazon.com/images/I/71VyS3sURfL._SY450_.jpg',
  ratings: Double('4.5'),
  numReviews: NumberInt('89')
  },
  {
  name: 'Football',
  description: 'Match Ball, 32 Panels, Durable & Soft PU Leather, Butyl Fabric Wounded Bladder, FIFA Basic, to Play on Both Natural and Artificial Grass (Size - 5, Multicolor).',
  price: Double('989'),
  category: 'Sports, Fitness & Outdoors',
  stock: NumberInt('78'),
  imageUrl: 'https://m.media-amazon.com/images/I/81JevpyZq8L._SY450_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
   name: 'Mixer Grinder',
  description: '750 Watt 3 Jars With Flexi lid, Stainless Steel jars and blades, for Perfect wet, dry and chutney Grinding across different batch sizes Black.',
  price: Double('2799'),
  category: 'Home Appliances',
  stock: NumberInt('56'),
  imageUrl: 'https://m.media-amazon.com/images/I/515RAuIn0TL._SY450_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
 name: '2TB External HDD',
  description: 'USB 3.0 for Windows and Mac with 3 yr Data Recovery Services, Portable Hard Drive (STKM2000400).',
  price: Double('11799'),
  category: 'External Devices & Data Storage',
  stock: NumberInt('78'),
  imageUrl: 'https://m.media-amazon.com/images/I/814SDu24dnL._SY450_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
  name: 'Flashlight',
  description: '20000 Lumens High Power Torch Light Rechargeable | 4 Light Modes | Adjustable Focus | IP45 Water-Resistant | BIS Certification.',
  price: Double('1529'),
  category: 'Hand Tools',
  stock: NumberInt('58'),
  imageUrl: 'https://m.media-amazon.com/images/I/71kxYEjX66L._SY450_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
  name: 'Vacuum Cleaner for Car & Home',
  description: '2X Powerfull Suction, Dual Mode Battery 6000mAh & 12V DC Car Port | High Power Portable Lightweight Wireless Vacuum, Rechargeable (V1) (Black).',
  price: Double('2744'),
  category: 'Car & Motorbike Care',
  stock: NumberInt('88'),
  imageUrl: 'https://m.media-amazon.com/images/I/71pmwfKdhDL._SY450_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
    name: 'Microwave Oven',
  description: '5 Power Levels + Defrost | 10-Year Magnetron Warranty | Mechanical Knob Control | Easy-Clean Powder-Coated Cavity | Energy Efficient | Oven for Reheating & Cooking.',
  price: Double('4590'),
  category: 'Large Appliance',
  stock: NumberInt('78'),
  imageUrl: 'https://m.media-amazon.com/images/I/71L8Jzd5ZZL._SX679_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
  name: 'Power Bank 20000mAh',
  description: 'Compact Power Bank 20000mAh Fast Charging PD 3.0 with PPS: Built-in Type-C Cable, Digital Battery%, Advanced Safety, Triple Output | for MacBook, Laptop, iPhone, Android, Tablet (Blue).',
  price: Double('2999'),
  category: 'Mobiles & Accessories',
  stock: NumberInt('48'),
  imageUrl: 'https://m.media-amazon.com/images/I/61h1EZep+5L._SX679_.jpg',
  ratings: Double('4.9'),
  numReviews: NumberInt('50')
  },
  {
  name: 'Solimo Wooden Ironing Board/Table',
  description: 'with Iron Holder, Foldable & Adjustable (116 x 40cm).',
  price: Double('1299'),
  category: 'Home Storage & Organisation',
  stock: NumberInt('78'),
  imageUrl: 'https://m.media-amazon.com/images/I/818nVOrwH2L._SY450_.jpg',
  ratings: Double('4.5'),
  numReviews: NumberInt('50')
  },
  {
    name: 'Webcam',
  description: 'with Full Stereo Dual Built-in Mics | FHD 1080P 2.1 Megapixel CMOS Camera with USB |Ultra-Wide 95° Lens, 4X Digital Zoom | 360 Rotation | Flexible Mount | Cloud Grey.',
  price: Double('1799'),
  category: 'Audio & Video Accessories',
  stock: NumberInt('28'),
  imageUrl: 'https://m.media-amazon.com/images/I/51IpsJmhInL._SY450_.jpg',
  ratings: Double('4.1'),
  numReviews: NumberInt('50')
  },
  {
  name: 'Turbo Spin Mop',
  description: 'Removes over 99% bacteria,Triangular head & Easy big wheel with 2 Refills,Floor Cleaning Mop stick with Bucket, pocha for floor cleaning, Mopping Set (Grey and blue), 4 Pcs.',
  price: Double('1488'),
  category: 'Cleaning Supplies',
  stock: NumberInt('78'),
  imageUrl: 'https://m.media-amazon.com/images/I/61ZGcu33mbL._SY450_.jpg',
  ratings: Double('4.5'),
  numReviews: NumberInt('50')
  },
  {
   name: 'Kitchen Scissors',
  description: 'Multi Purpose food scissors,Premium Stainless Steel Solid Kitchen Shears for Meat, Seafood, Chicken, Vegetables, Herbs, BBQ, Bottle Opener (Silver) .',
  price: Double('279'),
  category: 'Kitchen Tools',
  stock: NumberInt('128'),
  imageUrl: 'https://m.media-amazon.com/images/I/61Bihn63RbL._SY450_.jpg',
  ratings: Double('4.3'),
  numReviews: NumberInt('50')
  },
  {
  name: 'Skipping Rope for Men and Women',
  description: 'umping Rope With Adjustable Height Speed Skipping Rope for Exercise, Gym, Sports Fitness with Weight Bars Adjustable Jump Rope with Weight Bars - Red Black.',
  price: Double('278'),
  category: 'Exercise & Fitness',
  stock: NumberInt('34'),
  imageUrl: 'https://m.media-amazon.com/images/I/61msg8qvOGL._SY450_.jpg',
  ratings: Double('4.1'),
  numReviews: NumberInt('50')
  },
  {
  name: 'Paper and Credit Card Shredder',
  description: '11.5 Liter Waste Basket Capacity| for Office and Home Usage | 1 Year Brand Warranty.',
  price: Double('2474'),
  category: 'Office Electronics',
  stock: NumberInt('23'),
  imageUrl: 'https://m.media-amazon.com/images/I/61sBVM70-BL._SX679_.jpg',
  ratings: Double('4.3'),
  numReviews: NumberInt('50')
  },
  
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