const mongoose = require('mongoose');
const User = require('../src/models/user');     // Adjust path
const Profile = require('../src/models/profile'); // Adjust path

const MONGO_URI = 'mongodb+srv://icollabrcube:yuRKpeU6CjaNPqXv@rcube.kubcf.mongodb.net/ICollab?retryWrites=true&w=majority'; // Replace accordingly

async function migrateDesignation() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const users = await User.find({ designation: { $exists: true, $ne: null } });

    let migratedCount = 0;

    for (const user of users) {
      if (!user.profile) {
        console.log(`⚠️ User ${user.email} has designation but no linked profile. Skipping.`);
        continue;
      }

      const profile = await Profile.findById(user.profile);

      if (!profile) {
        console.log(`❌ Profile not found for user ${user.email} (profileId: ${user.profile})`);
        continue;
      }

      if (!profile.designation) {
        profile.designation = user.designation;
        await profile.save();
        console.log(`✅ Migrated designation to profile for ${user.email}`);
        migratedCount++;
      } else {
        console.log(`ℹ️ Profile for ${user.email} already has designation. Skipping.`);
      }

      // Remove designation from user using updateOne to avoid validation errors
      await User.updateOne({ _id: user._id }, { $unset: { designation: "" } });
    }

    console.log(`\n🎉 Migration complete. Total designations moved: ${migratedCount}`);
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

migrateDesignation().catch(err => {
  console.error('❌ Migration failed:', err);
  mongoose.disconnect();
});
