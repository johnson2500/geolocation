import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import sort from './controllers/sort';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/getAppData', async (req, res) => {
  const { limit, filter } = req.query;
  console.log(req.query);
  try {
    const addSet = await axios.get('https://app.wordstream.com/services/v1/wordstream/interview_data');

    // check for data return from api call
    if (!addSet || !addSet.data || !addSet.data.data) {
      res.status(404).send({ error: 'Error no data found.' });
      return;
    }
    const { data: response } = addSet;

    const sortedData = await sort({ data: response.data, limit, filter });

    if (sortedData) {
      res.send(sortedData);
      return;
    }
    res.status(404).send({ error: 'Error no data found from sorted data' });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get('*', (req, res) => {
  res.status(500).send(`No api endpoint ${req.route.path} exists.`);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
