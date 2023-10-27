const {Router} = require('express');
const dbService = require('../service/db');
const {
	matchedData,
	param,
	validationResult
} = require('express-validator');


const router = Router()

router.use((req, res, next)=>{ //validate client is logged in before using route
	const {sessionID} = req;
	console.log(req.store.sessions[sessionID])
	if(req.store.sessions[sessionID] == null){
		return res.status(403).json({msg: 'Not Authenticated'})
	}

	next();
});

router.use((req, res, next)=>{ //dependency injection here
	req.dbService = dbService;
	next()
});

router.get('/', (req, res)=>{
	try {
		const users = req.dbService.getUsers();
		return res.status(200).json({users})
	} catch (error) {
		return res.status(500)
	}
});

router.get('/name/:name', [
	param('name').notEmpty().escape()
], (req, res)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors:errors.array()})
	}

	try{
		const {name} = matchedData(req)
		const user = req.dbService.getUserByName(name)
		return res.status(200).json({user})
	}catch(error){
		return res.status(500)
	}

	
})

router.get('/id/:id', [
	param('id').notEmpty().escape()
], (req,res)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors:errors.array()})
	}

	try {
		const {id} = matchedData(req);
		const user = req.dbService.getUserById(parseInt(id, 10));
		return res.status(200).json({user})
	} catch (error) {
		return res.status(500)
	}
})

module.exports = router;