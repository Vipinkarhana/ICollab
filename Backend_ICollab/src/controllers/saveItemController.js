const SavedItem = require('../models/savedItemModel');

const saveItem = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user.id;

  if (!['post', 'project'].includes(itemType)) {
    return res.status(400).json({ message: 'Invalid item type.' });
  }

  try {
    // Check if item is already saved
    const existing = await SavedItem.findOne({ user: userId, item: itemId, itemType });

    if (existing) {
      return res.status(200).json({ message: `${itemType} already saved.` });
    }

    const newSavedItem = new SavedItem({
      user: userId,
      item: itemId,
      itemType,
    });

    await newSavedItem.save();

    res.status(201).json({ message: `${itemType} saved successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save item.', error: error.message });
  }
};

const unsaveItem = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user.id;

  try {
    const deleted = await SavedItem.findOneAndDelete({ user: userId, item: itemId, itemType });

    if (!deleted) {
      return res.status(404).json({ message: 'Saved item not found.' });
    }

    res.status(200).json({ message: `${itemType} unsaved successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unsave item.', error: error.message });
  }
};

const getAllSavedItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const savedItems = await SavedItem.find({ user: userId })
      .populate('item') // Automatically populates post or project
      .sort({ createdAt: -1 });

    res.status(200).json(savedItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch saved items.', error: error.message });
  }
};

module.exports = {
  saveItem,
  unsaveItem,
  getAllSavedItems,
};
