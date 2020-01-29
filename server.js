const { createServer } = require('http');
const mongoose = require('mongoose')
require('custom-env').env();
const app = require('./app');


const port = process.env.PORT;


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => {

  console.log(`Server Connecting to Mongoo.`);

  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Listening for events on ${server.address().port}`);
  });

  


}).catch((error) => console.log(`Connection to Mongoo DB Failed. ${error}`));
