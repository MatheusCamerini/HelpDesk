const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const categoriaRoutes = require('./routes/categoriaRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const solicitanteRoutes = require('./routes/solicitanteRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/categorias', categoriaRoutes);
app.use('/tecnicos', tecnicoRoutes);
app.use('/solicitantes', solicitanteRoutes);

app.use(errorMiddleware);

module.exports = app;
