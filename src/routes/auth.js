const {Router} = require('express');
const dbService = require('../service/db');
const {
	check,
	matchedData,
	validationResult
} = require('express-validator');

const router = Router();

router.use((req, res, next)=>{ //dependency injection here
	req.dbService = dbService;
	next()
});

router.post('/', [
	check('username').notEmpty().escape(),
	check('password').notEmpty()
], (req, res)=>{

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors:errors.array()})
	}

	const {username, password} = matchedData(req);
	if(req.session.authenticated){
		return res.json(req.session)
	}

	try {
		const userId = req.dbService.getUserByName(username)._id
		const pw = req.dbService.getUserPassword(userId);
		
		if(password !== pw){  
			return res.status(403).json({msg: 'Bad Credentials'})
		}

		req.session.authenticated = true;
		req.session.user = {
			username, password
		};

		return res.sendStatus(200)
	} catch (error) {
		return res.status(403).json({msg: 'Bad Credentials'})
	}
})

module.exports = router;