import React, { useEffect, useRef } from 'react';
import { View, Text, ToastAndroid, Pressable, ScrollView, Image, TextInput } from 'react-native';
import IconButton from '../iconButton/IconButton.jsx';
import ThemeModeButton from '../iconButton/ThemeModeButton.jsx';
import { closeSession } from '../../utils/logicSession.js';
import ButtonBack from '../buttonBack/ButtonBack.jsx';
import Menu from '../menu/Menu.jsx';
import { getItem, setItem } from '../../utils/asyncStorage.js';

import { arrFetchDebug } from '../../fetchDebug.js';
import SvgIconProvider from '../svg/svgIconProvider.jsx';
import Svg, { Circle } from 'react-native-svg';
import Input from '../input/Input.jsx';
import ContrastingSmallButton from '../contrastingSmallButton/ContrastingSmallButton.jsx';
import ContrastingButton from '../contrastingButton/ContrastingButton.jsx';


const EditRecipe = ({ data }) => {

  const { mode, theme, consts, setStrPage, styles, dataButtonBack, setIdMainSession, idMainSession,
    colorsCategories, recipeSelected, setIsInputFocus, dataInput, breadCrumb, setBreadCrumb, editingRecipe,
  } = data;
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const [isTitleCropped, setIsTitleCropped] = React.useState(false);
  const [recipe, setRecipe] = React.useState({});
  const [isTitleOverflowing, setIsTitleOverflowing] = React.useState(true);
  const [isPrevHeight, setIsPrevHeight] = React.useState(true);
  const [isActualHeight, setIsActualHeight] = React.useState(true);
  const maxLengthDifficulty = 30;
  const topTitle = 125*consts.px;
  
  const isRefreshData = true;
  
  
  const uriEmptyImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx0-gLc9F8xGB0C4ttKDkIlRwdtzGDv9OJTGRvX20tixfCfqecGpmeasvUfOmq5kVdMMA'
  
  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);
  const [nInputSelected, setnInputSelected] = React.useState(0);
  const [difficultySelected, setDifficultySelected] = React.useState(editingRecipe === null ? '' : editingRecipe.difficulty.name);
  const [dropdownDifficulty, setDropdownDifficulty] = React.useState(false);
  const [colorDropdownDifficulty, setColorDropdownDifficulty] = React.useState(theme[mode].icons);
  const [uriImage, setUriImage] = React.useState(editingRecipe === null ? '' : editingRecipe.strMealThumb);
  const [categories, setCategories] = React.useState(editingRecipe === null ? [] : editingRecipe.categories);
  const [dropdownCategories, setDropdownCategories] = React.useState(false);
  const [yScroll, setYScroll] = React.useState(0);
  const [nIngredients, setNIngredients] = React.useState(editingRecipe === null ? 1 : editingRecipe.ingredients.length);
  const [isFavorite, setIsFavorite] = React.useState(editingRecipe === null ? false : editingRecipe.isFavorite);

  const [titleRecipe, setTitleRecipe] = React.useState(editingRecipe === null ? '' : editingRecipe.strMeal);
  const [timePrep, setTimePrep] = React.useState(editingRecipe === null ? '' : editingRecipe.timePrep.toString());
  const [timeCook, setTimeCook] = React.useState(editingRecipe === null ? '' : editingRecipe.timeCook.toString());
  const [serves, setServes] = React.useState(editingRecipe === null ? '' : editingRecipe.serves.toString());
  const [preparation, setPreparation] = React.useState(editingRecipe === null ? '' : editingRecipe.strInstructions);

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

  useEffect(() => {
    setRecipe(recipeSelected)
    setIsFavorite(recipe.isFavorite)
  }, [recipe])
  
  const itemsMenu = [
    {
      title: 'Log out',
      d: 'M3 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7.5a.5.5 0 0 0 0-1H3V2h7.5a.5.5 0 0 0 0-1H3Zm9.604 3.896a.5.5 0 0 0-.708.708L13.293 7H6.5a.5.5 0 0 0 0 1h6.793l-1.397 1.396a.5.5 0 0 0 .708.708l2.25-2.25a.5.5 0 0 0 0-.708l-2.25-2.25Z',
      color: theme[mode].noColor,
      sizeIcon: 45*consts.px,
      onPress: ()=>closeSession(setStrPage, setIdMainSession, idMainSession),
    },
  ]

  useEffect(() => {
    if (difficultySelected === '') {
      setColorDropdownDifficulty(theme[mode].icons);
    } else {
      let color = theme[mode].difficulty[difficultySelected].border.split(',');
      color[2] = mode === 'light' ? ' 30%)' : ' 65%)';
      color = color.join(',');

      setColorDropdownDifficulty(color);
    }
  }, [mode, difficultySelected])

  useEffect(() => {
    if (isKeyboardVisible && breadCrumb[breadCrumb.length - 1] !== 'keyboard') {
      setBreadCrumb([...breadCrumb, 'keyboard']);
    }
  }, [isKeyboardVisible])

  return(
    <View style={styles.transparentContainer} >
      <ButtonBack
        dataButtonBack={{ 
          ...dataButtonBack,
          isInputFocus: true,
          setStrPage,
          onPress: () => {
            if(isKeyboardVisible){
              setIsKeyboardVisible(false);
            }
          },
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
        top: topTitle*2,
        position: 'absolute',
        backgroundColor: theme[mode].noIcons+'cc',
        height: 110*consts.px,
        borderRadius: 30,
        paddingHorizontal: 20,
        zIndex: 1,
      }}
      >
        <Input
          placeholder="Title recipe"
          style={{
            ...compStyles.input,
            top: 10*consts.px,
            left: -37*consts.px,
          }}
          inputMode="text"
          dataInput={{
            ...dataInput,
            styles,
            stateValue: [titleRecipe, setTitleRecipe],
            isKeyboardVisible: isKeyboardVisible,
            index: 0,
            nInputSelected,
            textprops: {
              maxLength: 100,
              onFocus: () => {
                setIsInputFocus(true)
                setIsKeyboardVisible(true)
              },
              onBlur: () => {
                setIsInputFocus(false)
              },
            },
            styleInput: {
              width: consts.widthScreen*0.85*consts.px,
              height: 90*consts.px,
              fontFamily: styles.fonts.mali.bold,
              fontSize: 45 * consts.px,
              color: theme[mode].color,
              textShadowColor: theme[mode].shadowTitle,
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 5,
            },
          }}
        />
      </View>
          
      {/**Data recipe */}

      <ScrollView
        contentOffset={{ x: 0, y: yScroll }}
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
            <Pressable
              key={'difficulty-view-recipe'}
              style={{
                position: 'relative',
                paddingHorizontal: 22*consts.px,
                borderRadius: 50*consts.px,
                width: consts.widthScreen*0.8*consts.px,
                borderWidth: 3*consts.px,
                borderColor: colorDropdownDifficulty,
              }}
              onPress={() => setDropdownDifficulty((prev)=>!prev)}
            >
              <Text
                key={'difficulty-text-recipe'}
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: difficultySelected === '' ? colorDropdownDifficulty+'cc' : colorDropdownDifficulty,
                  fontSize: 26*consts.px,
                  textAlign: 'center',
                  top: -2*consts.px,
                  alignSelf: 'center',
                  textTransform: difficultySelected === '' ? 'none' : 'capitalize',
                }}
              >
                {difficultySelected === '' ? 'Select difficulty...' : difficultySelected}
              </Text>

              <SvgIconProvider
                src='styles'
                strprops='color, px, top, left'
                d={!dropdownDifficulty ? "M4.182 6.182a.45.45 0 01.636 0L7.5 8.864l2.682-2.682a.45.45 0 01.636.636l-3 3a.45.45 0 01-.636 0l-3-3a.45.45 0 010-.636z" : "M4.182 8.818a.45.45 0 010-.636l3-3a.45.45 0 01.636 0l3 3a.45.45 0 01-.636.636L7.5 6.136 4.818 8.818a.45.45 0 01-.636 0z"}
                styles={{
                  color: colorDropdownDifficulty,
                  px: 60 * consts.px,
                  top: !dropdownDifficulty ? -28*consts.px : -27*consts.px,
                  left: 230*consts.px,
                }}
              />
            </Pressable>
            {
              dropdownDifficulty &&
              <View
                key={'difficulty-dropdown-recipe'}
                style={{
                  position: 'absolute',
                  top: 70*consts.px,
                  width: consts.widthScreen*0.8*consts.px,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  zIndex: 1,
                  backgroundColor: theme[mode].noIcons+'cc',
                  borderRadius: 20,
                }}
              >
                {
                  Object.keys(theme[mode].difficulty).map((difficulty, index) => (
                    <Pressable

                      key={'difficulty-'+index}
                      style={{
                        position: 'relative',
                        paddingHorizontal: 22*consts.px,
                        borderRadius: 50*consts.px,
                        width: consts.widthScreen*0.8*consts.px,
                        backgroundColor: theme[mode].difficulty[difficulty].background,
                        borderWidth: 3*consts.px,
                        borderColor: theme[mode].difficulty[difficulty].border,
                        marginVertical: 5*consts.px,
                      }}
                      onPress={() => {
                        setDifficultySelected(difficulty);
                        setDropdownDifficulty(false);
                      }}
                      >
                        <Text
                          key={'difficulty-text-'+index}
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
                          {difficulty}
                        </Text>
                      </Pressable>
                  ))
                }
            </View>
          }
          </View>
        }

        <Input
          placeholder="Link image"
          style={{
            ...compStyles.input,
            left: -20*consts.px,
          }}
          inputMode="text"
          dataInput={{
            ...dataInput,
            styles,
            stateValue: [uriImage, setUriImage],
            isKeyboardVisible: isKeyboardVisible,
            index: 1,
            nInputSelected,
            textprops: {
              maxLength: 500,
              onFocus: () => {
                setIsInputFocus(true)
                setIsKeyboardVisible(true)
              },
              onBlur: () => {
                setIsInputFocus(false)
              },
            },
            styleInput: {
              width: consts.widthScreen*0.8*consts.px,
              fontFamily: styles.fonts.mali.medium,
              color: theme[mode].color,
            },
          }}
        />

        <Image
          source={{ uri: uriImage === '' ? uriEmptyImage : uriImage }}
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
            categories && colorsCategories &&
            Array(Math.ceil(categories.length/2)).fill(0).map((_, index) => (
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
                    let thisColor;

                    if (categories[(index)*2+index_sub] && colorsCategories[categories[(index)*2+index_sub]]) {
                      thisColor = colorsCategories[categories[(index)*2+index_sub]].color.split(',');
                      thisColor[2] = mode === 'light' ? ' 70%)' : ' 25%)';
                      thisColor = thisColor.join(',');
                    }

                    return (
                      categories[(index)*2+index_sub] && categories[(index)*2+index_sub] !== 'all' && colorsCategories[categories[(index)*2+index_sub]] &&
                      <View
                        key={'categories-sub-'+index_sub}
                        style={{
                          position: 'relative',
                          backgroundColor: thisColor,
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
                          {categories[(index)*2+index_sub]}
                        </Text>
                        <IconButton 
                          onPress={() => {
                            const newCategories = [...categories];
                            let i = newCategories.indexOf(newCategories[(index)*2+index_sub]);
                              if (i > -1) {
                                newCategories.splice(i, 1);
                              }
                              setCategories(newCategories);
                          }}
                          dataIconButton={data.dataIconButton}
                          dCodeIcon="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                          sizeButton={compStyles.icons.normal.px}
                          src="styles"
                          styles={{
                            color: theme[mode].icons,
                            px: 30*consts.px,
                            top: 2.5,
                            left: 2.5,
                          }}
                          styleButton={{ 
                            margin: 20,
                            position: 'absolute',
                            top: -30*consts.px,
                            left: 175*consts.px,
                          }}
                        />
                        
                      </View>
                    )
                  })
                }
              </View>
            ))
          } 



          <Pressable
            key={'add-categories'}
            onPress={() => {
              setDropdownCategories((prev)=>!prev)
              setYScroll(300)
            }}
            style={{
              position: 'relative',
              backgroundColor: 'transparent',
              paddingHorizontal: 22*consts.px,
              borderRadius: 50*consts.px,
              width: consts.widthScreen*0.45*consts.px,
              marginTop: 50*consts.px,
              alignSelf: 'center',

              borderWidth: 3*consts.px,
              borderColor: theme[mode].icons,
            }}
          >
            <Text
              key={'add-categories-text'}
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
              Add category
            </Text>
            <SvgIconProvider
              src='styles'  
              d="M8 2.75a.5.5 0 00-1 0V7H2.75a.5.5 0 000 1H7v4.25a.5.5 0 001 0V8h4.25a.5.5 0 000-1H8V2.75z"
              styles={{
                color: theme[mode].icons,
                px: 18,
                top: 3,
                left: 3,
              }}
              strprops='color, px, top, left'
              stylesvg={{
                position: 'relative',
                left: 240*consts.px,
                top: -47.5*consts.px,
              }}
              stylepath={{
                strokeWidth: 2*consts.px,
                stroke: theme[mode].icons,
              }}
            />
          </Pressable>

          {
            dropdownCategories &&
            <View
              key={'categories-dropdown-recipe-view'}
              style={{
                position: 'relative',
                justifyContent: 'space-around',
                flex: 1,
                zIndex: 1,
                top: 20*consts.px,
                width: consts.widthScreen*0.45*consts.px,
                backgroundColor: theme[mode].noIcons+'cc',
                borderRadius: 20,
                left: consts.widthScreen*0.175*consts.px,
              }}
            >
              {
                Object.keys(colorsCategories).filter(category => !categories.includes(category) && category !== 'all').map((category, index) => {
                  let thisColor;

                  if (colorsCategories[category]) {
                    thisColor = colorsCategories[category].color.split(',');
                    thisColor[2] = mode === 'light' ? ' 70%)' : ' 25%)';
                    thisColor = thisColor.join(',');
                  }

                  return(
                    <Pressable
                      key={'category-'+index}
                      style={{
                        position: 'relative',
                        paddingHorizontal: 22*consts.px,
                        borderRadius: 50*consts.px,
                        width: consts.widthScreen*0.45*consts.px,
                        backgroundColor: thisColor,
                        borderWidth: 3*consts.px,
                        borderColor: theme[mode].icons,
                        marginVertical: 5*consts.px,
                      }}
                      onPress={() => {
                        setCategories([...categories, category]);
                        setDropdownCategories(false);
                        setYScroll(300);
                      }}
                    >
                      <Text
                        key={'category-text-'+index}
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
                        {category}
                      </Text>
                    </Pressable>
                  )}
              )}
            </View>
          }
        </View>

        <View
          style={{
            position: 'relative',
            marginTop: 50*consts.px,
            marginBottom: -10*consts.px,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <View
            key={'clock-icon-recipe'}
            style={{
              position: 'relative',
              top: 60*consts.px,
              display: 'flex',
              flexDirection: 'column',
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
                top: 90*consts.px,
              }}
              stylepath={{
                strokeWidth: 2*consts.px,
                stroke: theme[mode].icons,
              }}
            />
            <Input
              placeholder="Time prep"
              style={{
                ...compStyles.input,
                left: 80*consts.px,
                top: -60*consts.px,
              }}
              inputMode="numeric"
              dataInput={{
                ...dataInput,
                styles,
                stateValue: [timePrep, setTimePrep],
                isKeyboardVisible: isKeyboardVisible,
                index: 2,
                nInputSelected,
                textprops: {
                  maxLength: 3,
                  onFocus: () => {
                    setIsInputFocus(true)
                    setIsKeyboardVisible(true)
                  },
                  onBlur: () => {
                    setIsInputFocus(false)
                  },
                },
                styleInput: {
                  position: 'relative',
                  width: consts.widthScreen*0.35*consts.px,
                  fontFamily: styles.fonts.mali.medium,
                  color: theme[mode].color,
                },
              }}
            />
            <Text
              style={{
                ...compStyles.text,
                fontFamily: styles.fonts.mali.medium,
                position: 'absolute',
                left: 380*consts.px,
                top: -40*consts.px,
              }}
            >(mins prep)</Text>
            <Input
              placeholder="Time cook"
              style={{
                ...compStyles.input,
                left: 80*consts.px,
                top: -60*consts.px,
              }}
              inputMode="numeric"
              dataInput={{
                ...dataInput,
                styles,
                stateValue: [timeCook, setTimeCook],
                isKeyboardVisible: isKeyboardVisible,
                index: 2,
                nInputSelected,
                textprops: {
                  maxLength: 3,
                  onFocus: () => {
                    setIsInputFocus(true)
                    setIsKeyboardVisible(true)
                  },
                  onBlur: () => {
                    setIsInputFocus(false)
                  },
                },
                styleInput: {
                  position: 'relative',
                  width: consts.widthScreen*0.35*consts.px,
                  fontFamily: styles.fonts.mali.medium,
                  color: theme[mode].color,
                },
              }}
            />
            <Text
              style={{
                ...compStyles.text,
                fontFamily: styles.fonts.mali.medium,
                position: 'absolute',
                left: 380*consts.px,
                top: 80*consts.px,
              }}
            >(mins cook)</Text>
          
          </View>

          <View
            key={'dish-icon-recipe'}
            style={{
              position: 'relative',
              top: 18*consts.px,
              left: 32*consts.px,
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
            <Input
              placeholder="Serves"
              style={{
                ...compStyles.input,
                top: -15*consts.px,
                left: 15*consts.px,
              }}
              inputMode="numeric"
              dataInput={{
                ...dataInput,
                styles,
                stateValue: [serves, setServes],
                isKeyboardVisible: isKeyboardVisible,
                index: 2,
                nInputSelected,
                textprops: {
                  maxLength: 3,
                  onFocus: () => {
                    setIsInputFocus(true)
                    setIsKeyboardVisible(true)
                  },
                  onBlur: () => {
                    setIsInputFocus(false)
                  },
                },
                styleInput: {
                  position: 'relative',
                  width: consts.widthScreen*0.35*consts.px,
                  fontFamily: styles.fonts.mali.medium,
                  color: theme[mode].color,
                },
              }}
            />
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

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: consts.widthScreen*0.75*consts.px,
            left: consts.widthScreen*0.025*consts.px,
          }}
        >
          <Text
            style={{
              ...compStyles.text,
              fontFamily: styles.fonts.mali.bold,
              fontSize: 30*consts.px,
              textDecorationLine: 'underline',
            }}
          >Measure</Text>
          <Text
            style={{
            ...compStyles.text,
            fontFamily: styles.fonts.mali.bold,
            fontSize: 30*consts.px,
            textDecorationLine: 'underline',
            }}
          >Unit</Text>
          <Text
            style={{
              ...compStyles.text,
              fontFamily: styles.fonts.mali.bold,
              fontSize: 30*consts.px,
              textDecorationLine: 'underline',
            }}
          >Ingredient</Text>
        </View>
        <Text></Text>

        <View 
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginVertical: 10*consts.px,
          }}
        >
          {
            Array(nIngredients).fill(0).map((_, index) => (
              <View
                key={`ingredient-${index}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: consts.widthScreen*0.8*consts.px,
                  marginVertical: -10*consts.px,
                }}
              >
                <Input
                  key={`ingredient-measure-${index}`}
                  placeholder="Measure"
                  style={{
                    ...compStyles.input,
                    left: -20*consts.px,
                    width: consts.widthScreen*0.2*consts.px,
                  }}
                  inputMode="numeric"
                  dataInput={{
                    ...dataInput,
                    styles,
                    defaultValue: editingRecipe.ingredients[index].measure,
                    isKeyboardVisible: isKeyboardVisible,
                    index: 3,
                    nInputSelected,
                    textprops: {
                      maxLength: 100,
                      onFocus: () => {
                        setIsInputFocus(true)
                        setIsKeyboardVisible(true)
                      },
                      onBlur: () => {
                        setIsInputFocus(false)
                      },
                    },
                    styleInput: {
                      width: consts.widthScreen*0.2*consts.px,
                      fontFamily: styles.fonts.mali.medium,
                      color: theme[mode].color,
                      paddingHorizontal: 30*consts.px,
                      borderWidth: 3*consts.px,
                      fontSize: 24*consts.px,
                      height: 70*consts.px,
                    },
                  }}
                /> 
                <Input
                  key={`ingredient-unit-${index}`}
                  placeholder="Unit"
                  style={{
                    ...compStyles.input,
                    left: -20*consts.px,
                    width: consts.widthScreen*0.2*consts.px,
                  }}
                  inputMode="text"
                  dataInput={{
                    ...dataInput,
                    styles,
                    defaultValue: editingRecipe.ingredients[index].unit,
                    isKeyboardVisible: isKeyboardVisible,
                    index: 3,
                    nInputSelected,
                    textprops: {
                      maxLength: 100,
                      onFocus: () => {
                        setIsInputFocus(true)
                        setIsKeyboardVisible(true)
                      },
                      onBlur: () => {
                        setIsInputFocus(false)
                      },
                    },
                    styleInput: {
                      width: consts.widthScreen*0.2*consts.px,
                      fontFamily: styles.fonts.mali.medium,
                      color: theme[mode].color,
                      paddingHorizontal: 30*consts.px,
                      borderWidth: 3*consts.px,
                      fontSize: 24*consts.px,
                      height: 70*consts.px,
                    },
                  }}
                /> 
                <Input
                  key={`ingredient-name-${index}`}
                  placeholder="Ingredient"
                  style={{
                    ...compStyles.input,
                    left: -20*consts.px,
                    width: consts.widthScreen*0.35*consts.px,
                  }}
                  inputMode="text"
                  dataInput={{
                    ...dataInput,
                    styles,
                    defaultValue: editingRecipe.ingredients[index].name,
                    isKeyboardVisible: isKeyboardVisible,
                    index: 3,
                    nInputSelected,
                    textprops: {
                      maxLength: 100,
                      onFocus: () => {
                        setIsInputFocus(true)
                        setIsKeyboardVisible(true)
                      },
                      onBlur: () => {
                        setIsInputFocus(false)
                      },
                    },
                    styleInput: {
                      width: consts.widthScreen*0.35*consts.px,
                      fontFamily: styles.fonts.mali.medium,
                      color: theme[mode].color,
                      paddingHorizontal: 30*consts.px,
                      borderWidth: 3*consts.px,
                      fontSize: 24*consts.px,
                      height: 70*consts.px,
                    },
                  }}
                /> 
              </View>
            ))
          }
          <IconButton
            onPress={() => setNIngredients((prev)=>prev+1)}
            dataIconButton={data.dataIconButton}
            dCodeIcon="M7.5.877a6.623 6.623 0 100 13.246A6.623 6.623 0 007.5.877zM1.827 7.5a5.673 5.673 0 1111.346 0 5.673 5.673 0 01-11.346 0zM7.5 4a.5.5 0 01.5.5V7h2.5a.5.5 0 110 1H8v2.5a.5.5 0 01-1 0V8H4.5a.5.5 0 010-1H7V4.5a.5.5 0 01.5-.5z"
            sizeButton={compStyles.icons.small.px}
            src="styles"
            styles={{
              color: theme[mode].icons,
              px: 45*consts.px,
            }}
            styleButton={{
              position: 'relative',
            }}
          />
        </View>
        
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

        <Input
          placeholder="Instructions..."
          style={{
            ...compStyles.input,
            left: -20*consts.px,
          }}
          inputMode="text"
          dataInput={{
            ...dataInput,
            styles,
            stateValue: [preparation, setPreparation],
            isKeyboardVisible: isKeyboardVisible,
            index: 3,
            nInputSelected,
            textprops: {
              textAlignVertical: 'top',
              editable: true,
              multiline: true,
              numberOfLines: 15,
              maxLength: 10000,
              onFocus: () => {
                setIsInputFocus(true)
                setIsKeyboardVisible(true)
              },
              onBlur: () => {
                setIsInputFocus(false)
              },
            },
            styleInput: {
              width: consts.widthScreen*0.8*consts.px,
              height: 500*consts.px,
              fontFamily: styles.fonts.mali.medium,
              color: theme[mode].color,
              paddingVertical: 30*consts.px,
            },
          }}
        />

        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        
        <ContrastingButton 
          text="Save" 
          theme={theme} 
          mode={mode} 
          consts={consts} 
          styles={styles}
          style={{ 
            marginTop: 50 * consts.px, 
            marginBottom: 150 * consts.px,
            alignSelf: 'center',
          }} 
          onPress={()=>console.log('Recipe saved')}
          />  
        

        
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

export default EditRecipe;