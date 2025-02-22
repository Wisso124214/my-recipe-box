import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  recipe: String,
});


export const Recipe = mongoose.model('Recipe', recipeSchema);