




/**
 * Module dependencies.
 */

/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, home = require('./routes/home')
, http = require('http')
, path = require('path');

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
//var login = require("./routes/login");
var mq_client = require('./rpc/client');
var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'routes')));
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}


app.post('/back',function(req,res){
	res.render("success",{user:req.session.username});
});
app.post('/logout',function(req,res){
	req.session.destroy();
	res.render("signin",{title:"Facebook"});
});
app.get('/', routes.index);
app.post('/signup',home.sign_up);
app.post('/login',function(req,res){
	var username = req.param("email");
	var password = req.param("password");
	var msg_payload = { "username": username, "password": password };
		
	console.log("In POST Request = UserName:"+ username+" "+password);
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
			
					req.session.username = username;
					req.session.uid=results.id;
					console.log(req.session.uid+"userid");
					console.log("hhhhh"+req.session.username);
					res.render("Success",{user:username});
				
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});

	

	});
app.post('/logi', function(req,res){
	res.render("signin",{title:"Welcome"});
});
app.get('/success', home.success_loginabout);
app.get('/news', home.success_loginnews);
app.post('/news', home.success_addnews);
app.get('/interest', home.success_logininterest);
app.get('/fail_login', home.fail_login);
app.post('/about',home.edit_about);
app.post('/addinterest',home.add_interest);
app.post('/removeinterest',home.remove_interest);
app.post('/addgroups',home.add_group);
app.post('/deletegroups',home.delete_group);
app.get('/viewgroups', home.view_group);
app.post('/viewgroups',function(req,res){
	res.render("viewgroup");
});
app.get('/selectgroups', home.select_group);
app.get('/friends', home.get_friends);
app.get('/friend', home.getrequest_friends);
app.post('/friend', function(req,res){
	home.response_friends(req.body.email,req.body.val,req.session.uid,req.session.username);
	
});
app.post('/selectgroups',function(req,res){
	req.session.groupname=req.param("groupname");
	res.render("selectgroup");
});
app.post('/addmember',home.add_member);
app.post('/removemember',home.remove_member);
app.post('/addfriend',home.add_friend);
app.post('/aboutedit',function(req,res){
	res.render("about",{title:"Edit About"});
});
app.post('/groups',function(req,res){
	res.render("groups",{title:"Group Page"});
});
app.post('/interestedit',function(req,res){
	res.render("interest",{title:"edit interest"});
});
app.post('/friends',function(req,res){
	res.render("friend",{msg:"Friends"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
