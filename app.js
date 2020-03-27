const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const toDoRoutes = require('./routes/toDo.routes');
const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/todo', toDoRoutes);

const PORT = process.env.PORT || 3030;
const { MONGO_USER, MONGO_PWD, MONGO_DB } = process.env;

mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@cluster0-kxsp6.mongodb.net/${MONGO_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
)
    .then(() => {
      app.listen(() => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(err => console.log(err));