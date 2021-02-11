const db = require ('../data/dbConfig');

function get(){
    return db('users');
}

function getByUsername(username){
    return db('users')
        .where('username', username)
        .first();
}

function insert(user){
    return db('users')
        .insert(user)
        .then(a => {return getById(a)});
}

module.exports = {
    get,
    getByUsername,
    insert
};
