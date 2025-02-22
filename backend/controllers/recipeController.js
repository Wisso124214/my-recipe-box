import { Recipe } from '../models/recipeModels.js';

export const createRecipeControllers = (app) => {
  app.get('/recipies', async (req, res) => {
    try {
      const recipies = await Recipe.find();
      res.json(recipies);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.post('/recipe', async (req, res) => {
    try {
      const recipe = new Recipe(req.body);
      await recipe.save();
      res.json(recipe);
    } catch (error) {
      res.status(402).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.put('/recipe/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
      res.json(recipe);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });

  app.delete('/recipe/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Recipe.findByIdAndDelete(id);
      res.json({ message: 'Recipe deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(JSON.stringify(error, null, 2));
    }
  });
}