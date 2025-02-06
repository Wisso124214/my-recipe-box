import bcrypt from 'react-native-bcrypt';
import { ToastAndroid } from 'react-native';
import { getAndroidId, getIosIdForVendorAsync } from 'expo-application';
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
    handleError(error, 'Error getting users');
  })
}

export const closeSession = async (idMainSession, setIdMainSession) => {
  
  axios.put(`${SERVER_URL}/session/${idMainSession}`, {
    state: 'closed',
    date: new Date(Date.now()).toString(),
  })
  .then(() => {
    setIdMainSession('');
  })
  .catch((error) => {
    handleError(error, 'Error closing session');
  })

  ToastAndroid.showWithGravityAndOffset( 'ERROR closing session', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
}

export const setSession = async (id_user, state) => {
  let id = '';

  await axios.get(`${SERVER_URL}/sessions`,
    { params: { id_user: id_user } }
  ).then(async (res) => {
    await res.data.forEach((objsession) => {
      if (objsession.id_user === id_user && id === '') {
        id = objsession._id;
      }
    })

    const objsession = {
      id_user: id_user,
      state: state,
      date: new Date(Date.now()).toString(),
    }
    
    if (id === '') {
      await axios.post(`${SERVER_URL}/session`, objsession)
      .then(async (res) => {
        await axios.get(`${SERVER_URL}/sessions`, { params: { id_user: id_user } })
        .then(async (res) => {
          id = '';
          await res.data.forEach((objsession) => {
            if (objsession.id_user === id_user && id === '') {
              id = objsession._id;
            }
          })
        })
      })
      .catch((error) => {
        handleError(error, 'Error setting session');
      })
    } else {
      await axios.put(`${SERVER_URL}/session/${id}`, objsession)
      .catch((error) => {
        handleError(error, 'Error setting session');
      })
    }
  }).catch((error) => {
    handleError(error, 'Error setting session');
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
    handleError(error, 'Error getting users');
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
      await axios.post(`${SERVER_URL}/contact`, {
        email: email,
      }).catch((error) => {
        handleError(error, 'Error getting contacts');
      })
      id = await getIdContact(email);
    }
  }).catch((error) => {
    handleError(error, 'Error getting contacts');
  })
  return id;
}

export const saveDataRegister = async (id_contact, username, password, data, setIdMainSession) => {
  console.log('saveDataRegister');
  const id_device = getAndroidId() || getIosIdForVendorAsync();
  const { setIsKeyboardVisible, setListUsernames, listUsernames, setLoading, mode, theme, methods } = data
  
  setIsKeyboardVisible(false)
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {

      setListUsernames([...listUsernames, username]);

      bcrypt.hash(password, salt, async (err, hashedPassword) => {

        if(!err) {
          console.log('No error');

          await axios.post(`${SERVER_URL}/user`, {
            id_device: id_device,
            username: username,
            password: hashedPassword,
            id_contact: id_contact,
          })
          .then(async ()=>{
            console.log('user posted');
            await axios.get(`${SERVER_URL}/users`,
              { params: { username: username } }
            ).then(async (res) => {
              let id_user = '';
              await res.data.forEach((objuser) => {
                if (objuser.username === username && objuser.id_device === id_device && id_user === '') {
                  id_user = objuser._id;
                }
              })
              await setSession(id_user, 'open')
              .then(async (id_session) => {
                console.log('id_session: ', id_session);
                setIdMainSession(id_session);
              })
              .catch((error) => {
                setLoading(false);
                handleError(error, 'Error Registering');
              })
              }).catch((error) => {
                setLoading(false);
                handleError(error, 'Error Registering');
              })
            }).catch((error) => {
              setLoading(false);
              handleError(error, 'Error Registering');
            })
          } else {
            setLoading(false);
            handleError(err, 'Error Registering');
          }
        })
    } else {
      setLoading(false);
      handleError(err, 'Error Registering');
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

export const handleError = (error, errString) => {
  console.log(JSON.stringify(error, null, 2), errString);
  ToastAndroid.showWithGravityAndOffset(errString, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
}