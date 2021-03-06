const express = require("express");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
};


// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.json({msg:"Welcome to E-commerce API"}));

// Define Routes
app.use('/api/users', require("./routes/users"));
app.use('/api/products', require("./routes/products"));
app.use('/api/orders', require("./routes/orders"));
app.use('/api/auth', require("./routes/auth"));
app.use('/api/upload', require("./routes/upload"));


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log(`Server started on port ${PORT}`));