var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
    active: {   type: Boolean,
                default: true,
            },
    //name: String,
    //description: String,
    question: String,
    options: Array,
    addResponse: Boolean,
    owner: String,
    createDate: String,
});

pollSchema.methods.castVote = function(optionNo){
    this.options[parseInt(optionNo, 10)].votes ++;  
};

pollSchema.methods.toggleActive = function(){
    this.active = !this.active;
};

pollSchema.methods.getVoteCount = function(){
    var voteCount = 0;
    this.options.forEach(function(optionObj){
        voteCount += optionObj.votes;
    });
    return voteCount;
};

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;