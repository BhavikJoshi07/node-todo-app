const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

var userOneID = new ObjectID();
var userTwoID = new ObjectID();

const users = [{
    _id : userOneID,
    email : 'bhavik@exmple.com',
    password : 'userOnePass',
    tokens : [{
        access : 'auth',
        token : jwt.sign({_id : userOneID, access : 'auth'}, 'abc123').toString()
    }]
},{
    _id : userTwoID,
    email : 'example@example.com',
    password : 'userTroPassword',
    tokens : [{
        access : 'auth',
        token : jwt.sign({_id : userTwoID, access : 'auth'}, 'abc123').toString()
    }]
}];

const todos = [{
    _id : new ObjectID(),
    text : 'test todo 1',
    _creator : userOneID
}, {
    _id : new ObjectID(),
    text : 'test todo 2',
    _creator : userTwoID,
    completed : true,
    completedAt : 5485482332
}];

var populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

var populateUsers = (done) => {
    User.remove({}).then(()=> {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo])
    }).then(()=>done());
}

module.exports = {todos,users,populateTodos,populateUsers};