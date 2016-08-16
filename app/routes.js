var createPoll = require('../lib/createPoll');
var fetchPoll = require('../lib/fetchPoll');
var castVote = require('../lib/castVote');
var fetchUserPolls= require('../lib/fetchUserPolls');
var archivePoll = require('../lib/archivePoll');
var removePoll = require('../lib/removePoll');
var fetchPopularPolls = require('../lib/fetchPopularPolls');

module.exports = function(app, passport) {

    app.get('/', function(req, res){
        if (auth(req)) {
            res.render('index', buildData(req));
        } else {
           res.render('index', {});
        }
    });
    
    app.get('/login', function(req, res) {
        res.render('login', {message: req.flash('loginMessage')});
    });

    app.get('/register', function(req, res) {
        res.render('register', {message: req.flash('signupMessage')});
    });

    app.get('/profile', function(req, res) {
        if (auth(req)) {
            res.render('profile', buildData(req));
        } else {
            res.redirect('/login');
        }
    });

    app.get('/createPoll', function(req, res){
        if (auth(req)){
            res.render('createPoll', buildData(req));
        } else {
            res.redirect('/login');
        }
    });

    app.post('/createPoll', function(req, res) {
        createPoll(req.body, req.user.username, function(err, data) {
            if (err) throw err;
            res.redirect('/pollCtrl?id=' + data.id);
            res.end();
        });
    });

    app.get('/poll', function(req, res) {
        fetchPoll(req.query.id, function(err, data){
            if (err) throw err;
            
            if (data.active) {
                if (auth(req)) {
                    res.render('poll', buildData(req, data));
                } else {
                    res.render('poll', buildData(null, data));
                }
            } else {
                res.redirect('/error');
            }
            
            
        });
    });

    app.post('/poll', function(req, res) {
        castVote(req.body, function(err, data) {
            if (err) throw err;
            res.redirect('/showResults?id=' + data.id);
            res.end();
        });
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/register',
        failureFlash : true
    }));

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        }));
        
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });
    
    app.get('/showResults', function(req, res){
        if (auth(req)){
            res.render('showResults', buildData(req));
        } else {
            res.render('showResults', {});
        }
    });
    
    app.get('/api/fetchPoll', function(req, res){
        fetchPoll(req.query.id, function(err, data){
            if (err) throw err;
            res.end(JSON.stringify(data));
        });
    });
    
    app.get('/api/fetchUserPolls', function(req, res){
        fetchUserPolls(req.query.username || req.user.username, function(err, data){
            if (err) throw err;
            res.end(JSON.stringify(data));
        });
    });
    
    app.get('/pollCtrl', function(req, res){
        fetchPoll(req.query.id, function(err, poll){
            if (err) throw err;
            if (auth(req)){
               res.render('pollCtrl', buildData(req, poll));
            } else {
                res.redirect('/login');
            }
        });

    });
    
    app.get('/dashboard', function(req, res){
        if (auth(req)) {
            res.render('dashboard',buildData(req));
        } else {
            res.redirect('/login');
        }
    });
    
    app.get('/archive', function(req,res){
        fetchPoll(req.query.id, function(err, poll){
            if (err) throw err;
            if (poll.owner === req.user.username) {
                archivePoll(req.query.id, function(err, data){
                    if (err) throw err;
                    res.redirect('/pollCtrl?id=' + data._id);
                 });            
                
            } else {
                res.redirect('/error');
            }
        });
    });
    
    app.get('/remove', function(req,res){
        fetchPoll(req.query.id, function(err, poll){
            if (poll.owner === req.user.username) {
                removePoll(req.query.id, function(err, data){
                    if (err) throw err;
                    res.redirect('/dashboard');
                 });            
                
            } else {
                res.redirect('/error');
            }
        });
    });
    
    app.get('/error', function(req, res){
        if (auth(req)) {
            res.render('error', buildData(req));
        } else {
            res.render('error', {})
        }
    });
    
    app.get('/api/fetchPopular', function(req, res){
        fetchPopularPolls(req.query.no, function(err, data){
            if (err) throw err;
            res.end(JSON.stringify(data));
        });
    });

    var auth = function(req){
        return req.isAuthenticated();
    };
    
    var buildData = function(req, data){
        var obj = {};
        
        if (req) {
            if (auth(req)){
                obj.user = req.user;
            } 
        }
        if (data) {
            obj.data = data;
        } 
        
        return obj;
    };
    

};