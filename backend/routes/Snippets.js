const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');
const auth = require('../middleware/auth');

// Get all snippets for logged in user + search
router.get('/', auth, async (req, res) => {
  try {
    const { q } = req.query;
    let filter = { user: req.user.id };

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ];
    }

    const snippets = await Snippet.find(filter).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create snippet
router.post('/', auth, async (req, res) => {
  try {
    const { title, code, language, tags } = req.body;

    const snippet = new Snippet({
      title,
      code,
      language,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      user: req.user.id
    });

    await snippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete snippet
router.delete('/:id', auth, async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) return res.status(404).json({ msg: 'Snippet not found' });
    if (snippet.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await snippet.deleteOne();
    res.json({ msg: 'Snippet deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;