import axios from 'axios';
import { SERVER_URL } from '../../config/config.js';

export const createRecipeRoutes = (app) => {
  app.get('get-recipes', async (req, res) => {
    axios.get(`${SERVER_URL}/recipes`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });

  app.post('/post-recipe', async (req, res) => {

    const recipe = JSON.stringify(req.body.data);

    axios.post(`${SERVER_URL}/recipe`, { recipe: recipe, })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(402).json({ message: error.message });
        console.log(JSON.stringify(error, null, 2));
      });
  });
}