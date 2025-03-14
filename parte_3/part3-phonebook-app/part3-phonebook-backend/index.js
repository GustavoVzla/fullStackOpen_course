require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/Person')

// Configuración de Express
const app = express()

// Middlewares
app.use(cors())
// Servir archivos estáticos del frontend
app.use(express.static('dist'))
// Logger middleware
app.use(morgan('dev')) // Formato 'dev' para desarrollo
// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json())

// Configuración de Morgan para logging
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    {
      skip: (req) => req.method !== 'POST',
    }
  )
)
app.use(
  morgan('tiny', {
    skip: (req) => req.method === 'POST',
  })
)

// Conexión a MongoDB
const url = process.env.MONGODB_URI

if (!url) {
  console.error('MongoDB connection URL is missing.')
  process.exit(1)
}

mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`)
    process.exit(1)
  })

// Rutas
app.get('/', (request, response) => {
  response.send('<h1>Backend Agenda telefónica</h1>')
})

app.get('/api/persons', async (request, response, next) => {
  try {
    const persons = await Person.find({})
    response.json(persons)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (request, response, next) => {
  try {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name or number missing' })
    }

    const newPerson = new Person({
      name: body.name,
      number: body.number,
    })

    const savedPerson = await newPerson.save()
    response.status(201).json(savedPerson)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    const body = request.body

    const updatedPerson = {
      name: body.name,
      number: body.number,
    }

    const result = await Person.findByIdAndUpdate(
      request.params.id,
      updatedPerson,
      {
        new: true,
        runValidators: true, // Habilita la validación
        context: 'query', // Necesario para algunas validaciones personalizadas
      }
    )

    if (result) {
      response.json(result)
    } else {
      response.status(404).json({ error: 'Person not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(request.params.id)
    if (deletedPerson) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'Person not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.get('/info', async (request, response, next) => {
  try {
    const numberOfEntries = await Person.countDocuments()
    const requestTime = new Date()

    response.send(`
      <p>Phonebook has info for ${numberOfEntries} people</p>
      <p>${requestTime}</p>
    `)
  } catch (error) {
    next(error)
  }
})

// Middleware para manejar rutas no encontradas
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Middleware para manejo de errores
// Error handler middleware (already correctly implemented)
const errorHandler = (error, request, response) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  response.status(500).json({ error: 'something went wrong' })
}

app.use(errorHandler)

// Iniciar el servidor
// Puerto dinámico para Fly.io
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
