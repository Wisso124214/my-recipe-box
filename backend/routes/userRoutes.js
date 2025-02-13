import axios from 'axios';
import { SERVER_URL } from '../../config/config.js';

export const createRouteTestDB = (app) => {
  app.get('/test-db', async (req, res) => {
    //Evaluar permisos
    axios.post(`${SERVER_URL}/session`,
      {
        date: new Date(),
      }
    )
    .then((res) => {
      console.log('posted', res.data);
    })
    .catch((err) => {
      console.log('error posting', JSON.stringify(err, null, 2));
      res.status(500).json({ message: err.message });
    })
  });
}
