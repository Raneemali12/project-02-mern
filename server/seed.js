require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const movies = [
  { title: "Harry Potter and the Sorcerer's Stone", description: "في عيد ميلاده الحادي عشر، يكتشف صبي يتيم أنه ساحر", year: 2001, rating: 7.6, poster: "hp1.jpg" },
  { title: "Harry Potter and the Chamber of Secrets", description: "يعود هاري إلى هوجورتس ليواجه تهديداً غامضاً", year: 2002, rating: 7.4, poster: "hp2.jpg" },
  { title: "Harry Potter and the Prisoner of Azkaban", description: "يهرب القاتل المدان سيرياس بلاك من سجن أزكابان", year: 2004, rating: 7.9, poster: "hp3.jpg" },
  { title: "The Lord of the Rings", description: "رحلة ملحمية لتدمير خاتم سحري قوي", year: 2001, rating: 8.8, poster: "tl.jpg" },
  { title: "Maleficent", description: "القصة غير المروية لساحرة قوية", year: 2014, rating: 6.9, poster: "mt.jpg" },
  { title: "The Shawshank Redemption", description: "يدين مصرفي ادين ظلما صداقة وثيقة مع سجين متمرس", year: 1994, rating: 9.3, poster: "SR.jpg" },
  { title: "The Godfather", description: "يفوض زعيم عائلة اجرامية منظمة الى ابنه", year: 1972, rating: 9.2, poster: "TG.jpg" },
  { title: "Interstellar", description: "فريق من رواد الفضاء في مهمة للبحث عن موطن جديد", year: 2014, rating: 8.7, poster: "IR.jpg" },
  { title: "The Dark Knight", description: "باتمان يواجه الجوكر في مدينة غوثام", year: 2008, rating: 9.1, poster: "DK.jpg" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    let user = await User.findOne({ username: 'admin' });
    if (!user) {
      const hashed = await bcrypt.hash('admin123', 10);
      user = await User.create({ username: 'admin', password: hashed });
    }

    await Item.deleteMany({});

    for (const movie of movies) {
      await Item.create({ ...movie, createdBy: user._id });
    }

    console.log('Done! Movies added successfully');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seed();