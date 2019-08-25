require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());

// custom token for morgan - will be logged additionally to console!
morgan.token('reqbody', function(request) {
  return JSON.stringify(request.body);
});

// app.use(morgan('tiny')) // default tiny configuration :method :url: stat: res: time in ms
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqbody'
  )
);

app.use(bodyParser.json());

app.get('/info', (req, res, next) => {
  const date = new Date();
  Person.countDocuments({}).then(count => {
    res.send(
      `<div>phonebook has info of ${count} people</div>
      <div>${date}</div>`
    );
  }).catch(error => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()));
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) response.json(person.toJSON());
      else response.status(404).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }
  // else if (persons.find(p => p.name === body.name)) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      result;
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
  console.log('hello');
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

//const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
