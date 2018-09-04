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

app.post('/ap1/v1/bucketList', (response, request) => {
  const listItem = request.body;

  for (let requiredParams of ['title', 'description']) {
    if (!bucket_list[requiredParams]) {
      return response.status(422).send(`Missing required information: ${requiredParams}`)
    }
  }
  database('bucket_list')
  .insert(listItem)
  .then(listItem => response.status(201).json(`New List Item ${listItem.title} has been added to the database`))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
})

module.exports = app;