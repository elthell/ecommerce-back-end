const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const findAllCategories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });
    res.status(200).json(findAllCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findOneCategory = Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ["category_id"],
        },
      ],
    });
    if (!findOneCategory) {
      res.status(404).json({ message: "No Category found with that ID." });
      return;
    }
    res.status(200).json(findOneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateCategory) {
      res.status(404).json({ message: "No Category found with that ID." });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "No Category found with that ID." });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
