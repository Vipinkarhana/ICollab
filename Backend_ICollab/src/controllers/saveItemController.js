const SavedItem = require('../models/savedItem');

const toggleSavedItem = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const { itemId, itemType } = req?.body;
    
    // Validate itemType
    if (!['posts', 'projects'].includes(itemType)) {
      return res.status(400).json({ message: 'Invalid item type' });
    }

    // Find or create SavedItem document for the user
    let savedItem = await SavedItem.findOne({ user: userId });

    if (!savedItem) {
      savedItem = await SavedItem.create({
        user: userId,
        posts: [],
        projects: [],
      });
    }

    // Toggle logic
    const itemList = savedItem[itemType]?.map((id) => id?.toString());
    const index = itemList.indexOf(itemId);

    if (index === -1) {
      // Save item
      savedItem[itemType].push(itemId);
      await savedItem.save();
      return res
        .status(200)
        .json({ message: 'Item saved successfully', actionType: 'saved' });
    } else {
      // Unsave item
      savedItem[itemType] = savedItem[itemType]?.filter(
        (id) => id?.toString() !== itemId
      );
      await savedItem.save();
      return res
        .status(200)
        .json({ message: 'Item unsaved successfully', actionType: 'unsaved' });
    }
  } catch (error) {
    console.error('Error in toggleSavedItem:', error.message);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const getSavedPosts = async (req, res) => {
  const userId = req.user.id;
  try {
    const savedItem = await SavedItem.findOne({ user: userId }).populate({
      path: 'posts',
      populate: {
        path: 'user',
        select: 'name username profile_pic'
      }
    });

    if (!savedItem) {
      return res
        .status(200)
        .json({ success: true, message: 'No saved posts found.', data: [] });
    }

    res.status(200).json({
      status: "success",
      message: 'Saved posts fetched successfully.',
      data: savedItem.posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch saved posts.',
      error: error.message,
    });
  }
};

const getSavedProjects = async (req, res) => {
  const userId = req.user.id;
  try {
    const savedItem = await SavedItem.findOne({ user: userId }).populate(
      'projects'
    );
    if (!savedItem) {
      return res
        .status(200)
        .json({ success: true, message: 'No saved projects found.', data: [] });
    }

    res.status(200).json({
      status: "success",
      message: 'Saved projects fetched successfully.',
      data: savedItem.projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch saved projects.',
      error: error.message,
    });
  }
};

module.exports = {
  toggleSavedItem,
  getSavedPosts,
  getSavedProjects,
};
