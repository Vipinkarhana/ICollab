const mongoose = require('mongoose');
const User = require('../src/models/user'); // adjust path if needed
const Profile = require('../src/models/profile'); // adjust path if needed

// Replace this with your actual MongoDB URI
const MONGO_URI = 'mongodb+srv://icollabrcube:yuRKpeU6CjaNPqXv@rcube.kubcf.mongodb.net/ICollab?retryWrites=true&w=majority';

/**
 * 🔧 Script: fixProfileUserMismatch.js
 *
 * 🧠 Issue:
 * In the database, each User document has a reference to a Profile (user.profile),
 * and each Profile should have a matching reference back to the User (profile.user).
 *
 * ❌ Problem:
 * Some User documents point to a Profile, but the Profile does not point back to the same User,
 * creating an inconsistent one-way relationship.
 *
 * ✅ Fix:
 * This script finds such mismatches and updates the Profile's `user` field
 * to correctly reference the User that owns it (based on the `user.profile` field).
 *
 * ⚠️ Assumption:
 * The `user.profile` is considered the correct link, and the `profile.user` is fixed to match it.
 */


async function fixProfileMismatches() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Fetch all users that have a profile reference
    const usersWithProfiles = await User.find({ profile: { $ne: null } }).populate('profile');

    let fixedCount = 0;

    for (const user of usersWithProfiles) {
      const profile = user.profile;

      // Skip if profile is not populated (e.g. was deleted)
      if (!profile) continue;

      // If the profile.user does not match the user's _id
      if (!profile.user || profile.user.toString() !== user._id.toString()) {
        console.log(
          `🔧 Fixing mismatch for user: ${user.email}\n` +
          `  → User.profile: ${profile._id}\n` +
          `  → Profile.user: ${profile.user}`
        );

        // Fix it
        profile.user = user._id;
        await profile.save();
        console.log(`✅ Fixed profile ${profile._id} → user ${user.email}`);
        fixedCount++;
      }
    }

    console.log(`\n🎉 Done! Total mismatches fixed: ${fixedCount}`);
  } catch (err) {
    console.error('❌ Error during script execution:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

fixProfileMismatches();

/*

 * Profile Mismatch Check Pipeline
 * [
  {
    $lookup: {
      from: "profiles",
      localField: "profile",
      foreignField: "_id",
      as: "profileData"
    }
  },
  {
    $unwind: {
      path: "$profileData",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $facet: {
      noProfileReference: [
        {
          $match: {
            $or: [
              {
                profile: {
                  $exists: false
                }
              },
              {
                profile: null
              }
            ]
          }
        },
        {
          $group: {
            _id: null,
            count: {
              $sum: 1
            },
            emails: {
              $push: "$email"
            }
          }
        }
      ],
      profileMismatch: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $ne: ["$profile", null]
                },
                {
                  $ne: [
                    "$profileData.user",
                    "$_id"
                  ]
                }
              ]
            }
          }
        },
        {
          $group: {
            _id: null,
            count: {
              $sum: 1
            },
            emails: {
              $push: "$email"
            }
          }
        }
      ]
    }
  },
  {
    $project: {
      noProfileReference: {
        $ifNull: [
          {
            $arrayElemAt: [
              "$noProfileReference",
              0
            ]
          },
          {
            count: 0,
            emails: []
          }
        ]
      },
      profileMismatch: {
        $ifNull: [
          {
            $arrayElemAt: ["$profileMismatch", 0]
          },
          {
            count: 0,
            emails: []
          }
        ]
      }
    }
  }
] 
*/
