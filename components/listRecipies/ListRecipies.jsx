import { View, StatusBar, Text, Image, TouchableHighlight, FlatList } from 'react-native';
import ElementRecipy from '../elementRecipy/ElementRecipy';
import { fetchNRecipies } from './dataRecipes';
import { useEffect, useState } from 'react';

const ListRecipies = ({ data }) => {

  const { mode, consts, styles, theme, showDebugMenu, setShowDebugMenu, devMode } = data;
  const quantity = 10;

  const [recipies, setRecipies] = useState([]);

  useEffect(()=>{
    (async () => {
      recipies.length === 0 ? setRecipies(await fetchNRecipies(quantity)) : null;
    })()
  },[]);

  return (
    <View style={ styles.container }>
      <View 
        style={{
          position: 'relative',
          height: 1125*consts.px,
          top: 42*consts.px,
        }}
      >
        <View style={{ flex: 1 }} >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recipies}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {
              return(
                recipies[item.index] ?
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
    </View>
  );
}

export default ListRecipies;