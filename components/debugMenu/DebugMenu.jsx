import React from 'react'; // Asegúrate de importar useCallback desde React
import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import ThemeModeButton from '../iconButton/ThemeModeButton';
import useSendEmail from '../../hooks/useSendEmail';
import axios from 'axios'
import { SERVER_URL } from '../../config/config'

const DebugMenu = ({ data }) => {

  const { styles, setPage, page, arrdebug, dataIconButton, showDebugMenu, theme, mode, setLoading } = data;
  
  const datatransporter = {
    service: 'gmail',
    auth: {
      user: 'bustos2004luis@gmail.com',
      pass: 'I Love Jesus CQ'
    }
  }
  
  const mailOptions = {
    from: 'bustos2004luis@gmail.com',
    to: 'luisdavidbustosnunez@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  const handleNodeMailer = async () => {
    /*await nodeMailer()
    .then(()=>{
      ToastAndroid.showWithGravityAndOffset( 'Email sent', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
    })
    .catch((error)=>{
      ToastAndroid.showWithGravityAndOffset( 'ERROR sending email', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
      console.log(error)
    })*/

    if (SERVER_URL) {
      setLoading(true)
      axios.post(`${SERVER_URL}/send-email`, {
        datatransporter: datatransporter,
        mailOptions: mailOptions,
      })
      .then(()=>{
        ToastAndroid.showWithGravityAndOffset( 'Email sent', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
      })
      .catch((error)=>{
        ToastAndroid.showWithGravityAndOffset( 'ERROR sending email', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
        console.log(JSON.stringify(error, null, 2))
      })
      .then(()=>{
        setLoading(false)
      })
    } else {
      ToastAndroid.showWithGravityAndOffset( 'ERROR sending email', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
      console.log('SERVER_URL not found')
    }
  }

  const nodeMailer = async () => {
    axios.post(`${SERVER_URL}/send-email`, {
        params: {
          name: 'Luis',
          email: 'luisdavidbustosnunez@gmail.com',
          subject: 'Subject',
          message: 'Message',
        }
      }
    )
  }

  const { sendEmail } = useSendEmail({
    subject: 'MyCoolApp Support',
  });

  const handleSendEmail = React.useCallback(async () => {
    try {
      const event = await sendEmail();
      // or sendEmail({body: '<b>Hi</b>, I'm contacting you to ...', isHTML: true});

      if (event !== 'cancelled') {
        Alert.alert('Success!', 'Thank you for your feedback!');
      }
    } catch (err) {
      Alert.alert('Oops!', 'Something went wrong..');
    }
  }, [sendEmail]);

  return (
    showDebugMenu &&
    <View 
      style={{ 
        flexDirection: 'row', 
        position: 'absolute', 
        bottom: 20,
      }} 
    >
      <TouchableOpacity
        //onPress={handleSendEmail}
        onPress={handleNodeMailer}
        style={{ 
          position: 'absolute',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 27,
          width: 80,
          left: 65,
          top: -60,
          backgroundColor: theme[mode].icons+'ee',
          borderRadius: 10,
          borderColor: theme[mode].noErrorColor,
          borderWidth: 2,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: theme[mode].errorColor,
            fontWeight: 'bold',
          }}
        >Send email</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => {}}
        style={{ 
          ...styles.simpleButtons, 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 23, 
          width: 23, 
          paddingVertical: 2, 
          paddingHorizontal: 6,
          left: 40,
          top: -25,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
          }}
        > {"<"} </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => { setPage(page > 0 ? page-1 : arrdebug.length-1); }}
        //onPress={() => setPage(page > 0 ? page-1 : debug.length-1)}
        style={{ ...styles.simpleButtons, justifyContent: 'center', alignItems: 'center', height: 30, paddingVertical: 2, paddingHorizontal: 6, top: 10 }}
      >
        <Text> {"<"} </Text>
      </TouchableOpacity>
      
      <ThemeModeButton dataIconButton={dataIconButton} />

      <TouchableOpacity
        onPress={() => { setPage(page < arrdebug.length-1 ? page+1 : 0); }}
        //onPress={() => setPage(page < debug.length-1 ? page+1 : 0)}
        style={{ ...styles.simpleButtons, justifyContent: 'center', alignItems: 'center', height: 30, paddingVertical: 2, paddingHorizontal: 6, top: 10 }}
      >
        <Text> {">"} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={{ 
          ...styles.simpleButtons, 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 23, 
          width: 23, 
          paddingVertical: 2, 
          paddingHorizontal: 6,
          right: 40,
          top: -25,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
          }}
        > {">"} </Text>
      </TouchableOpacity>
    </View>
  )
}

export default DebugMenu;