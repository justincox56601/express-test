const express = require('express');
const app = express();

// fake super sophisticated 'database table'
const users = [
	{_id: 1, name: 'John'},
	{_id: 2, name: 'Jane'},
	{_id: 3, name: 'Penny'}
];

app.listen(3000, ()=>{
	console.log('server is running on port 3000')
});

app.get('/', (req, res)=>{
	res.json({
		message: 'Hello World'
	})
});

app.get('/users', (req, res)=>{
	res.json({
		users 
	})
});

app.get('/user-by-id/:id', (req, res)=>{
	const {id} = req.params
	if(id == null){
		res.sendStatus(404);
	}

	const user = users.find(el => el._id === parseInt(id, 10))
	if(user != null){
		res.json({user})
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
		res.json({user})
	}else{
		res.sendStatus(404)
	}
});