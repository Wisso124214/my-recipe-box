import { FlatList, Text, Touchable, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import SvgIconProvider from "../svg/svgIconProvider";
import { useEffect, useState } from "react";
import ContrastingSmallButton from "../contrastingSmallButton/ContrastingSmallButton";
import MessagePopUp from "../popUp/MessagePopUp";
import { configFront } from "../../config/config";

const ListAccounts = ({ data, nameParent, style, styleAddButton, onlyUsernames }) => {
  
  onlyUsernames = onlyUsernames === undefined ? false : true;

  const { styles, theme, mode, consts, setStrPage, setIsInputPopUpVisible, setValueSelected, setTypeSelected, otherUsername, setDefaultValueUsernameLogin, valueSelected } = data;

  const maxLengthType = {
    'username': 30,
    'email': 35,
    'onlyUsername': 15,
  }

  const [idEditing, setIdEditing] = useState(-1);
  const [render, setRender] = useState(false);
  const [indexDelete, setIndexDelete] = useState(-1);

  const deviceAccounts = [
    {
      username: 'user30280',
      email: 'user30280@gmail.com',
    },
    {
      username: 'user30280',
      email: 'user30280@gmail.com',
    },
    {
      username: 'user30282',
      email: 'user30282@gmail.com'
    },
    {
      username: 'user30283',
      email: 'user30282@gmail.com'
    },
    {
      username: 'user30284',
      email: 'user30282@gmail.com'
    },
    {
      username: 'user30285',
      email: 'user30282@gmail.com'
    },
    {
      username: 'user30286',
      email: 'user30282@gmail.com'
    },
    {
      username: 'user30287',
      email: 'user30282@gmail.com'
    },
    {
      username: 'user30288',
      email: 'user30282@gmail.com'
    },
    {
      username: 'user30289',
      email: 'user30289@gmail.com'
    },
    {
      username: 'user30290',
      email: 'user30290@gmail.com'
    },
    {
      username: 'user30291',
      email: 'user30291@gmail.com'
    },
    {
      username: 'user30292',
      email: 'user30292@gmail.com'
    },
    {
      username: 'user30293',
      email: 'user30293@gmail.com'
    },
    {
      username: 'user30294',
      email: 'user30294@gmail.com'
    },
    {
      username: 'user30295',
      email: 'user30295@gmail.com'
    },
    {
      username: 'user30295',
      email: 'user30295@gmail.com'
    },
    {
      username: 'user30296',
      email: 'user30296@gmail.com'
    },
    {
      username: 'user30297',
      email: 'user30297@gmail.com'
    },
    {
      username: 'user30298',
      email: 'user30298@gmail.com'
    },
  ]

  const userAccounts = [
    {
      username: 'user30280',
      isLocked: false,
    },
    {
      username: 'user30281',
      isLocked: true,
    },
    {
      username: 'user30282',
      isLocked: true,
    },
    {
      username: 'user30283',
      isLocked: false,
    },
    {
      username: 'user30284',
      isLocked: false,
    },
    {
      username: 'user30285',
      isLocked: false,
    },
    {
      username: 'user30286',
      isLocked: true,
    },
    {
      username: 'user30287',
      isLocked: false,
    },
    {
      username: 'user30288',
      isLocked: false,
    },
    {
      username: 'user30289',
      isLocked: true,
    },
    {
      username: 'user30290',
      isLocked: false,
    },
    {
      username: 'user30291',
      isLocked: false,
    },
    {
      username: 'user30292',
      isLocked: true,
    },
  ]
  
  const [accounts, setAccounts] = useState(onlyUsernames ? userAccounts : deviceAccounts);
  const [isMessagePopUpVisible, setIsMessagePopUpVisible] = useState(false);

  useEffect(()=>{
    if (accounts[idEditing]) {
      accounts[idEditing].username = otherUsername;
      setRender(!render);
    }
  },[otherUsername])


  const editUsername = (account) => {
    setIsInputPopUpVisible(true);
    setValueSelected(account.item.username);

    setTypeSelected('username-other');
    setIdEditing(account.index);
  }

  return(
    <>
      <MessagePopUp 
        data={{
          setIsMessagePopUpVisible,
          consts,
          styles,
          theme,
          mode,
        }}
        text="The session has been closed"
        stylesViewContent={{
          paddingVertical: 50*consts.px,
        }}
        content={ nameParent === 'UserAccounts' ?
          <View
            style={{
              ...styles.popUp.container,
              width: 500*consts.px,
              paddingTop: 30*consts.px,
              paddingBottom: 40*consts.px,
              height: 'auto',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: theme[mode].noColor+'a0',
                  fontSize: 28*consts.px,
                  textAlign: 'center',
                  height: 50*consts.px,
                }}
              >Are you sure do you want to </Text>
              <Text
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: theme[mode].noColor+'a0',
                  fontSize: 28*consts.px,
                  textAlign: 'center',
                  height: 50*consts.px,
                  marginTop: -10*consts.px,
                }}
              >delete the next username?</Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: theme[mode].noColor,
                  fontSize: 38*consts.px,
                  textAlign: 'center',
                  marginTop: 10*consts.px,
                  marginBottom: 10*consts.px,
                }}
              >{valueSelected}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: theme[mode].errorColor,
                  fontSize: 28*consts.px,
                  textAlign: 'center',
                  height: 50*consts.px,
                }}
              >It will not be possible to </Text>
              <Text
                style={{
                  fontFamily: styles.fonts.mali.bold,
                  color: theme[mode].errorColor,
                  fontSize: 28*consts.px,
                  textAlign: 'center',
                  height: 50*consts.px,
                  marginTop: -10*consts.px,
                }}
              >recover the data</Text>
            </View>

            <View
            style={{
              flexDirection: 'row',
              marginTop: 40*consts.px,
            }}
          >
            <TouchableOpacity
              activeOpacity={configFront.activeOpacity}
              style={{
                ...styles.popUp.button,
                marginRight: 10*consts.px,
                width: 210*consts.px,
              }}
              onPress={()=>{
                setIsMessagePopUpVisible(false);
              }}
            >
              <Text style={{
                ...styles.popUp.textButton,
                color: theme[mode].noColor,
                top: -5*consts.px,
                height: 50*consts.px,
                }} >Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={configFront.activeOpacity}
              style={{
                ...styles.popUp.button,
                marginLeft: 10*consts.px,
                backgroundColor: theme[mode].errorColor,
                width: 210*consts.px,
              }}
              onPress={()=>{
                setIsMessagePopUpVisible(false);
                accounts.splice(indexDelete, 1);
                setRender(!render);
              }}
            >
              <Text style={{
                ...styles.popUp.textButton,
                color: theme[mode].color,
                top: -5*consts.px,
                height: 50*consts.px,
                }} >Delete</Text>
            </TouchableOpacity>
          </View>
          </View>
          : undefined
        }
        isVisible={isMessagePopUpVisible}
      />
      <View
        style={{
          ...style,
        }}
      >

        <FlatList
          showsVerticalScrollIndicator={false}
          data={accounts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ (account) => (
            <View
              style={{
                width: 550*consts.px,
                height: 100*consts.px,
                backgroundColor: theme[mode].noIcons,
                borderRadius: 30*consts.px,
                marginBottom: account.index === accounts.length - 1 ? 0 : 20*consts.px,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 30*consts.px,
              }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={15*4*consts.px}
                height={15*4*consts.px}
              >
                <Path
                  scale={4*consts.px}
                  fill={theme[mode].icons}
                  fillRule="evenodd"
                  d="M.877 7.5a6.623 6.623 0 1 1 13.246 0 6.623 6.623 0 0 1-13.246 0ZM7.5 1.827a5.673 5.673 0 0 0-4.193 9.494A4.971 4.971 0 0 1 7.5 9.025c1.762 0 3.31.916 4.193 2.296A5.673 5.673 0 0 0 7.5 1.827Zm3.482 10.152A4.023 4.023 0 0 0 7.5 9.975a4.023 4.023 0 0 0-3.482 2.004A5.648 5.648 0 0 0 7.5 13.173c1.312 0 2.52-.446 3.482-1.194ZM5.15 6.505a2.35 2.35 0 1 1 4.7 0 2.35 2.35 0 0 1-4.7 0Zm2.35-1.4a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"
                  clipRule="evenodd"
                />
              </Svg>

              <Text
                style={{
                  fontFamily: styles.fonts.mali.medium,
                  position: 'absolute',
                  color: theme[mode].color,
                  fontSize: onlyUsernames ? 30*consts.px : 25*consts.px,
                  left: 120*consts.px,
                  top: onlyUsernames ? 15*consts.px : 10*consts.px,
                }}
              >
                {account.item.username.length > maxLengthType[onlyUsernames ? 'onlyUsername' : 'username'] ? account.item.username.slice(0, maxLengthType[onlyUsernames ? 'onlyUsername' : 'username']) + '...' : account.item.username}
              </Text>
              {
                !onlyUsernames ? 
                <Text
                  style={{
                    fontFamily: styles.fonts.mali.mediumItalic,
                    position: 'absolute',
                    color: theme[mode].color,
                    fontSize: 20*consts.px,
                    left: 140*consts.px,
                    top: 47*consts.px,
                  }}
                >
                  {account.item.email.length > maxLengthType['email'] ? account.item.email.slice(0, maxLengthType['email']) + '...' : account.item.email}
                </Text>
                : null
              }
              <View />
              
              {
                onlyUsernames ? 
                <View
                  style={{
                    position: 'absolute',
                    top: 28*consts.px,
                    right: 135*consts.px,
                  }}
                >
                  <View>
                    <TouchableOpacity
                      activeOpacity={configFront.activeOpacity}
                      onPress={()=>editUsername(account)}
                    >
                      <SvgIconProvider
                        d='M11.854 1.146a.5.5 0 0 0-.707 0L3.714 8.578a1 1 0 0 0-.212.314L2.04 12.303a.5.5 0 0 0 .657.657l3.411-1.463a1 1 0 0 0 .314-.211l7.432-7.432a.5.5 0 0 0 0-.708l-2-2Zm-7.432 8.14L11.5 2.206 12.793 3.5l-7.078 7.078-1.496.641-.438-.438.64-1.496Z'
                        styles={{top: 1, left: 0, color: theme[mode].icons, px: 15*2.75*consts.px}}
                        
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      position: 'absolute',
                      right: 60*consts.px,
                    }}
                  >
                    {
                    account.item.isLocked ?
                      <TouchableOpacity
                        activeOpacity={configFront.activeOpacity}
                        onPress={()=>{
                          setStrPage('login');
                          setDefaultValueUsernameLogin(account.item.username);
                        }}
                      >
                        <SvgIconProvider
                          d='M5 4.636c0-.876.242-1.53.643-1.962.396-.427 1.003-.696 1.858-.696.856 0 1.462.269 1.857.694.4.431.642 1.085.642 1.961V6H5V4.636ZM4 6V4.636c0-1.055.293-1.978.91-2.643.623-.67 1.517-1.015 2.591-1.015 1.075 0 1.969.344 2.59 1.014.617.664.909 1.587.909 2.641V6h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1ZM3 7h9v6H3V7Z'
                          styles={{top: 1, left: 0, color: theme[mode].icons, px: 15*2.75*consts.px}}
                        />
                      </TouchableOpacity> : 
                      <TouchableOpacity
                        activeOpacity={configFront.activeOpacity}
                        onPress={()=>{
                          accounts[account.index].isLocked = true;
                          setRender(!render);
                        }}
                      >
                        <SvgIconProvider
                          d='M7.499 0C6.326 0 5.36.39 4.738 1.194 4.238 1.839 4 2.682 4 3.634h1c0-.79.197-1.4.528-1.828.388-.5 1.024-.806 1.97-.806.859 0 1.465.265 1.86.686.4.426.642 1.074.642 1.95V6H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V3.636c0-1.055-.293-1.974-.912-2.634C9.465.338 8.57 0 7.498 0ZM3 7h9v6H3V7Z'
                          styles={{top: 1, left: 0, color: theme[mode].icons, px: 15*2.75*consts.px}}
                        />
                      </TouchableOpacity>
                    }                    
                  </View>
                </View>
                : null
              }

              <View
                style={{
                  position: 'absolute',
                  top: 28*consts.px,
                  right: 80*consts.px,
                }}
              >
                <TouchableOpacity
                  activeOpacity={configFront.activeOpacity}
                  onPress={()=>{
                    //confirm delete
                    setIsMessagePopUpVisible(true);
                    setValueSelected(account.item.username);
                    if (nameParent === 'UserAccounts') {
                      setIndexDelete(account.index);
                    } else {
                      accounts.splice(account.index, 1);
                      setRender(!render);
                    }
                  }}
                >
                  <SvgIconProvider
                    d='M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z'
                    styles={{top: 0, left: 0, color: theme[mode].icons, px: 15*3.25*consts.px}}
                    strprops="color, px"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <ContrastingSmallButton 
          data={data}
          text="Add another account"
          style={styleAddButton}
          styles={styles}
          buttonprops={{
            onPress: () => {
              setStrPage('login');
            }
          }}
        />
      </View>
    </>
  )
}

export default ListAccounts;