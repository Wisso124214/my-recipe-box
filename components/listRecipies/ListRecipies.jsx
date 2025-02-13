import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ElementRecipy from '../elementRecipy/ElementRecipy';
import { fetchNRecipies } from './dataRecipes';
import { useEffect, useState } from 'react';
import ThemeModeButton from '../iconButton/ThemeModeButton';
import IconButton from '../iconButton/IconButton';
import Svg, { Path } from "react-native-svg"
import { configFront } from '../../config/config';

const ListRecipies = ({ data }) => {

  const { mode, consts, styles, theme, setLoading, setStrPage } = data;
  const quantity = 10;
  
  const sizeIcons = 60*consts.px;
  const scaleThemeModeButton = .75;
  const topIconMenu = 2;
  const topFooterMenu = 1400*consts.px;
  
  const [recipies, setRecipies] = useState([]);
  const [categorySelected, setCategorySelected] = useState('all');

  const compStyles = {
    icons: {
      normal: {
        color: theme[mode].icons,
        px: sizeIcons,
        top: 2.5,
        left: 2.5,
      },
      settings: {
        color: theme[mode].icons,
        px: sizeIcons - 2/9*sizeIcons*consts.px,
        top: 2,
        left: 2.5,
      },
      search: {
        color: theme[mode].icons,
        px: sizeIcons,
        top: 1.5,
        left: 2.5,
      },
      small: {
        color: theme[mode].icons,
        px: sizeIcons - 2/9*sizeIcons*consts.px,
        top: 2 + 1/18*sizeIcons*consts.px,
        left: 3 + 1/18*sizeIcons*consts.px,
      }
    }
  }

  let arrCategories = Array(10).fill().map((_, i) => 'category '+(i+1));
  arrCategories.unshift('all');
  arrCategories.push('own');

  useEffect(()=>{
    (async () => {
      setLoading(true);
      recipies.length === 0 ? setRecipies(await fetchNRecipies(quantity)) : null;
      setLoading(false);
    })()
  },[]);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
    }}>
      
      {/**List Categories */}
      <View
        style={{
          position: 'absolute',
          top: 110*consts.px,
          width: '100%',
          height: 70*consts.px,
        }}
      >
        <TouchableOpacity
          activeOpacity={configFront.activeOpacity}
          style={{
            position: 'absolute',
            height: 70*consts.px,
            width: 90*consts.px,
            right: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 2,
            paddingHorizontal: 5 * consts.px,
            borderRadius: 20 * consts.px,
            backgroundColor: theme[mode].noIcons,
            borderColor: theme[mode].noIcons,
            borderWidth: 2,
          }}
        >
          <Svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512" 
            fill={theme[mode].contrastingGreen}  
            style={{
              width: 50*consts.px,
              height: 50*consts.px,
            }}
          >
            <Path d="M0 80v149.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0l133.5-133.5c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7L48 32C21.5 32 0 53.5 0 80zm112 32a32 32 0 110 64 32 32 0 110-64z" />
          </Svg>
        </TouchableOpacity>

        <View
          style={{
            width: '75%',
            left: '5%',
          }}
          >

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={arrCategories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {
              return(
                <TouchableOpacity 
                  activeOpacity={configFront.activeOpacity}
                  onPress={()=>setCategorySelected(item.item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                    paddingHorizontal: 15 * consts.px,
                    borderRadius: 25 * consts.px,
                    backgroundColor: theme[mode].contrastingGreen,
                    borderColor: theme[mode].noIcons,
                    borderWidth: 2,
                    marginRight: 10*consts.px,
                  }}
                >
                  <Text
                    style={{
                      color: theme[mode].noColor,
                      fontFamily: styles.fonts.mali.bold,
                      fontSize: 30*consts.px,
                      textAlign: 'center',
                      top: -3.5,
                      textTransform: 'capitalize',
                    }}
                  > {item.item} </Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>

      <View 
        style={{
          position: 'relative',
          height: 1125*consts.px,
          top: 42*consts.px,
          backgroundColor: 'transparent',
        }}
      >
        <View style={{ flex: 1 }} >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recipies}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {
              return(
                recipies[item.index] && (categorySelected === 'all' || recipies[item.index].category === categorySelected) ?
                  <ElementRecipy
                    key={item.index}
                    data={data}
                    index={item.index}
                    recipy={recipies[item.index]}
                  />
                : null
              )
            }}
          />
        </View>
      </View>

        {/**Footer Menu */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            top: topFooterMenu,
            marginHorizontal: 'auto',
            width: '90%',
            justifyContent: 'space-evenly',
          }}
        >
          <IconButton 
            onPress={()=>console.log('Menu')}
            dataIconButton={data.dataIconButton}
            dCodeIcon="M1.5 3a.5.5 0 000 1h12a.5.5 0 000-1h-12zM1 7.5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5z"
            src="styles"
            sizeButton={compStyles.icons.normal.px+10}
            styles={{
              ...compStyles.icons.small,
              top: topIconMenu,
            }}
            styleButton={{ top: 0 }}
          />
          <IconButton
            onPress={()=>console.log('Settings')}
            dataIconButton={data.dataIconButton}
            dCodeIcon="M7.07.65a.85.85 0 0 0-.828.662l-.238 1.05c-.38.11-.74.262-1.08.448l-.91-.574a.85.85 0 0 0-1.055.118l-.606.606a.85.85 0 0 0-.118 1.054l.574.912c-.186.338-.337.7-.447 1.079l-1.05.238a.85.85 0 0 0-.662.829v.857a.85.85 0 0 0 .662.829l1.05.238c.11.379.261.74.448 1.08l-.575.91a.85.85 0 0 0 .118 1.055l.607.606a.85.85 0 0 0 1.054.118l.911-.574c.339.186.7.337 1.079.447l.238 1.05a.85.85 0 0 0 .829.662h.857a.85.85 0 0 0 .829-.662l.238-1.05c.38-.11.74-.26 1.08-.447l.911.574a.85.85 0 0 0 1.054-.118l.606-.606a.85.85 0 0 0 .118-1.054l-.574-.911c.187-.34.338-.7.448-1.08l1.05-.238a.85.85 0 0 0 .662-.829v-.857a.85.85 0 0 0-.662-.83l-1.05-.237c-.11-.38-.26-.74-.447-1.08l.574-.91a.85.85 0 0 0-.118-1.055l-.606-.606a.85.85 0 0 0-1.055-.118l-.91.574a5.323 5.323 0 0 0-1.08-.448l-.239-1.05A.85.85 0 0 0 7.928.65h-.857ZM4.92 3.813a4.476 4.476 0 0 1 1.795-.745L7.071 1.5h.857l.356 1.568c.659.116 1.268.375 1.795.744l1.36-.857.607.606-.858 1.36c.37.527.628 1.136.744 1.795l1.568.356v.857l-1.568.355a4.475 4.475 0 0 1-.744 1.796l.857 1.36-.606.606-1.36-.857a4.476 4.476 0 0 1-1.795.743L7.928 13.5h-.857l-.356-1.568a4.475 4.475 0 0 1-1.794-.744l-1.36.858-.607-.606.858-1.36a4.476 4.476 0 0 1-.744-1.796L1.5 7.93v-.857l1.568-.356a4.476 4.476 0 0 1 .744-1.794L2.954 3.56l.606-.606 1.36.858ZM9.026 7.5a1.525 1.525 0 1 1-3.05 0 1.525 1.525 0 0 1 3.05 0Zm.9 0a2.425 2.425 0 1 1-4.85 0 2.425 2.425 0 0 1 4.85 0Z"
            sizeButton={compStyles.icons.normal.px+10}
            src="styles.icons.settings"
            styles={compStyles}
          />
          <ThemeModeButton
            dataIconButton={data.dataIconButton} 
            scale={scaleThemeModeButton}
            styleButton={{ position: 'relative', top: -1 }}
          />
          <IconButton 
            onPress={()=>console.log('Search')}
            dataIconButton={data.dataIconButton}
            dCodeIcon="M10 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-.691 3.516a4.5 4.5 0 1 1 .707-.707l2.838 2.837a.5.5 0 0 1-.708.708L9.31 10.016Z"
            src="styles.icons.search"
            sizeButton={compStyles.icons.normal.px+10}
            styles={ compStyles }
          />
          <IconButton 
            onPress={()=>setStrPage('deviceAccounts')}
            dataIconButton={data.dataIconButton}
            dCodeIcon="M7.5.875a3.625 3.625 0 00-1.006 7.109c-1.194.145-2.218.567-2.99 1.328-.982.967-1.479 2.408-1.479 4.288a.475.475 0 10.95 0c0-1.72.453-2.88 1.196-3.612.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 10.95 0c0-1.88-.497-3.32-1.48-4.288-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 007.5.875zM4.825 4.5a2.675 2.675 0 115.35 0 2.675 2.675 0 01-5.35 0z"
            src="styles"
            sizeButton={compStyles.icons.small.px+10}
            styles={{
              ...compStyles.icons.small,
              top: 2,
            }}
          />
      </View>
    </View>
  );
}

export default ListRecipies;