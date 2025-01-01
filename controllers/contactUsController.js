const {
  getAllContactUs,
  createContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
} = require('../models/contactUsModel.js');

// Mendapatkan semua contact_us
const getContactUs = async (req, res) => {
  try {
    const contactUs = await getAllContactUs();
    res.json(contactUs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contact_us', details: err.message });
  }
};

// Menambahkan contact_us baru
const addContactUs = async (req, res) => {
  const data = req.body;
  try {
    const result = await createContactUs(data);
    res.json({ message: 'Contact us created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating contact_us', details: err.message });
  }
};

// Mendapatkan contact_us berdasarkan ID
const getContactUsByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    const contactUs = await getContactUsById(id);
    if (!contactUs) return res.status(404).json({ error: 'Contact_us not found' });
    res.json(contactUs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contact_us', details: err.message });
  }
};

// Mengupdate contact_us
const editContactUs = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await updateContactUs(id, data);
    res.json({ message: 'Contact us updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating contact_us', details: err.message });
  }
};

// Menghapus contact_us
const removeContactUs = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteContactUs(id);
    res.json({ message: 'Contact us deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting contact_us', details: err.message });
  }
};

module.exports = { getContactUs, addContactUs, getContactUsByIdController, editContactUs, removeContactUs };
