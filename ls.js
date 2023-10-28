const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');  // required to parse request body

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.get('/', (req, res) => {
  res.send('Hello from SSL server');
});

app.post('/ambientweather', (req, res) => {
  const data = req.body; // This will contain all the parameters sent in the request

  // For demonstration, let's log all received parameters:
  console.log('Received data:', data);
  // If you need to process or save this data, you can now iterate over it:
  for (let param in data) {
    console.log(`Parameter name: ${param}, Value: ${data[param]}`);
    // Do processing or save each parameter as needed
  }

  res.send('Data received: ' + JSON.stringify(data));
});


const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
);

sslServer.listen(3443, '10.42.0.1', () => console.log('Secure server 🚀🔑 on port 3443'));
