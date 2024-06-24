// Libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
// Config
const sequelize = require('./config/database');
// Routes
const permissionRoutes = require('./routes/permissionRoutes');
const roleRouter = require('./routes/roleRouter');
const userRouter = require('./routes/userRoutes');
const sectionRouter = require('./routes/sectionRoutes');
const siteRouter = require('./routes/siteRoutes');
// Helpers
const initializeDatabase = require('./helpers/initializeDatabase');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// const userRouter = require('./routes/userRoutes');

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})
app.use('/api/permissions', permissionRoutes);
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/sites', siteRouter);

sequelize.sync()
    .then(async() => {
        initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Servidor iniciado en  http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.error('Error al sincronizar el modelo', err);
    })