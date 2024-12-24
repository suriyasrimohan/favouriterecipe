const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/recipesDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


// Recipe Schema
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0 && value.every((ingredient) => ingredient.trim() !== '');
        },
        message: 'Ingredients array must not contain empty values',
      },
    },
    instructions: { type: String, required: true },
  });
  

// Recipe Model
const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes

// 1. Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Favorite Recipes App!');
});

// 2. Create a new recipe
app.post('/recipes', async (req, res) => {
    const { name, ingredients, instructions } = req.body;
  
    try {
      const sanitizedIngredients = ingredients.filter((ing) => ing.trim() !== '');
  
      const newRecipe = new Recipe({
        name,
        ingredients: sanitizedIngredients,
        instructions,
      });
  
      await newRecipe.save();
      res.status(201).send({ message: 'Recipe created!', recipe: newRecipe });
    } catch (error) {
      console.error('Error creating recipe:', error);
      res.status(400).send(error.message || 'Error creating recipe');
    }
  });  

// 3. Get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(400).send('Error fetching recipes');
  }
});

// 4. Get a recipe by ID
app.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).send(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(400).send('Error fetching recipe');
  }
});

// 5. Update a recipe by ID
app.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { name, ingredients, instructions },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).send('Recipe not found');
    }

    res.status(200).send(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(400).send('Error updating recipe');
  }
});

// 6. Delete a recipe by ID
app.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).send('Recipe not found');
    }

    res.status(200).send('Recipe deleted successfully');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(400).send('Error deleting recipe');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
