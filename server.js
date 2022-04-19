// deps from modules and routes
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

// Setting up express js with port 
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SN_API', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('debug', true);

// Run Server on Port
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));