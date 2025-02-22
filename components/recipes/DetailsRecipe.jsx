import React, { useEffect, useRef } from 'react';
import { View, Text, ToastAndroid, Pressable, ScrollView, Image } from 'react-native';
import IconButton from '../iconButton/IconButton.jsx';
import ThemeModeButton from '../iconButton/ThemeModeButton.jsx';
import { closeSession } from '../../utils/logicSession.js';
import ButtonBack from '../buttonBack/ButtonBack.jsx';
import Menu from '../menu/Menu.jsx';
import { fetchOneRecipe } from './dataRecipes.js';
import { getItem, setItem } from '../../utils/asyncStorage.js';

import { arrFetchDebug } from '../../fetchDebug.js';
import SvgIconProvider from '../svg/svgIconProvider.jsx';
import Svg, { Circle } from 'react-native-svg';


const DetailsRecipe = ({ data }) => {

  const { mode, theme, consts, setStrPage, styles, dataButtonBack, setIdMainSession, idMainSession,
    colorsCategories, recipeSelected, setEditingRecipe,
  } = data;
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const [isTitleCropped, setIsTitleCropped] = React.useState(false);
  const [recipe, setRecipe] = React.useState({});
  const [isTitleOverflowing, setIsTitleOverflowing] = React.useState(true);
  const [isPrevHeight, setIsPrevHeight] = React.useState(true);
  const [isActualHeight, setIsActualHeight] = React.useState(true);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const maxLengthDifficulty = 30;

  const isRefreshData = true;

  const topTitle = 125*consts.px;

  const compStyles = {
    header: {
      fontFamily: styles.fonts.mali.bold,
      fontSize: 45 * consts.px,
      color: theme[mode].color,
      textShadowColor: theme[mode].shadowTitle,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      marginTop: -15 * consts.px,
    },
    text: {
      fontFamily: styles.fonts.mali.medium,
      fontSize: 33 * consts.px,
      color: theme[mode].color,
      marginTop: -15 * consts.px,
    },
    input: {
      fontFamily: styles.fonts.mali.medium,
      marginBottom: 50 * consts.px,
    },
    footText: {
      fontFamily: styles.fonts.mali.bold,
      fontSize: 32 * consts.px,
      height: 60 * consts.px,
    },
    iconQuestion: {
      fontFamily: styles.fonts.mali.regular,
      color: theme[mode].noIcons,
      px: 18*consts.px,
    },
    icons: {
      normal: {
        color: theme[mode].icons,
        px: 45*consts.px,
        top: 2.5,
        left: 2.5,
      },
      settings: {
        color: theme[mode].icons,
        px: 45*consts.px,
        top: 2,
        left: 2.5,
      },
      search: {
        color: theme[mode].icons,
        px: 50*consts.px,
        top: 1.5,
        left: 2.5,
      },
      small: {
        color: theme[mode].icons,
        px: 45*consts.px,
        top: 2,
        left: 3,
      }
    },
  }

  const handleError = (error) => {
    console.log('Error: ', error)
    ToastAndroid.showWithGravity('Error getting recipe data' + error, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }

  useEffect(() => {
    setIsFavorite(recipe.isFavorite)
  }, [recipe])

  useEffect(() => {
    setRecipe(recipeSelected)
    /*(async () => {

      try {
        await getItem('recipeSelected')
        .then((recipeSelected) => {
          if (recipeSelected && !isRefreshData) {
            setRecipe(recipeSelected);
          } else {
            try {
              fetchOneRecipe(recipeSelected)
              .then((recipe) => {
                console.log('recipe: ', JSON.stringify(recipe, null, 2))
                setRecipe(recipe)
                setItem('recipeSelected', recipe)
              })
            } catch (error) {
              handleError(error)
            }
          }
        })
      } catch (error) {
        handleError(error)
      }
    })()*/

    
  }, [])

  useEffect(() => {
    if (!isTitleCropped) {
      setTimeout(() => {
        setIsTitleCropped(true)
      }, 3000)
    }
  }, [isTitleCropped])

  useEffect(() => {
    setIsTitleOverflowing(isPrevHeight && isActualHeight)
  }, [isPrevHeight, isActualHeight])

  const itemsMenu = [
    {
      title: 'Log out',
      d: 'M3 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7.5a.5.5 0 0 0 0-1H3V2h7.5a.5.5 0 0 0 0-1H3Zm9.604 3.896a.5.5 0 0 0-.708.708L13.293 7H6.5a.5.5 0 0 0 0 1h6.793l-1.397 1.396a.5.5 0 0 0 .708.708l2.25-2.25a.5.5 0 0 0 0-.708l-2.25-2.25Z',
      color: theme[mode].noColor,
      sizeIcon: 45*consts.px,
      onPress: ()=>closeSession(setStrPage, setIdMainSession, idMainSession),
    },
    {
      title: 'Edit',
      d: "M11.854 1.146a.5.5 0 00-.707 0L3.714 8.578a1 1 0 00-.212.314L2.04 12.303a.5.5 0 00.657.657l3.411-1.463a1 1 0 00.314-.211l7.432-7.432a.5.5 0 000-.708l-2-2zm-7.432 8.14L11.5 2.206 12.793 3.5l-7.078 7.078-1.496.641-.438-.438.64-1.496z",
      color: theme[mode].noColor,
      sizeIcon: 45*consts.px,
      onPress: ()=>{
        setEditingRecipe(recipe)
        setStrPage('editRecipe')
      },
    },
  ]

  return(
    <View style={styles.transparentContainer} >
      <ButtonBack
        dataButtonBack={{ 
          ...dataButtonBack,
          isInputFocus: true,
          setStrPage,
          ifBreadCrumbEmpty: () => {
            setStrPage('listRecipes')
            },
          }} 
          styleview={{
            position: 'absolute',
            width: '30%',
            top: 115*consts.px,
            left: 0*consts.px,
            alignItems: 'center',
          }} 
      />

      {/**Title */}
      <View
      style={{
        width: '90%',
        position: 'absolute',
        top: topTitle,
      }}
      >
        {
          !isTitleOverflowing && isTitleCropped ? 
            <Text
              style={{
                ...compStyles.header,
                position: 'absolute',
                top: topTitle + 50*consts.px,
                left: '46%',
                zIndex: 1,
              }}
            >...</Text> 
          : null
        } 
        <Pressable
          onPress={() => setIsTitleCropped(!isTitleCropped)}
          style={{
            position: 'absolute',
            top: topTitle,
            height: isTitleCropped ? 80*consts.px : 'auto',
            overflow: 'hidden',
            backgroundColor: theme[mode].noIcons+'cc',
            borderRadius: 30,
            paddingHorizontal: 20,
            zIndex: 1,
          }}
        >
          <Text
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setIsPrevHeight(isActualHeight)
              setIsActualHeight(height < 54)
            }}
            style={{
              ...compStyles.header,
              width: consts.widthScreen*0.8*consts.px,
              textAlign: 'center',
            }}
          >
            {recipe.strMeal}
          </Text>
        </Pressable>
      </View>
          
      {/**Data recipe */}

      <ScrollView
        style={{
          position: 'absolute',
          top: topTitle*3,
          width: '90%',
          height: '72%',
          padding: '5%',
          borderRadius: 30,
          backgroundColor: theme[mode].noIcons+'cc',
        }}
        showsVerticalScrollIndicator={false}
      >

        {/*Difficulty component */}
        {
          recipe.difficulty &&
          <View
            key={'difficulty-icon-recipe'}
            style={{
              position: 'relative',
              width: consts.widthScreen*0.8*consts.px,
              marginBottom: 40*consts.px,
            }}
          >
            <View
              key={'difficulty-view-recipe'}
              style={{
                position: 'relative',
                alignSelf: 'flex-end',
                backgroundColor: theme[mode].difficulty[recipe.difficulty.name].background,
                paddingHorizontal: 22*consts.px,
                borderRadius: 50*consts.px,
                width: consts.widthScreen*0.8*consts.px,
  
                borderWidth: 3*consts.px,
                borderColor: theme[mode].difficulty[recipe.difficulty.name].border,
              }}
            >
              <Text
                key={'difficulty-text-recipe'}
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: theme[mode].color,
                  fontSize: 26*consts.px,
                  textAlign: 'center',
                  top: -2*consts.px,
                  alignSelf: 'center',
                  textTransform: 'capitalize',
                }}
              >
                {recipe.difficulty.name}
              </Text>
            </View>
          </View>
        }

        <Image
          source={{ uri: recipe.strMealThumb }}
          style={{
            width: '100%',
            height: 400*consts.px,
            borderRadius: 20,
            borderColor: theme[mode].icons,
            borderWidth: 3,
          }}
        />

        {/**Categories */}

        <View
          style={{
            marginTop: 30*consts.px,
          }}
        >
          {
            recipe.categories && colorsCategories &&
            Array(Math.ceil(recipe.categories.length/2)).fill(0).map((_, index) => (
              <View
                key={`categories-${index}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20*consts.px,
                }}
              >
                {
                  Array(2).fill(0).map((_, index_sub) => {
                    let color;

                    if (recipe.categories[(index)*2+index_sub]) {
                      color = colorsCategories[recipe.categories[(index)*2+index_sub]].color.split(',');
                      color[2] = mode === 'light' ? ' 70%)' : ' 25%)';
                      color = color.join(',');
                    }

                    return (
                      recipe.categories[(index)*2+index_sub] && recipe.categories[(index)*2+index_sub] !== 'all' &&
                      <View
                        key={'categories-sub-'+index_sub}
                        style={{
                          position: 'relative',
                          backgroundColor: color,
                          paddingHorizontal: 22*consts.px,
                          borderRadius: 50*consts.px,
                          width: consts.widthScreen*0.35*consts.px,
            
                          borderWidth: 3*consts.px,
                          borderColor: theme[mode].icons,
                        }}
                      >
                        <Text
                          key={'categories-text-'+index_sub}
                          style={{
                            fontFamily: styles.fonts.mali.bold,
                            color: theme[mode].color,
                            fontSize: 26*consts.px,
                            textAlign: 'center',
                            top: -2*consts.px,
                            alignSelf: 'center',
                            textTransform: 'capitalize',
                          }}
                        >
                          {recipe.categories[(index)*2+index_sub]}
                        </Text>
                      </View>
                    )
                  })
                }
              </View>
            ))
          } 
        </View>

        <View
          style={{
            position: 'relative',
            marginTop: 50*consts.px,
            marginBottom: -10*consts.px,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <View
            key={'clock-icon-recipe'}
            style={{
              position: 'relative',
              top: 60*consts.px,
              display: 'flex',
              flexDirection: 'row'
            }}
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
                position: 'relative',
                left: (18*2)*consts.px ,
                top: -(18*2)*consts.px,
              }}
              stylepath={{
                strokeWidth: 2*consts.px,
                stroke: theme[mode].icons,
              }}
            />
            <Text
              key={'clock-text-recipe'}
              style={{
                fontFamily: styles.fonts.mali.medium,
                position: 'relative',
                left: (18*2)*consts.px + 30*consts.px,
                top: -60*consts.px,
                color: theme[mode].color,
                paddingLeft: 30*consts.px,
                fontSize: 24*consts.px,
              }}
            >
              {'Prep:  '+recipe.timePrep+' min\nCook:  '+recipe.timeCook+' min'}
            </Text>
          </View>

          <View
            key={'dish-icon-recipe'}
            style={{
              position: 'relative',
              top: 18*consts.px,
              left: 130*consts.px,
              display: 'flex',
              flexDirection: 'row',
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
                position: 'relative',
              }}
              stylepath={{
                strokeWidth: 5*consts.px,
                stroke: theme[mode].icons,
              }}
              viewBox='-1 -1 20 20'
            />
            <Svg
              key={'dish-svg-recipe'}
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'relative',
                top: 20*consts.px,
                left: 20*consts.px,
                width: 20,
                height: 20,
              }}
            >
              <Circle
                key={'dish-circle-recipe'}
                cx={5*consts.px} 
                cy={5*consts.px} 
                r={5*consts.px} 
                fill={theme[mode].icons}
              />
            </Svg>
            <Text
              key={'dish-text-recipe'}
              style={{
                fontFamily: styles.fonts.mali.medium,
                position: 'relative',
                top: -1*consts.px,
                color: theme[mode].color,
                paddingLeft: 30*consts.px,
                fontSize: 24*consts.px,
              }}
            >
              {'Serves:  '+recipe.serves}
            </Text>
          </View>
        </View>
        

        <Text
          style={{
            ...compStyles.text,
            fontFamily: styles.fonts.mali.bold,
            marginTop: 40*consts.px,
            marginLeft: 40*consts.px,
          }}
        >
          Ingredients:
        </Text>
        <Text></Text>

        {
          recipe.ingredients ? 
            recipe.ingredients.map((ingredient, index) => (
              <View
                key={`ingredient-${index}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Text
                  key={`ingredient-dot-${index}`}
                  style={compStyles.text}
                >•  </Text>
                {
                  ingredient.measure ? 
                  <Text
                    key={`ingredient-measure-${index}`}
                    style={compStyles.text}
                  >({ingredient.measure}) </Text>
                  : null
                }
                {
                  ingredient.unit ? 
                  <Text
                    key={`ingredient-unit-${index}`}
                    style={compStyles.text}
                  >{ingredient.unit} </Text>
                  : null
                }
                <Text
                  key={`ingredient-name-${index}`}
                  style={compStyles.text}
                >{ingredient.name}</Text>
              </View>
            ))
          : null
        }

        <Text></Text>
        <Text></Text>
        
        <Text
          style={{
            ...compStyles.text,
            fontFamily: styles.fonts.mali.bold,
            marginTop: 40*consts.px,
            marginLeft: '10%',
          }}
        >
          Preparation:
        </Text>
        
        <Text></Text>
        <Text></Text>

        {
          recipe.strInstructions &&
          recipe.strInstructions.split('\n').map((instruction, index) => (
            <React.Fragment key={`instruction-${index}`}>
              <Text
                key={`instruction-text-${index}`}
                style={{
                  ...compStyles.text,
                  fontFamily: styles.fonts.mali.medium,
                  textAlign: 'justify',
                  lineHeight: 40 * consts.px,
                  width: '90%',
                  marginLeft: '5%',
                }}
              >
                {instruction}
              </Text>
              <Text key={`instruction-space1-${index}`}></Text>
              <Text key={`instruction-space2-${index}`}></Text>
            </React.Fragment>
          ))
        }
        <Text></Text>
        <Text></Text>
        
        

        
      </ScrollView>

      { /** Menu Top */ }

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          position: 'absolute',
          top: 80*consts.px,
          right: 40*consts.px,
          
        }}
      >
        <IconButton 
          onPress={()=>setIsFavorite((fav)=>!fav)}
          dataIconButton={data.dataIconButton}
          dCodeIcon={isFavorite ? "M7.223.666a.3.3 0 01.554 0L9.413 4.6a.3.3 0 00.253.184l4.248.34a.3.3 0 01.171.528L10.85 8.424a.3.3 0 00-.097.297l.99 4.145a.3.3 0 01-.45.326L7.657 10.97a.3.3 0 00-.312 0l-3.637 2.222a.3.3 0 01-.448-.326l.989-4.145a.3.3 0 00-.097-.297L.915 5.652a.3.3 0 01.171-.527l4.248-.34a.3.3 0 00.253-.185L7.223.666z" : "M6.98 1.252l-.022.05L5.588 4.6a.3.3 0 01-.253.184l-3.561.286-.055.004-.331.027-.3.024a.3.3 0 00-.172.527l.23.196.252.216.041.036 2.713 2.324a.3.3 0 01.097.297l-.83 3.475-.012.053-.077.323-.07.294a.3.3 0 00.448.326l.258-.158.284-.173.046-.028 3.049-1.863a.3.3 0 01.312 0l3.049 1.863.046.028.284.173.258.158a.3.3 0 00.448-.326l-.07-.293-.077-.324-.013-.053-.829-3.475a.3.3 0 01.097-.297L13.562 6.1l.041-.036.253-.216.23-.196a.3.3 0 00-.172-.527l-.3-.024-.332-.027-.055-.004-3.56-.286a.3.3 0 01-.254-.184L8.042 1.302l-.021-.05-.128-.307-.116-.279a.3.3 0 00-.554 0l-.116.279-.128.307zm.52 1.352l-.99 2.38a1.3 1.3 0 01-1.096.797l-2.57.206 1.958 1.677a1.3 1.3 0 01.418 1.29l-.598 2.507 2.2-1.344a1.3 1.3 0 011.356 0l2.2 1.344-.598-2.508a1.3 1.3 0 01.418-1.289l1.958-1.677-2.57-.206a1.3 1.3 0 01-1.096-.797l-.99-2.38z"}
          sizeButton={compStyles.icons.normal.px+10}
          src="styles.icons.settings"
          styles={compStyles}
          styleButton={{ marginHorizontal: 10 }}
        />
        <ThemeModeButton 
          dataIconButton={data.dataIconButton} 
          scale={0.60}
          styleButton={{ marginHorizontal: 10, position: 'relative', top: 1 }}
        />
        <IconButton 
          onPress={()=>console.log('Settings')}
          dataIconButton={data.dataIconButton}
          dCodeIcon="M7.07.65a.85.85 0 0 0-.828.662l-.238 1.05c-.38.11-.74.262-1.08.448l-.91-.574a.85.85 0 0 0-1.055.118l-.606.606a.85.85 0 0 0-.118 1.054l.574.912c-.186.338-.337.7-.447 1.079l-1.05.238a.85.85 0 0 0-.662.829v.857a.85.85 0 0 0 .662.829l1.05.238c.11.379.261.74.448 1.08l-.575.91a.85.85 0 0 0 .118 1.055l.607.606a.85.85 0 0 0 1.054.118l.911-.574c.339.186.7.337 1.079.447l.238 1.05a.85.85 0 0 0 .829.662h.857a.85.85 0 0 0 .829-.662l.238-1.05c.38-.11.74-.26 1.08-.447l.911.574a.85.85 0 0 0 1.054-.118l.606-.606a.85.85 0 0 0 .118-1.054l-.574-.911c.187-.34.338-.7.448-1.08l1.05-.238a.85.85 0 0 0 .662-.829v-.857a.85.85 0 0 0-.662-.83l-1.05-.237c-.11-.38-.26-.74-.447-1.08l.574-.91a.85.85 0 0 0-.118-1.055l-.606-.606a.85.85 0 0 0-1.055-.118l-.91.574a5.323 5.323 0 0 0-1.08-.448l-.239-1.05A.85.85 0 0 0 7.928.65h-.857ZM4.92 3.813a4.476 4.476 0 0 1 1.795-.745L7.071 1.5h.857l.356 1.568c.659.116 1.268.375 1.795.744l1.36-.857.607.606-.858 1.36c.37.527.628 1.136.744 1.795l1.568.356v.857l-1.568.355a4.475 4.475 0 0 1-.744 1.796l.857 1.36-.606.606-1.36-.857a4.476 4.476 0 0 1-1.795.743L7.928 13.5h-.857l-.356-1.568a4.475 4.475 0 0 1-1.794-.744l-1.36.858-.607-.606.858-1.36a4.476 4.476 0 0 1-.744-1.796L1.5 7.93v-.857l1.568-.356a4.476 4.476 0 0 1 .744-1.794L2.954 3.56l.606-.606 1.36.858ZM9.026 7.5a1.525 1.525 0 1 1-3.05 0 1.525 1.525 0 0 1 3.05 0Zm.9 0a2.425 2.425 0 1 1-4.85 0 2.425 2.425 0 0 1 4.85 0Z"
          sizeButton={compStyles.icons.normal.px+10}
          src="styles.icons.settings"
          styles={compStyles}
          styleButton={{ marginHorizontal: 10 }}
        />
        <IconButton 
          onPress={()=>console.log('Search')}
          dataIconButton={data.dataIconButton}
          dCodeIcon="M10 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-.691 3.516a4.5 4.5 0 1 1 .707-.707l2.838 2.837a.5.5 0 0 1-.708.708L9.31 10.016Z"
          src="styles.icons.search"
          sizeButton={compStyles.icons.normal.px+10}
          styles={ compStyles }
          styleButton={{ marginHorizontal: 8 }}
        />
        <IconButton 
          onPress={()=>setIsShowMenu(!isShowMenu)}
          dataIconButton={data.dataIconButton}
          dCodeIcon="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
          src="styles.icons.small"
          sizeButton={compStyles.icons.normal.px+10}
          styles={ compStyles }
          styleButton={{ marginHorizontal: 4, top: 0 }}
        />
      </View>
      
      <Menu
        data={{
          theme,
          mode,
          consts,
          setStrPage,
          styles,
          isShow: isShowMenu,
        }}
        items={itemsMenu}
      />
    </View>
  )
}

export default DetailsRecipe;