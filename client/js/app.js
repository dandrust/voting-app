(function(){

var app = angular.module('poll', []);

app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

app.controller('PollController', ['$http', '$location', function($http, $location){
    var poll = this;
    var pollId = $location.search().id
    this.response = '';
    
    poll.data = [];
    
    $http.get('/api/fetchPoll?id=' + pollId).success(function(data){
        poll.data = data;
    });
    
    this.castVote = function(val){
        console.log(typeof val);
        
        $http.put('/poll?pollId=' + pollId + "&optionNo=" + val ).success(function(data){
            console.log(data);
        });
    };
    
}]);


    
    

})();