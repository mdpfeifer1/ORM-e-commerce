const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    if (!tag) {
      return res.status(404).json({ message: "No tag found with that id!" });
    }
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.put("/:id", (req, res) => {
  router.put("/:id", async (req, res) => {
    try {
      const [updatedRowCount, updatedTags] = await Tag.update(
        { tag_name: req.body.tag_name },
        {
          where: {
            id: req.params.id
          },
          returning: true, 
          plain: true 
        }
      );
  
      if (updatedRowCount === 0) {
        return res.status(404).json({ message: "No tag found with that id!" });
      }
  
      res.status(200).json(updatedTags); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' }); 
    }
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRowCount = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "No tag found with that id!" });
    }

    res.status(200).json({ message: "Tag deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
