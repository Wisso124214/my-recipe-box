import bcrypt from 'react-native-bcrypt';
import { ToastAndroid } from 'react-native';
import { getAndroidId, getIosIdForVendorAsync } from 'expo-application';
import axios from 'axios';
import { SERVER_URL } from '../config/config';
import { setItem, getItem } from './AsyncStorage';

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

export const closeSession = async () => {

  await getItem('idMainSession')
  .then(async (idMainSession) => {
    if (idMainSession !== '') {
      axios.put(`${SERVER_URL}/session/${idMainSession}`, {
        state: 'closed',
        date: new Date(Date.now()).toString(),
      })
      .then(async () => {
        await setItem('idMainSession', '')
        ToastAndroid.showWithGravityAndOffset('Session closed', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
      })
      .catch((error) => {
        handleError(error, 'Error closing session');
      })
    } else {
      ToastAndroid.showWithGravityAndOffset('We does not found an open session', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50, );
    }
  })
}

export const createSession = async (id_user) => {
  let strId = '';

  await getIdSession(id_user)
  .then(async (id_session) => {
    strId = id_session;

    await setSession(id_user, 'open', strId)
    .then(async (id_session) => {
      strId = id_session;
    })
  })
  .catch((error) => {
    handleError(error, 'Error setting session');
  })
  
  return strId;
}

export const getIdSession = async (id_user) => {
  
  let strId = '';
  const id_device = getAndroidId() || getIosIdForVendorAsync();

  await axios.get(`${SERVER_URL}/sessions`, { params: {
    id_user: id_user,
    id_device: id_device,
  }})
  .then(async (res) => {
    await res.data.forEach((objsession) => {
      if (objsession.id_user === id_user && objsession.id_device === id_device) {
        strId = objsession._id;
      }
    })
  })
  .catch((error) => {
    handleError(error, 'Error setting session');
    return error;
  })

  return strId;
}

export const setSession = async (id_user, state, id_session) => {
  
  let strId = '';
  const id_device = getAndroidId() || getIosIdForVendorAsync();

  const date_4 = new Date();  //-4 GMT
  date_4.setHours(date_4.getHours() - 4);

  console.log('setSession id_user: ', id_user)

  const objsession = {
    id_device: id_device,
    id_user: id_user,
    state: state,
    date: date_4,
  }

  if (id_session === '') {

    await axios.post(`${SERVER_URL}/session`, objsession)
    .then((res) => {
      strId = res.data._id;
    })
    .catch((error) => {
      handleError(error, 'Error setting session');
    })
  } else if (method === 'put') {

    await axios.put(`${SERVER_URL}/session/${id_session}`, objsession)
    .catch((error) => {
      handleError(error, 'Error setting session');
    })
    strId = id_session;
  }
  return strId;
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

export const saveDataRegister = async (username, password, email, data) => {

  const id_contact = await getIdContact(email);
  const id_device = getAndroidId() || getIosIdForVendorAsync()

  const { setIsKeyboardVisible, setListUsernames, listUsernames, setLoading, mode, theme, methods } = data
  
  //this closes the keyboard
  setIsKeyboardVisible(false)
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      //add the new username to the list
      setListUsernames([...listUsernames, username]);

      //hash the password
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if(!err) {

          await axios.post(`${SERVER_URL}/user`, {
            id_device: id_device,
            username: username,
            password: hashedPassword,
            id_contact: id_contact,
          })
          .then(async (objuser) => {
            createSession(objuser.data._id)
            .then(async (id_session) => {
              await setItem('idMainSession', id_session)
            })
            .catch((error) => {
              methods.setLoading(false);
              handleError(error, 'Error Registering');
            })
          }).catch((error) => {
            methods.setLoading(false);
            handleError(error, 'Error Registering');
          })
        } else {
          methods.setLoading(false);
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