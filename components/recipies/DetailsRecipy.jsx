import React, { useEffect, useRef } from 'react';
import { View, Text, ToastAndroid, Pressable, ScrollView, Image } from 'react-native';
import IconButton from '../iconButton/IconButton';
import ThemeModeButton from '../iconButton/ThemeModeButton';
import { closeSession } from '../../utils/logicSession';
import ButtonBack from '../buttonBack/ButtonBack';
import Menu from '../menu/Menu';
import { fetchOneRecipy } from './dataRecipes.js';
import { getItem, setItem } from '../../utils/AsyncStorage';


const DetailsRecipy = ({ data }) => {

  const { mode, theme, consts, setStrPage, styles, dataButtonBack, setIdMainSession, idMainSession,
    colorCategories,
  } = data;
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const [isTitleCropped, setIsTitleCropped] = React.useState(false);
  const [recipy, setRecipy] = React.useState({});
  const [isTitleOverflowing, setIsTitleOverflowing] = React.useState(true);
  const [isPrevHeight, setIsPrevHeight] = React.useState(true);
  const [isActualHeight, setIsActualHeight] = React.useState(true);
    
  const isRefreshData = false;

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

  useEffect(() => {
    console.log('colorCategories: ', JSON.stringify(colorCategories, null, 2))
  }, [colorCategories])

  const handleError = (error) => {
    console.log('Error: ', error)
    ToastAndroid.showWithGravity('Error getting recipy data' + error, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }

  useEffect(() => {
    (async () => {

      try {
        await getItem('recipySelected')
        .then((recipySelected) => {
          if (recipySelected && !isRefreshData) {
            setRecipy(recipySelected);
          } else {
            try {
              fetchOneRecipy(recipySelected)
              .then((recipy) => {
                setRecipy(recipy)
                setItem('recipySelected', recipy)
              })
            } catch (error) {
              handleError(error)
            }
          }
        })
      } catch (error) {
        handleError(error)
      }
    })()

    setTimeout(() => {
      setIsTitleCropped(true)
    }, 2000)
  }, [])

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
  ]

  return(
    <View style={styles.transparentContainer} >
      <ButtonBack
        dataButtonBack={{ 
          ...dataButtonBack,
          isInputFocus: true,
          setStrPage,
          ifBreadCrumbEmpty: () => {
            setStrPage('listRecipies')
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
                top: topTitle + 90*consts.px,
                left: '6%',
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
            height: isTitleCropped ? 130*consts.px : 'auto',
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
            style={ compStyles.header }
          >
            {recipy.strMeal}
          </Text>
        </Pressable>
      </View>
          
      {/**Data recipy */}

      <ScrollView
        style={{
          position: 'absolute',
          top: topTitle*3.5,
          width: '90%',
          height: '65%',
          padding: '5%',
          borderRadius: 30,
          backgroundColor: theme[mode].noIcons+'cc',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: recipy.strMealThumb }}
          style={{
            width: '100%',
            height: 400*consts.px,
            borderRadius: 20,
            borderColor: theme[mode].icons,
            borderWidth: 3,
          }}
        />

        

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
          recipy.ingredients ? 
            recipy.ingredients.map((ingredient, index) => (
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
        <ThemeModeButton 
          dataIconButton={data.dataIconButton} 
          scale={0.65}
          styleButton={{ marginHorizontal: 8, position: 'relative', top: 1 }}
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

export default DetailsRecipy;