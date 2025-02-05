import bcrypt from 'react-native-bcrypt';
import { ToastAndroid } from 'react-native';
import * as Application from 'expo-application'
import axios from 'axios';
import { SERVER_URL } from '../config/config';

export async function getListUsernames(setListUsernames, username) {
  await axios.get(`${SERVER_URL}/users`,
    { params: { username: username } }
  ).then(async (res) => {
    let arr = []
    await res.data.forEach((objusername) => {
      arr.push(objusername.username)
    })
    setListUsernames(arr);
  }).catch((error) => {
    console.log(JSON.stringify(error, null, 2))
  })
}

export const closeMainSession = async () => {
  const id_device = Application.getAndroidId() || Application.getIosIdForVendorAsync();
  
  /*let id_main_session = '';
  
  
  await axios.get(`${SERVER_URL}/devices`,
    { params: { code: id_device } }
  ).then(async (res) => {
    await res.data.forEach(async (objdevice) => {
      
      if (objdevice.code === id_device && id_main_session === '') {
        id_main_session = objdevice.id_main_session;

        await axios.put(`${SERVER_URL}/sessions/${id_main_session}`, {
          state: 'closed',
          date: new Date(Date.now()).toString(),
        })
        .then(()=>{
          //obtener las sesiones de ese dispositivo y si hay alguna abierta, setearla como principal

          axios.get(`${SERVER_URL}/sessions`,
            { params: { id_device: id_device } }
          ).then(async (res) => {
            let id = '';
            await res.data.forEach((objsession) => {
              if (objsession.id_device === id_device && objsession.state === 'open' && id === '') {
                id = objsession._id;
              }
            })

            await axios.put(`${SERVER_URL}/devices/${objdevice._id}`, {
              code: id_device,
              id_main_session: id,
            })
            .then(()=>{
              ToastAndroid.showWithGravityAndOffset( 'Session closed', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
            })
            .catch((error)=>{
              ToastAndroid.showWithGravityAndOffset( 'ERROR closing session', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
              console.log(JSON.stringify(error, null, 2))
            })
             
          }).catch((error) => {
            ToastAndroid.showWithGravityAndOffset( 'ERROR closing session', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
            console.log(JSON.stringify(error, null, 2))
          })
        })
        .catch((error) => {
          ToastAndroid.showWithGravityAndOffset( 'ERROR closing session', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
          console.log(JSON.stringify(error, null, 2))
        })
      }
    })
  }).catch((error) => {
    ToastAndroid.showWithGravityAndOffset( 'ERROR closing session', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
    console.log(JSON.stringify(error, null, 2))
  })
  return id_main_session;*/
  ToastAndroid.showWithGravityAndOffset( 'ERROR closing session', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
}

export const setMainSession = async (id_device, id_session) => {
  let id = '';

  await axios.get(`${SERVER_URL}/devices`,
    { params: { code: id_device } }
  ).then(async (res) => {
    await res.data.forEach(async (objdevice) => {
      if (objdevice.code === id_device && id === '') {
        id = objdevice._id;

        console.log(id_session)
        await axios.put(`${SERVER_URL}/devices/${id}`, {
          code: id_device,
          id_main_session: id_session,
        })
        .then((res) => {
          console.log('Main session set')
        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 2));
        })
      }
    })
  }).catch((error) => {
    console.log(JSON.stringify(error, null, 2))
  })
  return id;
}

export const setSession = async (id_device, id_user, state) => {
  let id = '';

  await axios.get(`${SERVER_URL}/sessions`,
    { params: { id_device: id_device, id_user: id_user } }
  ).then(async (res) => {
    await res.data.forEach((objsession) => {
      if (objsession.id_device === id_device && objsession.id_user === id_user && id === '') {
        id = objsession._id;
      }
    })

    const objsession = {
      id_device: id_device,
      id_user: id_user,
      state: state,
      date: new Date(Date.now()).toString()
    }
    
    if (id === '') {
      await axios.post(`${SERVER_URL}/sessions`, objsession)
      .then(async (res) => {
        await axios.get(`${SERVER_URL}/sessions`, { params: { id_device: id_device, id_user: id_user } })
        .then(async (res) => {
          id = '';
          await res.data.forEach((objsession) => {
            if (objsession.id_device === id_device && objsession.id_user === id_user && id === '') {
              id = objsession._id;
            }
          })
        })
      })
      .catch((error) => {
        console.log(JSON.stringify(error, null, 2));
      })
    } else {
      await axios.put(`${SERVER_URL}/sessions/${id}`, objsession)
      .catch((error) => {
        console.log(JSON.stringify(error, null, 2));
      })
    }
  }).catch((error) => {
    console.log(JSON.stringify(error, null, 2))
  })
  return id;
}

export const getIdUser = async (username) => {
  let id = ''

  await axios.get(`${SERVER_URL}/users`,
    { params: { username: username } }
  ).then(async (res) => {
    await res.data.forEach((objuser) => {
      if (objuser.username === username && id === '') {
        id = objuser._id;
      }
    })
  }).catch((error) => {
    console.log(JSON.stringify(error, null, 2))
  })
  return id;
}

export const getIdContact = async (email) => {
  let id = ''
  
  await axios.get(`${SERVER_URL}/contacts`,
    { params: { email: email } }
  ).then(async (res) => {

    await res.data.forEach((objcontact) => {
      if (objcontact.email === email && id === '') {
        id = objcontact._id;
      }
    })
    
    if (id === '') {
      await axios.post(`${SERVER_URL}/contacts`, {
        email: email,
      }).catch((error) => {
        console.log(JSON.stringify(error, null, 2), 'Error setting contact');
      })
      id = await getIdContact(email);
    }
  }).catch((error) => {
    console.log(JSON.stringify(error, null, 2), 'Error getting contacts')
  })
  return id;
}

export const setIdDevice = async () => {
  const uniqueId = Application.getAndroidId() || Application.getIosIdForVendorAsync();

  axios.get(`${SERVER_URL}/devices`,
    { params: { code: uniqueId } }
  ).then(async (res) => {
    let isRegistered = false;

    await res.data.forEach((objdevice) => {
      if (objdevice.code === uniqueId && !isRegistered) {
        isRegistered = true;
        //console.log('id: ', objdevice._id);
      }
    })
    
    if (!isRegistered) {
      axios.post(`${SERVER_URL}/devices`, {
        code: uniqueId,
      }).catch((error) => {
        console.log(JSON.stringify(error, null, 2));
      }) 
    }
  }).catch((error) => {
    console.log(JSON.stringify(error, null, 2))
  })
  return uniqueId;
}

export const encryptData = async (id_contact, username, password, data) => {

  const { setIsKeyboardVisible, setListUsernames, listUsernames, setLoading, mode, theme, methods } = data
  
  setIsKeyboardVisible(false)
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {

      setListUsernames([...listUsernames, username])

      bcrypt.hash(password, salt, async (err, hashedPassword) => {

        await axios.post(`${SERVER_URL}/users`, {
          username: username,
          password: hashedPassword,
          id_contact: id_contact,
        })
        .then(async (res) => {
          const id_device = await setIdDevice()
          const id_user = await getIdUser(username)
          const id_session = await setSession(id_device, id_user, 'open')
          await setMainSession(id_device, id_session)
          .then(()=>{
            setMessage('Sign up successful', theme[mode].successColor, methods)
          })
          .catch((error)=>{
            console.log(JSON.stringify(error, null, 2))
            setMessage('Error', theme[mode].errorColor, methods)
          })

        })
        .catch((err) => {
          console.log(err + '. Error putting password')
        })
      })
    } else {
      console.log(err)
    }
  })
}

export const setMessageSuccess = (setTestMssg, setColorMssg, setIsHiddenMssg, setLoading) => {
  setTestMssg('Sign up successful');
  setColorMssg(theme[mode].successColor);
  setIsHiddenMssg(false);
  setLoading(false)
}
export const setMessage = (text, color, methods) => {

  const { setTestMssg, setColorMssg, setIsHiddenMssg, setLoading } = methods;

  setTestMssg(text);
  setColorMssg(color);
  setIsHiddenMssg(false);
  setLoading(false)
}


export const redirectPage = (page, delay, setStrPage) => {
  setTimeout(() => {
    setStrPage(page);
  }, delay);
}