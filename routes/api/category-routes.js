const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
try {
  const categoryData =  await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  
  if (!categoryData) {
    res.status(404).json({ message: "No category with that id!"});
  }
  res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' }); 
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No Bueno!' }); 
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (updatedCategory[0] === 0) {
      return res.status(404).json({ message: "No category found with that id!" });
    }

    res.status(200).json({ message: "Category updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deletedCategory === 0) {
      return res.status(404).json({ message: "No category found with that id!" });
    }
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'NO BUENO!' });
  }
});

module.exports = router;
