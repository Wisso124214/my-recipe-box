import axios from 'axios';
import { SERVER_URL } from '../../config/config.js';

export const createUserRoutes = (app) => {
  app.get('/test-db', async (req, resp) => {
    //Evaluar permisos asd
    axios.post(`${SERVER_URL}/session`,
      {
        date: new Date(),
      }
    )
    .then((res) => {
      console.log('posted');
      //console.log('posted', res.data, 'id: ', res.data._id);
    })
    .catch((err) => {
      console.log('error posting', JSON.stringify(err, null, 2));
      resp.status(500).json({ message: err.message });
    })
  });

  
}
