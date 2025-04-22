const InventoryItem = require("../models/InventoryItem");

// Add or update an inventory item
exports.addOrUpdateInventoryItem = async (itemData) => {
  try {
    const { inventoryId, quantity } = itemData;

    // Check if the item already exists
    const existingItem = await InventoryItem.findOne({ inventoryId });

    if (existingItem) {
      // Update the quantity if the item exists
      existingItem.quantity += quantity;
      return await existingItem.save();
    }

    // Create a new item if it doesn't exist
    const newItem = new InventoryItem(itemData);
    return await newItem.save();
  } catch (error) {
    throw new Error(`Error adding/updating inventory item: ${error.message}`);
  }
};

// Get all inventory items
exports.getAllInventoryItems = async () => {
  try {
    return await InventoryItem.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching inventory items: ${error.message}`);
  }
};

// Get a single inventory item by ID
exports.getInventoryItemById = async (id) => {
  try {
    const item = await InventoryItem.findById(id);
    if (!item) throw new Error("Inventory item not found");
    return item;
  } catch (error) {
    throw new Error(`Error fetching inventory item: ${error.message}`);
  }
};

// Update an inventory item
exports.updateInventoryItem = async (id, updateData) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!item) throw new Error("Inventory item not found");
    return item;
  } catch (error) {
    throw new Error(`Error updating inventory item: ${error.message}`);
  }
};

// Delete an inventory item
exports.deleteInventoryItem = async (id) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(id);
    if (!item) throw new Error("Inventory item not found");
    return item;
  } catch (error) {
    throw new Error(`Error deleting inventory item: ${error.message}`);
  }
};
