import bcrypt from 'bcryptjs';
import User from '../models/User';
import env from '../config/env';

export const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      console.log('Seeding initial admin user...');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, salt);

      await User.create({
        name: 'Administrator',
        email: env.ADMIN_EMAIL,
        passwordHash,
        role: 'admin',
      });
      console.log('Admin user seeded successfully!');
    }
  } catch (error: any) {
    console.error(`Error seeding admin user: ${error.message}`);
  }
};
