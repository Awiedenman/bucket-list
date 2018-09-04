const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.title = 'Bucket List'

app.get('/', (request, response) => {
  response.send('Here is my bucket.')
});

app.get('/api/v1/bucketList', (request, response) => {
  database('bucket_list').select()
    .then((listItems) => {
      response.status(200).json(listItems);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/bucketList', (request, response) => {
  const listItem = request.body;
  console.log('body', request.body);
  for (let requiredParams of ['title', 'description']) {
    if (!listItem[requiredParams]) {
      return response.status(422).send(`Missing required information: ${requiredParams}`)
    }
  }
  console.log({
  title: listItem.title,
  description: listItem.description
  })
  
  database('bucket_list')
  .insert(listItem)
  .returning('*')
  .then((butts) => response.status(201).json(butts))
})

app.delete('/api/v1/bucketList', (request, response) => {
  const { id }  = request.body;

  database('bucket_list').where({
      id: id
    }).del()
    .then(() => response.status(200).send(`You have successfully deleted ${id} from the beer database.`))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
})

module.exports = app;