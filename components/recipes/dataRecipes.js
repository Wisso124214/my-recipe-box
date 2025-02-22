export const fetchOneRecipe = async (pushColorCategories) => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const recipe = await response.json();

    return editRecipe(recipe, pushColorCategories);
    
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
}

export const editRecipe = (recipe, pushColorCategories) => {

  let editedRecipe = {};
  let ingredients = [];
  let strMeasures = []; 
  let strIngredients = []; 

  for(let r in recipe.meals[0]){
    if(r.includes('strIngredient') || r.includes('strMeasure')){
      if (recipe.meals[0][r] !== '' && recipe.meals[0][r] !== null) {
        if(r.includes('strIngredient')){
          strIngredients.push(recipe.meals[0][r]);
        } else {
          strMeasures.push({
            measure: parseInt(recipe.meals[0][r].split(' ')[0][0], 10) ? recipe.meals[0][r].split(' ')[0] : '',
            unit: recipe.meals[0][r].split(' ')[1] ? recipe.meals[0][r].split(' ')[1] : '',
          });
        }
      }
    } else {
      editedRecipe[r] = recipe.meals[0][r];
    }
  }

  for(let s in strIngredients){
    ingredients.push({
      name: strIngredients[s],
      measure: strMeasures[s].measure,
      unit: strMeasures[s].unit,
    });
  }
  editedRecipe.ingredients = ingredients;
  editedRecipe.timePrep = Math.floor(Math.random() * 60) + 1;
  editedRecipe.timeCook = Math.floor(Math.random() * 120) + 1;
  editedRecipe.serves = Math.floor(Math.random() * 10) + 1;
  editedRecipe.difficulty = {
    name: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
    value: Math.floor(Math.random() * 3) + 1,
  };
  editedRecipe.isFavorite = Math.random() >= 0.5;
  editedRecipe.category = 'category ' + (Math.floor(Math.random() * 10) + 1);
  
  let categories = ['all'];
  categories.push(recipe.meals[0].strCategory.toLowerCase());
  if (recipe.meals[0].strTags) {
    for (let t in recipe.meals[0].strTags.split(',')) {
      categories.push((recipe.meals[0].strTags.split(',')[t]).toLowerCase());
    }
  }
  
  editedRecipe.categories = [...categories];

  for (let c in categories) {
    console.log('pushColorCategories editRecipe ', categories[c]);
    pushColorCategories(categories[c]);
  }
  
  console.log(JSON.stringify(editedRecipe, null, 2));
  return editedRecipe;
}

export const createArrayColors = async () => {
  let arrColors = [];
  
  for(let i = 0; i < 360; i+=18){
    arrColors.push(`hsl(${i}, 100%, 50%)`);
  }
  return arrColors;
}

export const fetchNRecipes = async (quant, pushColorCategories) => {
  try {
    const recipes = [];

    for (let i = 0; i < quant; i++) {
      
      const editedRecipe = await fetchOneRecipe(pushColorCategories);
      recipes.push(editedRecipe);
    }

    return recipes;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }
}