const {
    getAllItems,
    createItem,
    getItemById,
    updateItem,
    deleteItem,
  } = require('../models/itemModel');
  
  const getItems = (req, res) => {
    getAllItems((err, items) => {
      if (err) return res.status(500).json({ error: 'Error fetching items' });
      res.json(items);
    });
  };
  
  const addItem = (req, res) => {
    const data = req.body;
    createItem(data, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error creating item' });
      res.json({ message: 'Item created', id: result.insertId });
    });
  };
  
  const getItem = (req, res) => {
    const id = req.params.id;
    getItemById(id, (err, item) => {
      if (err) return res.status(500).json({ error: 'Error fetching item' });
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.json(item);
    });
  };
  
  const editItem = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    updateItem(id, data, (err) => {
      if (err) return res.status(500).json({ error: 'Error updating item' });
      res.json({ message: 'Item updated' });
    });
  };
  
  const removeItem = (req, res) => {
    const id = req.params.id;
    deleteItem(id, (err) => {
      if (err) return res.status(500).json({ error: 'Error deleting item' });
      res.json({ message: 'Item deleted' });
    });
  };
  
  module.exports = { getItems, addItem, getItem, editItem, removeItem };
  