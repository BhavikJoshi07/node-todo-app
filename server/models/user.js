const mongoose = require('mongoose');

var User = mongoose.model('Todo', {
   email : {
       type : String,
       required : true,
       trim : true,
       minLength : 1
   }
});

module.exports = {User};