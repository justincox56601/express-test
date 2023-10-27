//database class for this example - super sophisticated

const users = [
	{_id: 1, name: 'John'},
	{_id: 2, name: 'Jane'},
	{_id: 3, name: 'Penny'}
];
const passwords = [
	{_id: 1, fk_user__id: 1, password: 'abc123'}, //not hashes because this is an example project
	{_id: 2, fk_user__id: 2, password: '123456'},
	{_id: 3, fk_user__id: 3, password: 'abcefg'},
]

const Db = {}

Db.getUsers = () =>{
	return users;
};

Db.getUserById = (id) =>{
	return users.find(el => el._id === id)
};

Db.getUserByName = (name) =>{
	return users.find(el => el.name === name)
};

Db.getUserPassword = (id) => {
	return passwords.find(el =>el.fk_user__id === id).password
}


module.exports = Db;