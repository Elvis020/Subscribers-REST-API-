require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;

const mongoose = require('mongoose');


// Configuring server to accept JSON
app.use(express.json());

// Settng up routes🍠
const subscriberRouter = require('./routes/subscriber');
app.use('/subscribers',subscriberRouter )
 
 

// Listening to server
app.listen(port, () => console.log(`Server has started at port:${port}`));


// Configuring MongoDB
mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to 😻 datatbase!'));