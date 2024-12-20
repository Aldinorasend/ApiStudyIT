const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
} = require('../models/itemModel');

// Mendapatkan semua item
const getItems = async (req, res) => {
  try {
    const items = await getAllItems(); // Menggunakan async/await
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching items', details: err.message });
  }
};

// Menambahkan item baru
const addItem = async (req, res) => {
  const data = req.body;
  try {
    const result = await createItem(data);
    res.json({ message: 'Item created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating item', details: err.message });
  }
};

// Mendapatkan item berdasarkan ID
const getItem = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await getItemById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching item', details: err.message });
  }
};

// Mengupdate item
const editItem = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await updateItem(id, data);
    res.json({ message: 'Item updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating item', details: err.message });
  }
};

// Menghapus item
const removeItem = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteItem(id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting item', details: err.message });
  }
};

module.exports = { getItems, addItem, getItem, editItem, removeItem };
