require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan"); // Importar morgan
const Note = require("./models/Note");

// Configurar Express
const app = express();

// Middlewares
app.use(cors());
// Servir archivos estáticos del frontend
app.use(express.static("dist"));
// Logger middleware
app.use(morgan("dev")); // Formato 'dev' para desarrollo
// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Obtener credenciales desde variables de entorno
// const password = process.env.MONGO_PASSWORD;
// const dbName = process.env.MONGO_DB_NAME;

// if (!password || !dbName) {
//   console.error(
//     "Error: Missing environment variables (MONGO_PASSWORD or MONGO_DB_NAME)"
//   );
//   process.exit(1);
// }

// Conexión a MongoDB
const url = process.env.MONGODB_URI;

if (!url) {
  console.error("MongoDB connection URL is missing.");
  process.exit(1);
}

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error(`Error connecting to MongoDB:, ${err.message}`);
    process.exit(1);
  });

// Rutas
app.get("/", (request, response) => {
  response.send("<h1>Backend Notas</h1>");
});

app.get("/api/notes", async (request, response, next) => {
  try {
    const notes = await Note.find({});
    response.json(notes);
  } catch (error) {
    next(error);
  }
});

app.get("/api/notes/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/notes", async (request, response, next) => {
  try {
    const body = request.body;

    const note = new Note({
      content: body.content,
      important: Boolean(body.important) || false,
    });

    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/notes/:id", async (request, response, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(request.params.id);
    if (deletedNote) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.put("/api/notes/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const noteToUpdate = {
      content: body.content,
      important: Boolean(body.important),
    };

    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      noteToUpdate,
      { new: true, runValidators: true, context: "query" }
    );

    if (updatedNote) {
      response.json(updatedNote);
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Middleware para manejar rutas no encontradas
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "Endpoint not found" });
};

app.use(unknownEndpoint);

// Middleware para manejo de errores
const errorHandler = (error, request, response) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Invalid token" });
  }

  // Error por defecto
  response.status(500).json({ error: "Something went wrong" });
};

app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// const PORT = process.env.PORT || 0; // 0: Node.js selecciona un puerto disponible

// // Guarda la instancia del servidor
// const server = app.listen(PORT, () => {
//   const address = server.address(); // Obtiene la información del servidor
//   const actualPort = address.port; // Extrae el puerto asignado
//   console.log(`Server running on port ${actualPort}`);
// });
