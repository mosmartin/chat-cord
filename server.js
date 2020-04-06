const path = require('path');
const express = require('express');

const app = express();

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// setup the port
const port = process.env.PORT || 3000;

// listen
app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
