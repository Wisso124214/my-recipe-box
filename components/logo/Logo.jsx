import { Image } from 'react-native';
import logo from '../../assets/logo.webp';

const Logo = ({ logoSize, style }) => {
  return( 
    <Image source={ logo } style={{width: logoSize, height: logoSize, left: logoSize/15, transform: [{ rotate: '344deg' }], top: 20,  ...style }} />
  );
}

export default Logo;