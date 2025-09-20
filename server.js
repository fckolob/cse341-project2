const express = require('express');
const app = express();

const cors = require('cors');
const port = process.env.PORT || 3000;
const mongodb = require('./routes/datax/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const bodyparser = require('body-parser');
app.use(cors({
  origin: [
    'https://cse341-project1-22ot.onrender.com',
    'http://localhost:3000'
  ]
}));
app.use(bodyparser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database');
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected. Server is running at http://localhost:${port}`);
    });
  }
});
