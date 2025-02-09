import { View, StatusBar, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import SvgIconProvider from '../svg/svgIconProvider';
import Svg, { Circle } from 'react-native-svg';
import { useState } from 'react';

const ElementRecipy = ({ data, index, recipy }) => {

  const { mode, consts, styles, theme, showDebugMenu, setShowDebugMenu, devMode } = data;

  const strMeal = recipy.strMeal;
  const ingredients = recipy.ingredients;
  const totalIngredients = recipy.ingredients.length;

  const heightElement = 200*consts.px;
  const widthElement = ((consts.widthScreen*0.9))*consts.px;
  const maxLengthTitle = 20;
  const maxLengthIngredientName = 20;
  const maxLengthDifficulty = 6;
  const ingredientsPerColumn = 5;
  const maxColIngredients = 1;
  const totalColIngredients = Math.ceil(totalIngredients/ingredientsPerColumn);
  const colsToShow = totalColIngredients > maxColIngredients ? maxColIngredients : totalColIngredients;

  const [isFavorite, setIsFavorite] = useState(recipy.isFavorite);

  return (
    <View style={ styles.container }>
      <View
        key={'container-'+index}
        style={{
          width: widthElement,
          height: heightElement,
          backgroundColor: mode === 'light' ? theme[mode].noIcons+'cc' : theme[mode].noIcons,
          borderRadius: 20*consts.px,
          marginBottom: 25*consts.px,
        }}
      >
        <Image
          key={'image-'+index}
          source={{ uri: recipy.strMealThumb}}
          style={{
            width: heightElement,
            height: '100%',
            borderRadius: 20*consts.px,
          }}
        />

        <Text
          key={'title-'+index}
          style={{
            fontFamily: styles.fonts.mali.bold,
            position: 'absolute',
            left: heightElement,
            color: theme[mode].color,
            paddingLeft: 30*consts.px,
            fontSize: 30*consts.px,
            width: widthElement - heightElement,
            overflow: 'hidden',
            textDecorationLine: 'underline',
          }}
        >
          {strMeal.split('').length > maxLengthTitle ? strMeal.split('').filter((word, i) =>i<maxLengthTitle).join('')+'...' : strMeal} 
        </Text>

        <View
          key={'ingredients-'+index}
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            left: heightElement,
            top: 60*consts.px,
          }}
        >
        {
          Array(colsToShow).fill(0).map((_, i) => 
            <View
              key={'col-'+index+'-'+i}
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                left: (heightElement*7/8)*i,
              }}
            >
              {
                Array(ingredientsPerColumn).fill(0).map((_, j) =>
                  ingredients[i*ingredientsPerColumn+j] !== undefined ? 
                    <View
                      key={'ingredient-'+index+'-'+i+'-'+j}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        key={'ingredient-text-'+index+'-'+i+'-'+j}
                        style={{
                          fontFamily: styles.fonts.mali.regular,
                          color: theme[mode].color,
                          paddingLeft: 30*consts.px,
                          fontSize: 14*consts.px,
                          height: 23*consts.px,
                        }}
                      >
                        {'•  ('+ingredients[i*ingredientsPerColumn+j].measure+') '+ (ingredients[i*ingredientsPerColumn+j].name.split('').length > maxLengthIngredientName ? ingredients[i*ingredientsPerColumn+j].name.split('').filter((word, i) =>i<maxLengthIngredientName).join('')+'...' : ingredients[i*ingredientsPerColumn+j].name)}
                      </Text>
                      {
                        i*ingredientsPerColumn+j === maxColIngredients*ingredientsPerColumn-1 ? 
                          <Text
                            key={'ingredient-ellipsis-'+index+'-'+i+'-'+j}
                            style={{
                              fontFamily: styles.fonts.mali.regular,
                              color: theme[mode].color,
                              paddingLeft: 30*consts.px,
                              fontSize: 14*consts.px,
                              position: 'absolute',
                              top: 18*consts.px,
                            }}
                          >...</Text>
                        : null
                      }
                    </View>
                  : null
                )
              }
            </View>
          )
        }
        </View>

        <View
          key={'clock-icon-'+index}
        >
          <SvgIconProvider
            src='styles'  
            d="M7.5.877a6.623 6.623 0 100 13.246A6.623 6.623 0 007.5.877zM1.827 7.5a5.673 5.673 0 1111.346 0 5.673 5.673 0 01-11.346 0zM8 4.5a.5.5 0 00-1 0v3a.5.5 0 00.146.354l2 2a.5.5 0 00.708-.708L8 7.293V4.5z"
            styles={{
              color: theme[mode].icons,
              px: 18,
              top: 3,
              left: 3,
            }}
            strprops='color, px, top, left'
            stylesvg={{
              position: 'absolute',
              left: widthElement - (18*2)*consts.px - 145*consts.px,
              top: -(18*2)*consts.px - 100*consts.px,
            }}
            stylepath={{
              strokeWidth: 2*consts.px,
              stroke: theme[mode].icons,
            }}
          />
          <Text
            key={'clock-text-'+index}
            style={{
              fontFamily: styles.fonts.mali.regular,
              position: 'absolute',
              left: widthElement - (18*2)*consts.px - 145*consts.px + 20*consts.px,
              top: -(18*2)*consts.px - 107*consts.px,
              color: theme[mode].color,
              paddingLeft: 30*consts.px,
              fontSize: 16*consts.px,
            }}
          >
            {'Prep: '+recipy.timePrep+' min\nCook: '+recipy.timeCook+' min'}
          </Text>
        </View>
        
        <View
          key={'dish-icon-'+index}
          style={{
            position: 'absolute',
            bottom: 100*consts.px,
            right: 345*consts.px,
          }}
        >
          <SvgIconProvider
            src='styles'  
            d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346z"
            styles={{
              color: theme[mode].icons,
              px: 18,
              top: 3,
              left: 3,
            }}
            strprops='color, px, top, left'
            stylesvg={{
              position: 'absolute',
              left: heightElement - (18*2)*consts.px,
            }}
            stylepath={{
              strokeWidth: 5*consts.px,
              stroke: theme[mode].icons,
            }}
            viewBox='-1 -1 20 20'
          />
          <Svg
            key={'dish-svg-'+index}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              top: 20*consts.px,
              left: 178.5*consts.px,
              width: 20,
              height: 20,
            }}
          >
            <Circle 
              key={'dish-circle-'+index}
              cx={5*consts.px} 
              cy={5*consts.px} 
              r={5*consts.px} 
              fill={theme[mode].icons}
            />
          </Svg>
          <Text
            key={'dish-text-'+index}
            style={{
              fontFamily: styles.fonts.mali.regular,
              position: 'absolute',
              left: 185*consts.px,
              top: 7*consts.px,
              color: theme[mode].color,
              paddingLeft: 30*consts.px,
              fontSize: 16*consts.px,
            }}
          >
            {'Serves: '+recipy.serves}
          </Text>
        </View>

        <TouchableOpacity
          key={'fav-icon-'+index}
          onPress={() => {
            setIsFavorite(!isFavorite);
            recipy.isFavorite = !recipy.isFavorite;
          }}
        >
          <SvgIconProvider
            src='styles'
            d={isFavorite ? "M7.223.666a.3.3 0 01.554 0L9.413 4.6a.3.3 0 00.253.184l4.248.34a.3.3 0 01.171.528L10.85 8.424a.3.3 0 00-.097.297l.99 4.145a.3.3 0 01-.45.326L7.657 10.97a.3.3 0 00-.312 0l-3.637 2.222a.3.3 0 01-.448-.326l.989-4.145a.3.3 0 00-.097-.297L.915 5.652a.3.3 0 01.171-.527l4.248-.34a.3.3 0 00.253-.185L7.223.666z" : "M6.98 1.252l-.022.05L5.588 4.6a.3.3 0 01-.253.184l-3.561.286-.055.004-.331.027-.3.024a.3.3 0 00-.172.527l.23.196.252.216.041.036 2.713 2.324a.3.3 0 01.097.297l-.83 3.475-.012.053-.077.323-.07.294a.3.3 0 00.448.326l.258-.158.284-.173.046-.028 3.049-1.863a.3.3 0 01.312 0l3.049 1.863.046.028.284.173.258.158a.3.3 0 00.448-.326l-.07-.293-.077-.324-.013-.053-.829-3.475a.3.3 0 01.097-.297L13.562 6.1l.041-.036.253-.216.23-.196a.3.3 0 00-.172-.527l-.3-.024-.332-.027-.055-.004-3.56-.286a.3.3 0 01-.254-.184L8.042 1.302l-.021-.05-.128-.307-.116-.279a.3.3 0 00-.554 0l-.116.279-.128.307zm.52 1.352l-.99 2.38a1.3 1.3 0 01-1.096.797l-2.57.206 1.958 1.677a1.3 1.3 0 01.418 1.29l-.598 2.507 2.2-1.344a1.3 1.3 0 011.356 0l2.2 1.344-.598-2.508a1.3 1.3 0 01.418-1.289l1.958-1.677-2.57-.206a1.3 1.3 0 01-1.096-.797l-.99-2.38z"}
            styles={{
              color: theme[mode].favorite,
              px: 20,
              top: 3,
              left: 3,
            }}
            strprops='color, px, top, left'
            stylesvg={{
              position: 'absolute',
              left: widthElement - (20*2)*consts.px - 20*consts.px,
              top: -55*consts.px,
            }}
          />
        </TouchableOpacity>

        {/*Difficulty component */}
        <View
          key={'difficulty-icon-'+index}
          style={{
            position: 'absolute',
            right: 70*consts.px,
            bottom: 48*consts.px,
            width: 200*consts.px,
          }}
        >
          
          <View
            key={'difficulty-view-'+index}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              backgroundColor: theme[mode].difficulty[recipy.difficulty.name].background,
              paddingHorizontal: 22*consts.px,
              borderRadius: 50*consts.px,
              height: 35*consts.px,

              borderWidth: 2*consts.px,
              borderColor: theme[mode].difficulty[recipy.difficulty.name].border,
            }}
          >
            <Text
              key={'difficulty-text-'+index}
              style={{
                fontFamily: styles.fonts.mali.bold,
                color: theme[mode].color,
                fontSize: 14*consts.px,
                textAlign: 'center',
                top: -2*consts.px,
                alignSelf: 'center',
              }}
            >
              {(recipy.difficulty.name.split('')[0].toUpperCase() + recipy.difficulty.name.slice(1)).split('').length > maxLengthDifficulty ? (recipy.difficulty.name.split('')[0].toUpperCase() + recipy.difficulty.name.slice(1)).split('').filter((word, i) =>i < maxLengthDifficulty).join('')+'...' : (recipy.difficulty.name.split('')[0].toUpperCase() + recipy.difficulty.name.slice(1))}
            </Text>
          </View>
        </View>
        
      </View>
    </View>
  );
}

export default ElementRecipy;