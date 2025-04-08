const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({extended:false}))


const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger');
const user = require('./routes/user.routes');
const userProduct = require('./routes/user.products.routes');
const auth = require('./routes/auth.routes')

app.use('/api/users', user);

// app.use(cors({
//     origin: ['http://localhost:3000']
// }))

app.use('/api/user-products', userProduct)

app.use('/api/auth', auth)

app.use('/', express.static('files'))

app.use('/api-docs', 
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc.options)
)

module.exports = app;
