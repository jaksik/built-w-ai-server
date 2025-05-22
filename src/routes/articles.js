const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new article
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    link: req.body.link,
    source: req.body.source,
    publishedAt: req.body.publishedAt,
    category: req.body.category || '' // Use provided category or default to empty string
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE article
router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
