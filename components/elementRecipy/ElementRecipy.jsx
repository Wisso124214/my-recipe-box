import { View, StatusBar, Text, Image, TouchableHighlight } from 'react-native';

const ElementRecipy = ({ data, index }) => {

  const { mode, consts, styles, theme, showDebugMenu, setShowDebugMenu, devMode } = data;
  const heightElement = 190*consts.px;
  const widthElement = ((consts.widthScreen*0.8))*consts.px;
  const maxLengthTitle = 14;
  
  const title = 'Recipy '+(index+1);
  const totalIngredients = 10;
  const ingredientsPerColumn = 5;
  const maxColIngredients = 3;
  const totalColIngredients = Math.ceil(totalIngredients/ingredientsPerColumn);
  const colsToShow = totalColIngredients > maxColIngredients ? maxColIngredients : totalColIngredients;
  const ingredients = Array(totalIngredients).map((i)=>'Ingredient '+i);

  return (
    <View style={ styles.container }>
      <View
        style={{
          width: widthElement,
          height: heightElement,
          backgroundColor: mode === 'light' ? theme[mode].noIcons+'cc' : theme[mode].noIcons,
          borderRadius: 20*consts.px,
          marginBottom: 30*consts.px,
        }}
      >
        <Image
          /*source={require('../../assets/adaptive-icon.png')}*/
          source={require('../../assets/others/icons-notification2-white.jpg')}
          style={{
            width: heightElement,
            height: '100%',
            borderRadius: 20*consts.px,
          }}
        />

        <Text
          style={{
            position: 'absolute',
            left: heightElement,
            color: theme[mode].color,
            paddingTop: 25*consts.px,
            paddingLeft: 30*consts.px,
            fontSize: 32*consts.px,
            width: widthElement - heightElement,
            overflow: 'hidden',
            fontWeight: 'bold',
          }}
        >
          {title.split('').length > maxLengthTitle ? title.split('').filter((word, i) =>i<maxLengthTitle).join('')+'...' : title} 
        </Text>

        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
        {
          Array(colsToShow).map((i) => 
            <View
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {
                Array(ingredientsPerColumn).map((j) =>
                  <Text
                    key={i*colsToShow+j}
                    style={{
                      color: theme[mode].color,
                      paddingLeft: 30*consts.px,
                      fontSize: 20*consts.px,
                      width: widthElement - heightElement,
                      overflow: 'hidden',
                    }}
                  >
                    {ingredients[i*ingredientsPerColumn+j]}
                  </Text>
                )
              }
            </View>
          )
        }
        </View>
      </View>
    </View>
  );
}

export default ElementRecipy;