const express = require('express');
const promClient = require('prom-client');

const app = express();
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const requestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

app.get('/', (req, res) => {
  requestCounter.inc();
  res.send('Hello World!');
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
