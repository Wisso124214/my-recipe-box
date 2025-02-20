import { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import {
  View, 
  Animated,
  Appearance,
  Image,
} from 'react-native';

import LoadingScreen from './components/loadingScreen/LoadingScreen';
import Login from './components/login/Login';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Register from './components/register/Register';
import DetailsRecipy from './components/recipies/DetailsRecipy.jsx';
import DeviceAccounts from './components/deviceAccounts/DeviceAccounts';
import UserAccounts from './components/userAccounts/UserAccounts';
import DebugMenu from './components/debugMenu/DebugMenu';
import { setItem, getItem } from './utils/AsyncStorage.js';
import ListRecipies from './components/recipies/ListRecipies.jsx';
import { createArrayColors, editRecipy } from './components/recipies/dataRecipes.js';
import { fetchNRecipies } from './components/recipies/dataRecipes.js';

import { SERVER_URL } from './config/config';
import axios from 'axios';
import Loading from './components/loading/Loading.jsx';

export default function App() {
  const devMode = {
  power: 'on',
    on: {
      timeLoading: 0,
      screenLoading: false,
      debugMenuEnabled: true,
      showDebugMenu: false,
      strpage: 'listRecipies',
      page: 0,
      pagefp: 0,
      varpage: 'strpage',
      appState: 'initializing',
      autoFocusInputFP2: true,
      registerDebugging: true,
      isFetchingDB: false,
      usernameDefault: 'UserURU',
      emailDefault: 'luisdavidbustosnunez@gmail.com',
      passwordDefault: 'Password123$',
    },
    off: {
      timeLoading: 0,
      screenLoading: false,
      debugMenuEnabled: false,
      showDebugMenu: false,
      strpage: 'login',
      page: 0,
      pagefp: 0,
      varpage: 'strpage',
      appState: 'initializing',
      autoFocusInputFP2: true,
      registerDebugging: false,
      isFetchingDB: true,
      usernameDefault: '',
      emailDefault: '',
      passwordDefault: '',
    },
  }

  const splashLight = require('./assets/splash-light.png');
  const splashDark = require('./assets/splash-dark.png');

  const [mode, setMode] = useState(Appearance.getColorScheme());
  const [modeSetted, setModeSetted] = useState(false);
  
  const [page, setPage] = useState(devMode[devMode.power].page);
  const [strpage, setStrPage] = useState(devMode[devMode.power].strpage);
  const opacityref = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;
  const [showDebugMenu, setShowDebugMenu] = useState(devMode[devMode.power].showDebugMenu);
  const [appState, setAppState] = useState(devMode[devMode.power].appState);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [varpage, setVarPage] = useState(devMode[devMode.power].varpage);
  const [bgColorNavBar, setBgColorNavBar] = useState(theme[mode].backgroundColor);
  const [defaultValueUsernameLogin, setDefaultValueUsernameLogin] = useState('');
  const [loading, setLoading] = useState(false);
  const [textLoading, setTextLoading] = useState('Loading...');
  const [fontLoaded, fontLoadedError] = useFonts({
    'mali': require('./assets/fonts/mali/Mali-Regular.ttf'),
    'mali-bold': require('./assets/fonts/mali/Mali-Bold.ttf'),
    'mali-italic': require('./assets/fonts/mali/Mali-Italic.ttf'),
    'mali-bold-italic': require('./assets/fonts/mali/Mali-BoldItalic.ttf'),
    'mali-extra-light': require('./assets/fonts/mali/Mali-ExtraLight.ttf'),
    'mali-extra-light-italic': require('./assets/fonts/mali/Mali-ExtraLightItalic.ttf'),
    'mali-light': require('./assets/fonts/mali/Mali-Light.ttf'),
    'mali-light-italic': require('./assets/fonts/mali/Mali-LightItalic.ttf'),
    'mali-medium': require('./assets/fonts/mali/Mali-Medium.ttf'),
    'mali-medium-italic': require('./assets/fonts/mali/Mali-MediumItalic.ttf'),
    'mali-semi-bold': require('./assets/fonts/mali/Mali-SemiBold.ttf'),
    'mali-semi-bold-italic': require('./assets/fonts/mali/Mali-SemiBoldItalic.ttf'),
  });

  const [isHiddenMssg, setIsHiddenMssg] = useState(true);
  const [textMssg, setTestMssg] = useState('Login successful');
  const [colorMssg, setColorMssg] = useState(theme[mode].successColor);
  const [breadCrumb, setBreadCrumb] = useState([]);
  const [idMainSession, setIdMainSession] = useState(null);
  const [colorsCategories, setColorsCategories] = useState(null);
  const [arrayColors, setArrayColors] = useState([]);
  const [retriesColorsCategories, setRetriesColorsCategories] = useState([]);
  const [arrayRecipies, setArrayRecipies] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const reloadFetchData = true;

  const arrFetchDebug = [
    {
      "idMeal": "53063",
      "strMeal": "Chivito uruguayo",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Uruguayan",
      "strInstructions": "Crush the meat so that it is finite and we put it on a griddle to brown. Put the eggs, bacon and ham to fry.\r\nCut the bread in half, put the beef brisket, the fried eggs, the bacon, the ham, the mozzarella, the tomato and the lettuce. Cover with the other half of the bread and serve.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/n7qnkb1630444129.jpg",    
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=0PXbbL1QdaA&ab_channel=D%C3%ADadeCocina",  "strSource": "https://cookpad.com/uy/recetas/116102-chivito-uruguayo",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "Beef Brisket",
          "measure": "2",
          "unit": ""
        },
        {
          "name": "Bread",
          "measure": "2",
          "unit": ""
        },
        {
          "name": "Lettuce",
          "measure": "1",
          "unit": ""
        },
        {
          "name": "Tomato",
          "measure": "1",
          "unit": ""
        },
        {
          "name": "Ham",
          "measure": "100g",
          "unit": ""
        },
        {
          "name": "Mozzarella",
          "measure": "100g",
          "unit": ""
        },
        {
          "name": "Bacon",
          "measure": "100g",
          "unit": ""
        },
        {
          "name": "Egg",
          "measure": "1",
          "unit": ""
        },
        {
          "name": "Onion",
          "measure": "1",
          "unit": ""
        },
        {
          "name": "Pepper",
          "measure": "1",
          "unit": ""
        }
      ],
      "timePrep": 53,
      "timeCook": 46,
      "serves": 2,
      "difficulty": {
        "name": "medium",
        "value": 2
      },
      "isFavorite": false,
      "category": "category 1",
      "categories": [
        "all",
        "beef"
      ]
    },
    {
      "idMeal": "52804",
      "strMeal": "Poutine",
      "strDrinkAlternate": null,
      "strCategory": "Miscellaneous",
      "strArea": "Canadian",
      "strInstructions": "Heat oil in a deep fryer or deep heavy skillet to 365°F (185°C).\r\nWarm gravy in saucepan or microwave.\r\nPlace the fries into the hot oil, and cook until light brown, about 5 minutes.\r\nRemove to a paper towel lined plate to drain.\r\nPlace the fries on a serving platter, and sprinkle the cheese over them.\r\nLadle gravy over the fries and cheese, and serve immediately.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",    
      "strTags": "UnHealthy,Speciality,HangoverFood",
      "strYoutube": "https://www.youtube.com/watch?v=UVAMAoA2_WU",
      "strSource": "http://www.food.com/recipe/real-canadian-poutine-113388",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "Vegetable Oil",
          "measure": "",
          "unit": ""
        },
        {
          "name": "Beef Gravy",
          "measure": "1",
          "unit": "Can"
        },
        {
          "name": "Potatoes",
          "measure": "5",
          "unit": "thin"
        },
        {
          "name": "Cheese Curds",
          "measure": "2",
          "unit": "cups"
        }
      ],
      "timePrep": 59,
      "timeCook": 40,
      "serves": 10,
      "difficulty": {
        "name": "hard",
        "value": 2
      },
      "isFavorite": false,
      "category": "category 5",
      "categories": [
        "all",
        "miscellaneous",
        "unhealthy",
        "speciality",
        "hangoverfood"
      ]
    },
    {
      "idMeal": "53005",
      "strMeal": "Strawberry Rhubarb Pie",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "British",
      "strInstructions": "Pie Crust:  In a food processor, place the flour, salt, and sugar and process until combined. Add the butter and process until the mixture resembles coarse\r\n\r\nmeal (about 15 seconds). Pour 1/4 cup (60 ml) water in a slow, steady stream, through the feed tube until the dough just holds together when pinched. If necessary, add more water. Do not process more than 30 seconds.\r\nTurn the dough onto your work surface and gather into a ball. Divide the dough in half, flattening each half into a disk, cover with plastic wrap, and refrigerate for about one hour before using. This will chill the butter and relax the gluten in the flour. \r\n\r\nAfter the dough has chilled sufficiently, remove one portion of the dough from the fridge and place it on a lightly floured surface.  Roll the pastry into a 12 inch (30 cm) circle. (To prevent the pastry from sticking to the counter and to ensure uniform thickness, keep lifting up and turning the pastry a quarter turn as you roll (always roll from the center of the pastry outwards).)  Fold the dough in half and gently transfer to a 9 inch (23 cm) pie pan. Brush off any excess flour and trim any overhanging pastry to an edge of 1/2 inch (1.5 cm). Refrigerate the pastry, covered with plastic wrap, while you make the filling. \r\n\r\nRemove the second round of pastry and roll it into a 13 inch (30 cm) circle. Using a pastry wheel or pizza cutter, cut the pastry into about 3/4 inch (2 cm) strips. Place the strips of pastry on a parchment paper-lined baking sheet, cover with plastic wrap, and place in the refrigerator for about 10 minutes. \r\n\r\nMake the Strawberry Rhubarb Filling: Place the cut strawberries and rhubarb in a large bowl. In a small bowl mix together the cornstarch, sugar, and ground cinnamon. \r\n\r\nRemove the chilled pie crust from the fridge. Sprinkle about 2 tablespoons of the sugar mixture over the bottom of the pastry crust. Add the remaining sugar mixture to the strawberries and rhubarb and gently toss to combine. Pour the fruit mixture into the prepared pie shell. Sprinkle the fruit with about 1 teaspoon of lemon juice and dot with 2 tablespoons of butter.\r\n\r\nRemove the lattice pastry from the refrigerator and, starting at the center with the longest strips and working outwards, place half the strips, spacing about 1 inch (2.5 cm) apart, on top of the filling. (Use the shortest pastry strips at the outer edges.) Then, gently fold back, about halfway, every other strip of pastry. Take another strip of pastry and place it perpendicular on top of the first strips of pastry. Unfold the bottom strips of pastry and then fold back the strips that weren't folded back the first time. Lay another strip of pastry perpendicular on top of the filling and then continue with the remaining strips. Trim the edges of the pastry strips, leaving a 1 inch (2.5 cm) overhang. Seal the edges of the pastry strips by folding them under the bottom pastry crust and flute the edges of the pastry. Brush the lattice pastry with milk and sprinkle with a little sugar. Cover and place in the refrigerator while you preheat the oven to 400 degrees F (205 degrees C) and place the oven rack in the lower third of the oven. Put a baking sheet, lined with aluminum foil, on the oven rack (to catch any spills.)\r\n\r\nPlace the pie plate on the hot baking sheet and bake the pie for about 35 minutes and then, if the edges of the pie are browning too much, cover with a foil ring. Continue to bake the pie for about another 10 minutes or until the crust is a golden brown color and the fruit juices begin to bubble.\r\n\r\nRemove the pie from the oven and place on a wire rack to cool for several hours. Serve at room temperature with softly whipped cream or vanilla ice cream. Leftovers can be stored in the refrigerator for about 3 days. Reheat before serving. This pie can be frozen.\r\n\r\nMakes one 9 inch (23 cm) pie.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/178z5o1585514569.jpg",    
      "strTags": "Pudding,Pie,Baking,Fruity,Glazed",
      "strYoutube": "https://www.youtube.com/watch?v=tGw5Pwm4YA0",
      "strSource": "https://www.joyofbaking.com/StrawberryRhubarbPie.html",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "Flour",
          "measure": "350g",
          "unit": ""
        },
        {
          "name": "Salt",
          "measure": "1",
          "unit": "tsp"
        },
        {
          "name": "Sugar",
          "measure": "2",
          "unit": "tbs"
        },
        {
          "name": "Butter",
          "measure": "1",
          "unit": "cup"
        },
        {
          "name": "Water",
          "measure": "1/2",
          "unit": "cup"
        },
        {
          "name": "Rhubarb",
          "measure": "450g",
          "unit": ""
        },
        {
          "name": "Strawberries",
          "measure": "450g",
          "unit": ""
        },
        {
          "name": "Cornstarch",
          "measure": "3",
          "unit": "tbs"
        },
        {
          "name": "Sugar",
          "measure": "150g",
          "unit": ""
        },
        {
          "name": "Cinnamon",
          "measure": "1/4",
          "unit": "tsp"
        },
        {
          "name": "Lemon Juice",
          "measure": "1",
          "unit": "tsp"
        },
        {
          "name": "Unsalted Butter",
          "measure": "2",
          "unit": "tbs"
        },
        {
          "name": "Milk",
          "measure": "2",
          "unit": "tbs"
        },
        {
          "name": "Sugar",
          "measure": "",
          "unit": ""
        }
      ],
      "timePrep": 36,
      "timeCook": 110,
      "serves": 9,
      "difficulty": {
        "name": "easy",
        "value": 3
      },
      "isFavorite": false,
      "category": "category 2",
      "categories": [
        "all",
        "dessert",
        "pudding",
        "pie",
        "baking",
        "fruity",
        "glazed"
      ]
    },
    {
      "idMeal": "53054",
      "strMeal": "Seri muka kuih",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "Malaysian",
      "strInstructions": "Soak glutinous rice with water for at least 1 ½ hours prior to using. Drain.\r\nPrepare a 9-inch round or square cake pan and spray with cooking spray or line with plastic wrap.\r\nMix coconut milk, water, salt and the rice. Pour it into cake pan,  topped with the pandan knots.\r\nSteam for 30 minutes.\r\nAfter 30 minutes, fluff up the rice and remove pandan knots. Then, using a greased spatula, flatten the steamed rice. Make sure there are no holes/air bubbles and gaps in the rice, especially the sides.\r\nSteam for another 10 minutes.\r\n\r\nCombine pandan juice, coconut milk, all purpose flour, cornflour, and sugar. Mix well.\r\nAdd eggs and whisk well then strain into a medium sized metal bowl or pot.\r\nPlace pandan mixture over simmering water (double boiler or bain-marie)\r\nStir continuously and cook till custard starts to thicken. (15 minutes)\r\nPour pandan custard into glutinous rice layer, give it a little tap (for air bubbles) and continue to steam for 30 minutes.\r\nRemove kuih seri muka from the steamer and allow to cool completely before cutting into rectangles or diamond shapes.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/6ut2og1619790195.jpg",    
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=_NJtCfqgaBo",
      "strSource": "https://makan.ch/recipe/kuih-seri-muka/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "Rice",
          "measure": "400g",
          "unit": ""
        },
        {
          "name": "Coconut Milk",
          "measure": "150ml",
          "unit": ""
        },
        {
          "name": "Water",
          "measure": "100ml",
          "unit": ""
        },
        {
          "name": "Salt",
          "measure": "1",
          "unit": "tsp"
        },
        {
          "name": "Corn Flour",
          "measure": "5",
          "unit": "tbs"
        },
        {
          "name": "Flour",
          "measure": "3",
          "unit": "tbs"
        },
        {
          "name": "Eggs",
          "measure": "3",
          "unit": ""
        },
        {
          "name": "Coconut Cream",
          "measure": "200ml",
          "unit": ""
        },
        {
          "name": "Sugar",
          "measure": "140g",
          "unit": ""
        }
      ],
      "timePrep": 47,
      "timeCook": 49,
      "serves": 9,
      "difficulty": {
        "name": "medium",
        "value": 1
      },
      "isFavorite": true,
      "category": "category 5",
      "categories": [
        "all",
        "dessert"
      ]
    },
    {
      "idMeal": "52965",
      "strMeal": "Breakfast Potatoes",
      "strDrinkAlternate": null,
      "strCategory": "Breakfast",
      "strArea": "Canadian",
      "strInstructions": "Before you do anything, freeze your bacon slices that way when you're ready to prep, it'll be so much easier to chop!\r\nWash the potatoes and cut medium dice into square pieces. To prevent any browning, place the already cut potatoes in a bowl filled with water.\r\nIn the meantime, heat 1-2 tablespoons of oil in a large skillet over medium-high heat. Tilt the skillet so the oil spreads evenly.\r\nOnce the oil is hot, drain the potatoes and add to the skillet. Season with salt, pepper, and Old Bay as needed.\r\nCook for 10 minutes, stirring the potatoes often, until brown. If needed, add a tablespoon more of oil.\r\nChop up the bacon and add to the potatoes. The bacon will start to render and the fat will begin to further cook the potatoes. Toss it up a bit! The bacon will take 5-6 minutes to crisp.\r\nOnce the bacon is cooked, reduce the heat to medium-low, add the minced garlic and toss. Season once more. Add dried or fresh parsley. Control heat as needed.\r\nLet the garlic cook until fragrant, about one minute.\r\nJust before serving, drizzle over the maple syrup and toss. Let that cook another minute, giving the potatoes a caramelized effect.\r\nServe in a warm bowl with a sunny side up egg!",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1550441882.jpg",
      "strTags": "Breakfast,Brunch,",
      "strYoutube": "https://www.youtube.com/watch?v=BoD0TIO9nE4",
      "strSource": "http://www.vodkaandbiscuits.com/2014/03/06/bangin-breakfast-potatoes/",   
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "Potatoes",
          "measure": "3",
          "unit": "Medium"
        },
        {
          "name": "Olive Oil",
          "measure": "1",
          "unit": "tbs"
        },
        {
          "name": "Bacon",
          "measure": "2",
          "unit": "strips"
        },
        {
          "name": "Garlic Clove",
          "measure": "",
          "unit": ""
        },
        {
          "name": "Maple Syrup",
          "measure": "1",
          "unit": "tbs"
        },
        {
          "name": "Parsley",
          "measure": "",
          "unit": ""
        },
        {
          "name": "Salt",
          "measure": "",
          "unit": ""
        },
        {
          "name": "Pepper",
          "measure": "",
          "unit": ""
        },
        {
          "name": "Allspice",
          "measure": "",
          "unit": "taste"
        }
      ],
      "timePrep": 17,
      "timeCook": 53,
      "serves": 8,
      "difficulty": {
        "name": "hard",
        "value": 1
      },
      "isFavorite": false,
      "category": "category 1",
      "categories": [
        "all",
        "breakfast",
        "breakfast",
        "brunch",
        ""
      ]
    },
    {
      "idMeal": "52782",
      "strMeal": "Lamb tomato and sweet spices",
      "strDrinkAlternate": null,
      "strCategory": "Lamb",
      "strArea": "Moroccan",
      "strInstructions": "Use pickled vine leaves here, preserved in brine. Small delicate leaves are better than the large bristly ones but, if only large leaves are to hand, then trim them to roughly 12 by 12 cms so that you don't get too many layers of leaves around thefilling. And remove any stalks. Drain the preserved leaves, immerse them in boiling water for 10 minutes and then leave to dry on a tea towel before use. \r\nBasmati rice with butter and pine nuts is an ideal accompaniment. Couscous is great, too. Serves four.\r\nFirst make the filling. Put all the ingredients, apart from the tomatoes, in a bowl. Cut the tomatoes in half, coarsely grate into the bowl and discard the skins. Add half a teaspoon of salt and some black pepper, and stir. Leave on the side, or in the fridge, for up to a day. Before using, gently squeeze with your hands and drain away any juices that come out.\r\nTo make the sauce, heat the oil in a medium pan. Add the ginger and garlic, cook for a minute or two, taking care not to burn them, then add the tomato, lemon juice and sugar. Season, and simmer for 20 minutes.\r\nWhile the sauce is bubbling away, prepare the vine leaves. Use any torn or broken leaves to line the base of a wide, heavy saucepan. Trim any leaves from the fennel, cut it vertically into 0.5cm-thick slices and spread over the base of the pan to cover completely.\r\nLay a prepared vine leaf (see intro) on a work surface, veiny side up. Put two teaspoons of filling at the base of the leaf in a 2cm-long by 1cm-wide strip. Fold the sides of the leaf over the filling, then roll it tightly from bottom to top, in a cigar shape. Place in the pan, seam down, and repeat with the remaining leaves, placing them tightly next to each other in lines or circles (in two layers if necessary).\r\nPour the sauce over the leaves (and, if needed, add water just to cover). Place a plate on top, to weigh the leaves down, then cover with a lid. Bring to a boil, reduce the heat and cook on a bare simmer for 70 minutes. Most of the liquid should evaporate. Remove from the heat, and leave to cool a little - they are best served warm. When serving, bring to the table in the pan - it looks great. Serve a few vine leaves and fennel slices with warm rice. Spoon the braising juices on top and garnish with coriander.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/qtwtss1468572261.jpg",    
      "strTags": "",
      "strYoutube": "https://www.youtube.com/watch?v=vaZb1MnFBgA",
      "strSource": "http://www.ottolenghi.co.uk/recipes/meat/lamb-tomato-and-sweet-spices-shop",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "olive oil",
          "measure": "2",
          "unit": "tbsp"
        },
        {
          "name": "ginger",
          "measure": "4cm",
          "unit": "piece"
        },
        {
          "name": "garlic",
          "measure": "2",
          "unit": "cloves"
        },
        {
          "name": "tomatoes",
          "measure": "800g",
          "unit": "peeled"
        },
        {
          "name": "lemon juice",
          "measure": "2",
          "unit": "tbsp"
        },
        {
          "name": "caster sugar",
          "measure": "1",
          "unit": "tsp"
        },
        {
          "name": "vine leaves",
          "measure": "50",
          "unit": ""
        },
        {
          "name": "fennel bulb",
          "measure": "1",
          "unit": "large"
        },
        {
          "name": "lamb mince",
          "measure": "400g",
          "unit": ""
        },
        {
          "name": "onion",
          "measure": "1",
          "unit": "medium"
        },
        {
          "name": "potato",
          "measure": "1",
          "unit": "small"
        },
        {
          "name": "basmati rice",
          "measure": "2",
          "unit": "tbsp"
        },
        {
          "name": "chopped parsley",
          "measure": "2",
          "unit": "tbsp"
        },
        {
          "name": "coriander",
          "measure": "2",
          "unit": "tbsp"
        },
        {
          "name": "lemon juice",
          "measure": "1",
          "unit": "tbsp"
        },
        {
          "name": "garlic",
          "measure": "2",
          "unit": "cloves"
        },
        {
          "name": "clove",
          "measure": "",
          "unit": "tsp"
        },
        {
          "name": "cinnamon",
          "measure": "",
          "unit": "tsp"
        },
        {
          "name": "tomatoes",
          "measure": "2",
          "unit": "medium"
        }
      ],
      "timePrep": 10,
      "timeCook": 11,
      "serves": 7,
      "difficulty": {
        "name": "medium",
        "value": 1
      },
      "isFavorite": false,
      "category": "category 1",
      "categories": [
        "all",
        "lamb",
        "test"
      ]
    },
    {
      "idMeal": "52888",
      "strMeal": "Eccles Cakes",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "British",
      "strInstructions": "To make the pastry, dice the butter and put it in the freezer to go really hard. Tip flour into the bowl of a food processor with half the butter and pulse to the texture of breadcrumbs. Pour in the lemon juice and 100ml iced water, and pulse to a dough. Tip in the rest of the butter and pulse a few times until the dough is heavily flecked with butter. It is important that you don’t overdo this as the flecks of butter are what makes the pastry flaky.\r\nOn a floured surface roll the pastry out to a neat rectangle about 20 x 30cm. Fold the two ends of the pastry into the middle (See picture 1), then fold in half (pic 2). Roll the pastry out again and refold the same way 3 more times resting the pastry for at least 15 mins each time between roll and fold, then leave to rest in the fridge for at least 30 mins before using.\r\nTo make the filling, melt the butter in a large saucepan. Take it off the heat and stir in all the other ingredients until completely mixed, then set aside.\r\nTo make the cakes, roll the pastry out until it’s just a little thicker than a £1 coin and cut out 8 rounds about 12cm across. Re-roll the trimming if needed. Place a good heaped tablespoon of mixture in the middle of each round, brush the edges of the rounds with water, then gather the pastry around the filling and squeeze it together (pic 3). Flip them over so the smooth top is upwards and pat them into a smooth round. Flatten each round with a rolling pin to an oval until the fruit just starts to poke through, then place on a baking tray. Cut 2 little slits in each Eccles cakes, brush generously with egg white and sprinkle with the sugar (pic 4).\r\nHeat the oven to 220C/200C fan/gas 8. Bake the Eccles cakes for 15-20 mins until just past golden brown and sticky. Leave to cool on a rack and enjoy while still warm or cold with a cup of tea. If you prefer, Eccles cakes also go really well served with a wedge of hard, tangy British cheese such as Lancashire or cheddar.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wtqrqw1511639627.jpg",    
      "strTags": "Snack,Treat",
      "strYoutube": "https://www.youtube.com/watch?v=xV0QCJ0GD5w",
      "strSource": "https://www.bbcgoodfood.com/recipes/786659/eccles-cakes",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "Butter",
          "measure": "250g",
          "unit": ""
        },
        {
          "name": "Plain Flour",
          "measure": "350g",
          "unit": ""
        },
        {
          "name": "Lemon",
          "measure": "",
          "unit": "of"
        },
        {
          "name": "Butter",
          "measure": "25g",
          "unit": ""
        },
        {
          "name": "Currants",
          "measure": "200g",
          "unit": ""
        },
        {
          "name": "Mixed Peel",
          "measure": "50g",
          "unit": ""
        },
        {
          "name": "Muscovado Sugar",
          "measure": "100g",
          "unit": ""
        },
        {
          "name": "Cinnamon",
          "measure": "1",
          "unit": "tsp"
        },
        {
          "name": "Ginger",
          "measure": "1",
          "unit": "tsp"
        },
        {
          "name": "Allspice",
          "measure": "1",
          "unit": "tsp"
        },
        {
          "name": "Lemon",
          "measure": "",
          "unit": "of"
        },
        {
          "name": "Eggs",
          "measure": "1",
          "unit": "beaten"
        },
        {
          "name": "Sugar",
          "measure": "",
          "unit": ""
        }
      ],
      "timePrep": 60,
      "timeCook": 106,
      "serves": 6,
      "difficulty": {
        "name": "easy",
        "value": 2
      },
      "isFavorite": false,
      "category": "category 8",
      "categories": [
        "all",
        "dessert",
        "snack",
        "treat"
      ]
    },
    {
      "idMeal": "52823",
      "strMeal": "Salmon Prawn Risotto",
      "strDrinkAlternate": null,
      "strCategory": "Seafood",
      "strArea": "Italian",
      "strInstructions": "Melt the butter in a thick-based pan and gently cook the onion without colour until it is soft.\r\nAdd the rice and stir to coat all the grains in the butter\r\nAdd the wine and cook gently stirring until it is absorbed\r\nGradually add the hot stock, stirring until each addition is absorbed. Keep stirring until the rice is tender\r\nSeason with the lemon juice and zest, and pepper to taste. (there will probably be sufficient saltiness from the salmon to not need to add salt) Stir gently to heat through\r\nServe scattered with the Parmesan and seasonal vegetables.\r\nGrill the salmon and gently place onto the risotto with the prawns and asparagus",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",    
      "strTags": "Fish",
      "strYoutube": "https://www.youtube.com/watch?v=V2PMvBv52IE",
      "strSource": "http://www.rangemaster.co.uk/rangemaster-owners/recipes-ideas-inspiration/recipes/mains/prawn-and-hot-smoked-salmon-risotto-with-asparagus",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "butter",
          "measure": "50g/2oz",
          "unit": ""
        },
        {
          "name": "onion",
          "measure": "1",
          "unit": "finely"
        },
        {
          "name": "rice",
          "measure": "150g",
          "unit": ""
        },
        {
          "name": "white wine",
          "measure": "125ml",
          "unit": ""
        },
        {
          "name": "vegetable stock",
          "measure": "1",
          "unit": "litre"
        },
        {
          "name": "lemon",
          "measure": "",
          "unit": "juice"
        },
        {
          "name": "King Prawns",
          "measure": "240g",
          "unit": "large"
        },
        {
          "name": "salmon",
          "measure": "150g",
          "unit": ""
        },
        {
          "name": "asparagus",
          "measure": "100g",
          "unit": "tips"
        },
        {
          "name": "black pepper",
          "measure": "",
          "unit": ""
        },
        {
          "name": "Parmesan",
          "measure": "50g",
          "unit": "shavings"
        }
      ],
      "timePrep": 13,
      "timeCook": 63,
      "serves": 9,
      "difficulty": {
        "name": "hard",
        "value": 3
      },
      "isFavorite": false,
      "category": "category 7",
      "categories": [
        "all",
        "seafood",
        "fish"
      ]
    },
    {
      "idMeal": "53035",
      "strMeal": "Ham hock colcannon",
      "strDrinkAlternate": null,
      "strCategory": "Pork",
      "strArea": "Irish",
      "strInstructions": "STEP 1\r\nPeel and cut the potatoes into even, medium-sized chunks. Put in a large pan filled with cold salted water, bring to the boil and cook for 10-15 mins until a knife can be inserted into the potatoes easily.\r\n\r\nSTEP 2\r\nMeanwhile, melt the butter in a large sauté pan over a medium heat. Add the garlic, cabbage, spring onions and some seasoning. Stir occasionally until the cabbage is wilted but still retains a little bite, then set aside.\r\n\r\nSTEP 3\r\nDrain the potatoes, leave to steam-dry for a couple of mins, then mash with the cream, mustard and seasoning in the same saucepan. Stir in the cabbage and ham hock. Keep warm over a low heat.\r\n\r\nSTEP 4\r\nReheat the pan you used to cook the cabbage (no need to wash first), add a splash of oil, crack in the eggs and fry to your liking. To serve, divide the colcannon between bowls and top each with a fried egg.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/n41ny81608588066.jpg",    
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=aQJAU2iJ730",
      "strSource": "https://www.bbcgoodfood.com/recipes/ham-hock-colcannon",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "Floury Potatoes",
          "measure": "800g",
          "unit": ""
        },
        {
          "name": "Butter",
          "measure": "50g",
          "unit": ""
        },
        {
          "name": "Garlic Clove",
          "measure": "3",
          "unit": "chopped"
        },
        {
          "name": "Cabbage",
          "measure": "1",
          "unit": "chopped"
        },
        {
          "name": "Spring Onions",
          "measure": "8",
          "unit": ""
        },
        {
          "name": "Double Cream",
          "measure": "100ml",
          "unit": ""
        },
        {
          "name": "Mustard",
          "measure": "2",
          "unit": "tbs"
        },
        {
          "name": "Ham",
          "measure": "180g",
          "unit": ""
        },
        {
          "name": "Eggs",
          "measure": "4",
          "unit": ""
        }
      ],
      "timePrep": 33,
      "timeCook": 111,
      "serves": 8,
      "difficulty": {
        "name": "easy",
        "value": 1
      },
      "isFavorite": true,
      "category": "category 4",
      "categories": [
        "all",
        "pork"
      ]
    },
    {
      "idMeal": "52821",
      "strMeal": "Laksa King Prawn Noodles",
      "strDrinkAlternate": null,
      "strCategory": "Seafood",
      "strArea": "Malaysian",
      "strInstructions": "Heat the oil in a medium saucepan and add the chilli. Cook for 1 min, then add the curry paste, stir and cook for 1 min more. Dissolve the stock cube in a large jug in 700ml boiling water, then pour into the pan and stir to combine. Tip in the coconut milk and bring to the boil.\r\nAdd the fish sauce and a little seasoning. Toss in the noodles and cook for a further 3-4 mins until softening. Squeeze in the lime juice, add the prawns and cook through until warm, about 2-3 mins. Scatter over some of the coriander.\r\nServe in bowls with the remaining coriander and lime wedges on top for squeezing over.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/rvypwy1503069308.jpg",    
      "strTags": "Shellfish,Seafood",
      "strYoutube": "https://www.youtube.com/watch?v=OcarztU8cYo",
      "strSource": "https://www.bbcgoodfood.com/recipes/prawn-laksa-curry-bowl",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null,
      "ingredients": [
        {
          "name": "Olive Oil",
          "measure": "1",
          "unit": "tbsp"
        },
        {
          "name": "Red Chilli",
          "measure": "1",
          "unit": "finely"
        },
        {
          "name": "Thai red curry paste",
          "measure": "2",
          "unit": "½"
        },
        {
          "name": "vegetable stock cube",
          "measure": "1",
          "unit": ""
        },
        {
          "name": "coconut milk",
          "measure": "400ml",
          "unit": "can"
        },
        {
          "name": "fish sauce",
          "measure": "2",
          "unit": "tsp"
        },
        {
          "name": "rice noodles",
          "measure": "100g",
          "unit": ""
        },
        {
          "name": "lime",
          "measure": "2",
          "unit": "juice"
        },
        {
          "name": "king prawns",
          "measure": "150g",
          "unit": ""
        },
        {
          "name": "coriander",
          "measure": "",
          "unit": "small"
        }
      ],
      "timePrep": 51,
      "timeCook": 86,
      "serves": 10,
      "difficulty": {
        "name": "easy",
        "value": 3
      },
      "isFavorite": true,
      "category": "category 3",
      "categories": [
        "all",
        "seafood",
        "shellfish",
        "seafood"
      ]
    },
  ]

  const pushColorCategories = async (category) => {
    
    if (!colorsCategories) {
      const copyRetriesColors = [...retriesColorsCategories];
      
      setRetriesColorsCategories([...copyRetriesColors, category]);
      return;
    }

    if (Object.keys(colorsCategories).includes(category)) {
      return;
    }
    let obj = {};

    await getArrayColor()
    .then((color) => {
      obj = color;

      if (Object.keys(obj).length === 0) {
        const copyRetriesColors = [...retriesColorsCategories];

        if (!copyRetriesColors.includes(category)) {
          setRetriesColorsCategories([...copyRetriesColors, category]);
        }
      }
    });

    if (Object.keys(obj).length !== 0) {
      setColorsCategories({...colorsCategories, [category]: obj});
    }
  }
  
  const getArrayColor = async () => {
    let obj = {};
    
    if (arrayColors.length !== 0) {
      const copyArrayColors = [...arrayColors];

      obj.color = arrayColors[Math.floor(Math.random() * arrayColors.length)]
      setArrayColors(copyArrayColors.filter((color) => color !== obj.color));
    } else {
      return obj;
    }
    
    return obj;
  }

  const initializeArrayColors = async () => {
    await createArrayColors()
    .then((colors) => {
      setArrayColors(colors);
    })
  }

  useEffect(() => {
    if (retriesColorsCategories.length > 0) {
      pushColorCategories(retriesColorsCategories[0]);
    }

    console.log('useEffect this retriesColorsCategories')
  }, [retriesColorsCategories]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setArrayRecipies(arrFetchDebug);
      for (let r in arrFetchDebug) {
        for (let c in arrFetchDebug[r].categories) {
          await pushColorCategories(arrFetchDebug[r].categories[c]);
        }
      }
      setLoading(false);
    })();
    console.log('useEffect []')
  }, []); // Añadir un array de dependencias vacío para que se ejecute solo una vez

  useEffect(() => {
    if (arrayColors.length > 0 && retriesColorsCategories.length > 0) {
      const copyRetriesColors = [...retriesColorsCategories];

      for (let c in copyRetriesColors) {
        setTimeout(() => {
          pushColorCategories(copyRetriesColors[c]);
          setRetriesColorsCategories(copyRetriesColors.splice(c, 1));
        }, 200);
      }
    }
    console.log('useEffect this arrayColors, retriesColorsCategories')
  }, [arrayColors, retriesColorsCategories]);

  useEffect(() => {
    if (arrayColors.length === 0) initializeArrayColors();
    console.log('useEffect arrayColors')
  }, [arrayColors]);

  useEffect(() => {
    if (colorsCategories === null) {
      (async () => {
        await getItem('colorsCategories')
        .then((value) => {
          if (value) {

            if (value !== null && value !== undefined) {
              setColorsCategories(JSON.parse(value));
            } else {
              setColorsCategories({});
            }
          }
        })
        .catch((error) => {
          console.log('ERROR' + error);
        })
      })()
    }

    if (colorsCategories !== null && Object.keys(colorsCategories).length > 0) {
      setItem('colorsCategories', JSON.stringify(colorsCategories))
    }

    console.log('useEffect colorsCategories')
  }, [colorsCategories])

  useEffect(() => {
    
    (async () => {
      setLoading(true);
      setArrayRecipies(arrFetchDebug);
      for (let r in arrFetchDebug) {
        for (let c in arrFetchDebug[r].categories) {
          await pushColorCategories(arrFetchDebug[r].categories[c]);
        }
      }
      setLoading(false);
    })()

    // console.log('recipies ', arrFetchDebug.length)
    // editRecipy(arrFetchDebug[arrFetchDebug.length-1], pushColorCategories)


    /*
    (async () => {
      setLoading(true);

      await getItem('arrayRecipies')
      .then( async (value) => {
        if (value && !reloadFetchData && !fetchedData) {
          setArrayRecipies(JSON.toString(value));
        } else {
          setLoading(true);
          pushColorCategories('all');
          await fetchNRecipies(15, pushColorCategories)
          .then(async (recipies) => {
            setLoading(false);
            pushColorCategories('own');
            console.log('recipies: ', recipies.length);
            
            for (let r in recipies) {
              recipies[r] && recipies[r].strMeal && console.log(`recipies[${r}]: ${recipies[r].strMeal}`)
            }
            const newRecipies = recipies.filter(recipy => recipy !== null && recipy !== undefined)
            setArrayRecipies(newRecipies);

            await setItem('arrayRecipies', JSON.stringify(newRecipies))
            .then(async () => {
              await getItem('arrayRecipies')
              .then((value) => {
                console.log('arrayRecipies: ', value);
              }
            })
            .catch((error) => {
              console.log('ERROR' + error);
            })
            setFetchedData(true);
            console.log('fetched data');
          })
        }
      })
    })()*/
      console.log('useEffect []2')
  }, [])

  

  useEffect(() => {
    if (arrayColors.length > 0 && retriesColorsCategories.length > 0) {
      const copyRetriesColors = [...retriesColorsCategories];

      for (let c in copyRetriesColors) {
        setTimeout(() => {
          pushColorCategories(copyRetriesColors[c]);
          setRetriesColorsCategories(copyRetriesColors.splice(c, 1));
        }, 200)
      }
    }
    console.log('useEffect arrayColors2')
  }, [arrayColors])

  useEffect(() => {
    if (arrayColors.length === 0)
      initializeArrayColors();
    console.log('useEffect arrayColors3')    
  }, [arrayColors])

  /*useEffect(() => {
    console.log('cc ',JSON.stringify(colorsCategories, null, 2));
  }, [colorsCategories])*/

  const lightBackgroundImage = require(`./assets/images-bg/cookery-light.png`);
  const darkBackgroundImage = require(`./assets/images-bg/cookery-dark.png`);
  const blurRadius = 1;

  const consts = {
    px: 392.7/709,
    expo: 392.7/(709*2),
    widthScreen: 709,
    heightScreen: 1552,
  };

  const styles = {
    fonts: {
      mali: {
        regular: 'mali',
        bold: 'mali-bold',
        italic: 'mali-italic',
        boldItalic: 'mali-bold-italic',
        extraLight: 'mali-extra-light',
        extraLightItalic: 'mali-extra-light-italic',
        light: 'mali-light',
        lightItalic: 'mali-light-italic',
        medium: 'mali-medium',
        mediumItalic: 'mali-medium-italic',
        semiBold: 'mali-semi-bold',
        semiBoldItalic: 'mali-semi-bold-italic',
      }
    },
    transparentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    container:
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: theme[mode].backgroundColor,
    },
    opacity:
    {
      flex: 1,
      backgroundColor: theme[mode].backgroundColor,     //backgroundColor: theme[mode].backgroundColor, backgroundColorInterpolation
      alignItems: 'center',
      justifyContent: 'center',
      opacity: opacityref,
    },
    simpleButtons:{
      borderRadius: 10, 
      backgroundColor: '#ddd',
      width: 'min-content',
      marginHorizontal: 5,
    },
    icons: {
      small: {
        color: theme[mode].icons,
        px: 38,
        top: 3,
        left: 3,
      }
    },
    popUp: {
      background: {
        position: 'absolute',
        width: '100%',
        height: 1552*consts.px,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme[mode].icons+Math.abs((theme[mode].opacityPopUp*256).toFixed(0)).toString(16),
        zIndex: 2,
      },
      container: {
        backgroundColor: theme[mode].icons,
        borderRadius: 30*consts.px,
        alignItems: 'center',
        width: 450*consts.px,
        height: 350*consts.px,
      },
      title : {
        color: theme[mode].noColor,
        fontSize: 35*consts.px,
        textAlign: 'center',
        marginTop: 30*consts.px,
        marginBottom: 20*consts.px,
      },
      input: {
        borderColor: theme[mode].noColor,
        width: 350*consts.px,
        color: theme[mode].noColor,
      },
      placeholderInput: {
        cursorColor: theme[mode].noColor,
        selectionColor: mode,
        placeholderTextColor: theme[mode].noIcons+'cc',
      },
      button: {
        borderRadius: 30*consts.px,
        padding: 20*consts.px,
        width: 180*consts.px,
        height: 70*consts.px,
        alignItems: 'center',
        justifyContent: 'center',
      },
      textButton: {
        fontSize: 28*consts.px,
        textAlign: 'center',
      },
    }
  };
    
  const dataInput = {
    mode,
    theme,
    styles,
    consts,
    isInputFocus,
    setIsInputFocus,
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
  }
  
  const dataMssg = {
    isHiddenMssg,
    setIsHiddenMssg,
    textMssg,
    setTestMssg,
    colorMssg,
    setColorMssg,
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
  }

  const dataButtonBack = {
    theme,
    mode,
    consts,
    isInputFocus,
    setIsInputFocus,
    onPress: () => {
      setIsInputFocus(false)
    },
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
  }

  const dataPinInput = {
    theme,
    mode,
    consts,
    styles,
    dataInput,
    isPinInput: false,
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
  }

  const dataIconButton = {
    theme,
    mode,
    setMode,
    consts,
    styles,
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
  }

  const dataMessage = {
    theme,
    mode,
    consts,
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
  }

  const dataPages = {
    theme,
    mode,
    consts,
    isInputFocus,
    setIsInputFocus,
    devMode,
    styles,
    showDebugMenu,
    setShowDebugMenu,
    strpage,
    setStrPage,
    bgColorNavBar,
    setBgColorNavBar,
    defaultValueUsernameLogin,
    setDefaultValueUsernameLogin,
    loading,
    setLoading,
    setTextLoading,
    setBreadCrumb,
    breadCrumb,
    idMainSession,
    setIdMainSession,
    pushColorCategories,
    arrayRecipies,
    colorsCategories,

    dataInput,
    dataMssg,
    dataButtonBack,
    dataPinInput,
    dataIconButton,
    dataMessage,
  }

  const objdebug = {
    loading : <LoadingScreen data={dataPages} />,
    login:  <Login data={dataPages} />,
    forgotPassword:  <ForgotPassword data={dataPages} />,
    register:  <Register data={dataPages} />,
    detailsRecipy:  <DetailsRecipy data={dataPages} />,
    deviceAccounts: <DeviceAccounts data={dataPages} />,
    userAccounts: <UserAccounts data={dataPages} />,
    listRecipies: <ListRecipies data={dataPages} />,
  }
  const arrdebug = Object.keys(objdebug);
  
  try {
    NavigationBar.setBackgroundColorAsync(bgColorNavBar);
  } catch (err) {
    console.log(err)
  }

  useEffect(() => {

    Animated.timing(opacityref, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    

    /*axios.get(`${SERVER_URL}/test-db`)
    .catch((err) => {
      ToastAndroid.showWithGravityAndOffset('Error DB access', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
    })*/
    console.log('useEffect []3')
  }, []);

  useEffect(() => {
    if (idMainSession === null) {
      getItem('idMainSession')
      .then((value) => {
        if (value) {
          setIdMainSession(value);
        } else {
          setIdMainSession('');
        }
      });
    } else {
      setItem('idMainSession', idMainSession);
    }

    console.log('idMainSession: ', idMainSession);
  }, [idMainSession])

  useEffect(() => {
    let add = '';

    if (isInputFocus)
      add = 'keyboard';
    else
      add = strpage;
    
    setBreadCrumb([...breadCrumb, add]);
    console.log('useEffect strpage, isInputFocus')
  }, [strpage, isInputFocus])

  useEffect(() => {
    (async () => {
      await getItem('mode').then((value) => {
        if (!modeSetted) {
          if (!value) {
            setItem('mode', Appearance.getColorScheme()).then(() => {
              setModeSetted(true);
            });
            setMode(Appearance.getColorScheme());
          } else {
            setMode(value);
            setModeSetted(true);
          }
        } else {
          setItem('mode', mode);
        }
      });
    })();

    Animated.timing(bgColor, {
      toValue: mode === 'dark' ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Appearance.setColorScheme(mode);
    
    setBgColorNavBar(theme[mode].backgroundColor);
  }, [mode]);

  const backgroundColorInterpolation = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.light.backgroundColor, theme.dark.backgroundColor],
  });

  useEffect(() => {
    if(appState === 'initializing' && strpage === 'loading' && devMode[devMode.power].screenLoading){
      setTimeout(() => {
        setStrPage('login');
        setAppState('running');
      }, devMode[devMode.power].timeLoading);
    } else {
      if (devMode.power === 'on')
        setAppState('running');
    }
    console.log('useEffect this devMode')
  }, [devMode]);

  useEffect(() => {
    switch(strpage){
      case 'login':
        setIsHiddenMssg(true);
        setIsInputFocus(false);
        setDefaultValueUsernameLogin('');
        break;
      case 'forgotPassword':
        setIsHiddenMssg(true);
        break;
      case 'register':
        setIsHiddenMssg(true);
        break;
    }
    if(varpage === 'page' || varpage === 'selected'){
      setStrPage(arrdebug[page]);
      
      if (varpage === 'page') 
        setVarPage('selected');
    }
    console.log('useEffect page')
  }, [page]);

  useEffect(()=>{
    if(varpage === 'strpage' || varpage === 'selected'){
      setPage(arrdebug.findIndex((page)=>strpage === page))

      if (varpage === 'strpage') 
        setVarPage('selected');
    }
    console.log('useEffect strpage')
  }, [strpage])


  //loading font...
  if (!fontLoaded && !fontLoadedError) {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={mode === 'light' ? splashLight : splashDark }
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          blurRadius={blurRadius}
        />
      </View>
    )
  }

  return (
      <View 
        key={'backgroundApp'}
        style={ styles.container } 
      >
        <Image
          resizeMode="cover"
          source={mode === 'light' ? lightBackgroundImage : darkBackgroundImage }
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          blurRadius={blurRadius}
        />

        { objdebug[strpage] }
        
        <Loading data={{...dataPages, textLoading}} />

        <DebugMenu
          data={{
            styles,
            setPage,
            page,
            arrdebug,
            dataIconButton,
            showDebugMenu,
            theme,
            mode,
            setLoading,
            consts,
          }}
        />
        
      </View>
  );
}



export const theme = {
  dark: {
    backgroundColor: '#803C00',
    noBackgroundColor: '#FF7900',
    color: '#ffffff',
    noColor: '#000000',
    shadowTitle: '#000000',
    icons: "#eeeeee",
    noIcons: "#292929",
    noMode: 'light',
    errorColor: '#C20A0A',
    noErrorColor: '#A11212',
    successColor: '#30CC00',
    highSafety: '#30CC00',
    mediumSafety: '#C8AE04',
    lowSafety: '#FF0000',
    contrastingYellow: '#E1B61E',
    opacityPopUp: 0.33,
    delete: '#E61919',
    contrastingGreen: '#1CB09C',
    noContrastingGreen: '#0A423B',
    favorite: '#69C17C',
    difficulty: {
      easy: {
        background: '#124D00',
        border: '#30CC00',
      },
      medium: {
        background: '#4D2F00',
        border: '#CC7E00',
      },
      hard: {
        background: '#4D0000',
        border: '#FF0000',
      },
    },
  },
  light: {
    backgroundColor: '#FF7900',
    noBackgroundColor: '#803C00',
    color: '#000000',
    noColor: '#ffffff',
    shadowTitle: '#dddddd',
    icons: "#292929",
    noIcons: "#eeeeee",
    noMode: 'dark',
    errorColor: '#A11212',
    noErrorColor: '#C20A0A',
    successColor: '#124D00',
    highSafety: '#124D00',
    mediumSafety: '#7D6D02',
    lowSafety: '#760D0D',
    contrastingYellow: '#5A490C',
    opacityPopUp: 0.5,
    delete: '#FF0000',
    contrastingGreen: '#0A423B',
    noContrastingGreen: '#1CB09C',
    favorite: '#347E44',
    difficulty: {
      easy: {
        background: '#B1FF99',
        border: '#3CFF00',
      },
      medium: {
        background: '#FFD084',
        border: '#FF9D00',
      },
      hard: {
        background: '#FF9999',
        border: '#FF0000',
      },
    },
  },
}