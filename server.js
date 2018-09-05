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
  for (let requiredParams of ['title', 'description']) {
    if (!listItem[requiredParams]) {
      return response.status(422).json({error:`Missing required information: ${requiredParams}`})
    }
  }
  database('bucket_list')
  .insert(listItem)
  .returning('*')
  .then((list_item) => response.status(201).json(list_item))
})

app.delete('/api/v1/bucketList/:id', (request, response) => {
  const { id }  = request.params;
  database('bucket_list').where({ id: id }).select()
    .then(listItems => {
      if (listItems.length){
        database('bucket_list').where({ id: id }).del()
        .then(listItems => response.status(204).json(`You have successfully deleted an item with the id of ${id} from the database.`))
        .catch(error => {
          throw response.status(500).json({error});
        })
      } else {
          return response.status(404).json({error: `There is no item in your database with an id of ${id}`})
      }
    })
  })


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
})

module.exports = app;