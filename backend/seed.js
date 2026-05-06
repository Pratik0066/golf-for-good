import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Required for hashed login
import { faker } from '@faker-js/faker';
import User from './models/User.js';
import Score from './models/Score.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 Connected to MongoDB...");

    // Clear existing users to fix the plain-text password issue
    await User.deleteMany();
    await Score.deleteMany();

    // 1. Generate one hash for all seeded users (faster than hashing 1000 times)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [];
    const tiers = ['Basic', 'Premium', 'Elite'];

    for (let i = 0; i < 1000; i++) {
      const tier = faker.helpers.arrayElement(tiers);
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword, // Now stores a proper BCrypt hash
        subscriptionPlan: tier,
        isSubscribed: tier !== 'Basic',
        walletBalance: tier === 'Basic' ? 0 : faker.number.int({ min: 100, max: 2000 }),
        createdAt: faker.date.past({ years: 0.5 })
      });
    }

    await User.insertMany(users);
    console.log("✅ 1000 Users seeded with HASHED passwords!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();