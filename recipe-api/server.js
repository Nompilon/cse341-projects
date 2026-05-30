const express = require('express');
const { connectDB } = require('./data/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

app.use(express.json());

app.use('/recipes', require('./routes/recipesRoute'));

app.use('/users', require('./routes/usersRoute'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});