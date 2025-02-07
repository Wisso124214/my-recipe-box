import { View, StatusBar, Text, Image, TouchableHighlight } from 'react-native';
import ElementRecipy from '../elementRecipy/ElementRecipy';

const ListRecipies = ({ data }) => {

  const { mode, consts, styles, theme, showDebugMenu, setShowDebugMenu, devMode } = data;
  const quantity = 5;

  return (
    <View style={ styles.container }>
      
      <View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {
          Array(quantity).fill().map((_, index) => {
            return(
              <ElementRecipy
                key={index}
                data={data}
                index={index}
              />
            )
          })
        }
      </View>
    </View>
  );
}

export default ListRecipies;