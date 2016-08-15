(function(){
    var app = angular.module('user', ['ngCookies']);
    
    app.controller('userController', ['$cookies', function($cookies){
        
        $cookies.put("hello", "world");
        
        this.cookie = $cookies.get('connect.sid');
        console.log(this.cookie);
        
    }]);
    
})();