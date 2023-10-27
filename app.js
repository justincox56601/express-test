const express = require('express');
const expressSession = require('express-session');
const userRoute = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const dotenv = require("dotenv")
dotenv.config()

const store = new expressSession.MemoryStore(); //using a memory store instead of a DB because this is a test project
const app = express();
const port = process.env.PORT || 5000

app.use(expressSession({
	secret: 'secret secret',
	cookie: {maxAge: 30*60*1000}, //30 minutes * 60 seconds/min * 1000ms/second
	saveUninitialized: false,
	resave: false,
	store
}));

app.use((req, res, next)=>{
	req.store = store; //adding the memory store to the request so can check authentication

	next();
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/users', userRoute);
app.use('/login', authRouter);

app.listen(port, ()=>{
	console.log(`server is running on port ${port}`)
});
