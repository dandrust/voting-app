(function(){

var app = angular.module('registration', []);


app.controller('RegistrationController', [ '$http', '$location', function($http, $location){
    
    this.user = {};
    this.message = "";
    
    this.checkPassword = function(){
        if (this.user.password !== this.user.passwordConfirm) {
            this.message = "Passwords do not match"
            return false;
        }
        return true;
    };
    
    this.createUser = function(){

        // Convert data to serialized string
        var user = this.user;
        var data = "";
        Object.keys(user).forEach(function(val){
            data = data + val + "=" + encodeURIComponent(user[val]) + "&";
        });
        data = data.substring(0, data.length-1);
        
        // Define headers
        var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        };
        
        $http.post('/createUser', data, config).then(function(res){
                $location.path("/login");
            });
    
    };
    
}]);

})();