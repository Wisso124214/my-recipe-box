const fetchOneRecipy = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
}

export const fetchNRecipies = async (quant) => {
  try {
    const recipies = [];

    for (let i = 0; i < quant; i++) {
      const recipy = await fetchOneRecipy();
      let editedRecipy = {};
      let ingredients = [];
      let strMeasures = []; 
      let strIngredients = []; 

      for(let r in recipy.meals[0]){
        if(r.includes('strIngredient') || r.includes('strMeasure')){
          if (recipy.meals[0][r] !== '' && recipy.meals[0][r] !== null) {
            if(r.includes('strIngredient')){
              strIngredients.push(recipy.meals[0][r]);
            } else {
              strMeasures.push({
                measure: parseInt(recipy.meals[0][r].split(' ')[0][0], 10) ? recipy.meals[0][r].split(' ')[0] : '',
                unit: recipy.meals[0][r].split(' ')[1] ? recipy.meals[0][r].split(' ')[1] : '',
              });
            }
          }
        } else {
          editedRecipy[r] = recipy.meals[0][r];
        }
      }

      for(let s in strIngredients){
        ingredients.push({
          name: strIngredients[s],
          measure: strMeasures[s].measure,
          unit: strMeasures[s].unit,
        });
      }
      editedRecipy.ingredients = ingredients;
      editedRecipy.timePrep = Math.floor(Math.random() * 60) + 1;
      editedRecipy.timeCook = Math.floor(Math.random() * 120) + 1;
      editedRecipy.serves = Math.floor(Math.random() * 10) + 1;
      editedRecipy.difficulty = {
        name: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
        value: Math.floor(Math.random() * 3) + 1,
      };
      editedRecipy.isFavorite = Math.random() >= 0.5;
      editedRecipy.category = 'category ' + (Math.floor(Math.random() * 10) + 1);

      recipies.push(editedRecipy);
    }

    return recipies;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }
}