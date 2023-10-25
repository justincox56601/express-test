const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// fake super sophisticated 'database table'
const users = [
	{_id: 1, name: 'John'},
	{_id: 2, name: 'Jane'},
	{_id: 3, name: 'Penny'}
];
const auth = [
	{_id: 1, user_id: 1, token: 'abc123'}
]

const getAuth = (token) =>{
	if(token == null){return false}
	const isAuthorized = auth.some(el => el.token === token)
	return isAuthorized;
}

app.listen(3000, ()=>{
	console.log('server is running on port 3000')
});

app.get('/', (req, res)=>{
	res.json({
		message: 'Hello World'
	})
});

app.get('/users', (req, res)=>{
	res.status(200).json({users})
});

app.get('/user-by-id/:id', (req, res)=>{
	const {id} = req.params
	if(id == null){
		res.sendStatus(404);
	}

	const user = users.find(el => el._id === parseInt(id, 10))
	if(user != null){
		res.status(200).json({user})
	}else{
		res.sendStatus(404);
	}
});

app.get('/user-by-name/:name', (req, res)=>{
	const {name} = req.params;
	if(name == null){
		res.sendStatus(404);
	}

	const user = users.find(el => el.name === name)
	if(user != null){
		res.status(200).json({user})
	}else{
		res.sendStatus(404)
	}
});

app.post('/user', (req, res)=>{
	const isAuthorized = getAuth(req.headers.authorization)

	if(!isAuthorized){
		res.sendStatus(403)
	}else{
		const {name} = req.body;
		const id = users.length+1;
		users.push({
			_id: id,
			name: name
		})

		res.status(201).json({users});
	}
});