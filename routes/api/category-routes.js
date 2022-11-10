const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
  const categoryData = await Category.findAll({
    include: [
      {
        model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  });
  console.log(categoryData
);
  const categories = categoryData.map((category) => category.get({plain: true}));
  console.log("categories", categories);
  res.status(200).json(categoryData);
  console.log() 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model:Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],
    });
    if (!categoryData)
    {
      res.status(404).json({message: 'No Category found with this id'});
      return;
    }
    res.status(200).json(categoryData);
  }catch(err) {
    res.status(500).json(err);
  }
      // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // create a new category

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update({
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {id: req.params.id,
      },
    })
    .then((updateCategory) => {
      res.json(updateCategory);
    })
  }
  catch(err) {
    res.status(400).json(err);
  
  // update a category by its `id` value
}
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData= await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a category by its `id` value

module.exports = router;
