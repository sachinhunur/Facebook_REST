
var mongo = require('./mongo');
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	
	var email=msg.username;
	var password=msg.password;
	var url1="mongodb://localhost:27017/login";;
	mongo.connect(url1, function(){
		var db= mongo.collection('login');
		console.log(email);
		console.log(password);
		db.findOne({username: email}, function(err,user){
			var hash=user.password;
			bcrypt.compare(password, hash, function(err, result) {
		if(result)
			{
			res.code = "200";
			res.value = "Succes Login";
			res.id=user._id;
			}
		else
			{
			res.code = "401";
			res.value = "Failed Login";
			}
		
		callback(null, res);
	});
	});
	});		
}


function signuphandle_request(msg, callback){
	
	var email=msg.username;
	var fname=msg.firstname;
	var password=msg.password;
	var lastname=msg.lastname;
	var gender=msg.gender;
	
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db= mongo.collection('login');
		var res = {};
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(password, salt, function(err, hash) {
		console.log("wwhwhwhwhwhwhw");
		db.insert({"username": email,
					"password":hash,
					"firstname":fname,
					"lastname":lastname,
					"gender":gender});
			
			res.code = "200";
			res.value = "Success signup";
			
			callback(null, res);
		    });});
		
	
		

	
});	}

function editabout_request(msg, callback){
	console.log("3nnn3");
	var email=msg.username;
	var uname=msg.name;
	var city=msg.city;
	var occupation=msg.occupation;
	var dob=msg.dob;
	console.log("what");
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db= mongo.collection('about');
		var res = {};
		console.log("wwhwhwhwhwhwhw");
		db.remove({"username":email},function(err,rest){
			db.insert({"username": email,
				"uname":uname,
				"city":city,
				"occupation":occupation,
				"dob":dob});
		
		res.code = "200";
		res.value = "Success signup";
	

callback(null, res);
		});
		
});	}

function about_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	
	var email=msg.username;
//	var password=msg.password;
	var url1="mongodb://localhost:27017/login";;
	mongo.connect(url1, function(){
		var db= mongo.collection('about');
		console.log(email);
		//console.log(password);
		db.findOne({username: email}, function(err,user){
		if(user)
			{
			console.log("user");
			res.code = "200";
			res.value = "Succes Login";
			res.details=user;
			}
		else
			{
			res.code = "401";
			res.value = "Failed Login";
			}
		
		callback(null, res);
	});
	});	
}

function addinterest_request(msg, callback){
	console.log("3nnn3");
	var email=msg.username;
	var interest=msg.interest;
	console.log("what");
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db= mongo.collection('interest');
		var res = {};
		console.log("wwhwhwhwhwhwhw");
		db.insert({"username": email,
					"interest":interest});
			
			res.code = "200";
			res.value = "Success signup";
		

	callback(null, res);
});	}

function removeinterest_request(msg, callback){
	console.log("3nnn3");
	var email=msg.username;
	var interest=msg.interest;
	console.log("what");
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db= mongo.collection('interest');
		var res = {};
		db.remove({username: email,interest:interest}, function(err,user){
			if(user)
				{
				console.log("user"+user);
				res.code = "200";
				res.value = "Succes interest delete";
			//	res.details=user;
				}
			else
				{
				res.code = "401";
				res.value = "Failed Login";
				}
			
			callback(null, res);
});});	}

function interest_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	
	var email=msg.username;
//	var password=msg.password;
	var url1="mongodb://localhost:27017/login";;
	mongo.connect(url1, function(){
		var db = mongojs('login');
		console.log(email);
		//console.log(password);
		db.collection('interest').find({username: email}, function(err,user){
		if(user)
			
			{
			console.log("whaaaaaaaaaaaaaaaaaa"+user);
			res.code = "200";
			res.value = "Succes Login";
			res.details=user;
			
			}
		else
			{
			res.code = "401";
			res.value = "Failed Login";
			}
		
		callback(null, res);
	});
	});	
}


function news_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	
	var email=msg.username;
//	var password=msg.password;
	var url1="mongodb://localhost:27017/login";;
	mongo.connect(url1, function(){
		var db= mongo.collection('news');
		console.log(email);
		//console.log(password);
		var db = mongojs('login');
		db.collection('news').find({}, function(err,user){
		if(user)
			{
			console.log("user"+user);
			res.code = "200";
			res.value = "Succes Login";
			res.details=user;
			}
		else
			{
			res.code = "401";
			res.value = "Failed Login";
			}
		
		callback(null, res);
	});
	});	
}

function addnews_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	
	var email=msg.username;
	var news=msg.news;
//	var password=msg.password;
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		var db= mongo.collection('news');
		var res = {};
		console.log("wwhwhwhwhwhwhw");
		db.insert({"username": email,
					"news":news});
			
			res.code = "200";
			res.value = "Success signup";
		

	callback(null, res);
});		
}
function addgroup_request(msg, callback){
	
	var email=msg.username;
	var groupname=msg.groupname;
	var uid=msg.uid;
	
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db= mongo.collection(groupname);
		var res = {};
		console.log("wwhwhwhwhwhwhw");
		db.insert({"username": email});
		{
			console.log((email+groupname));                                 
			var db= mongo.collection(uid+"group");
			db.insert({"groupname":groupname});
			
			res.code = "200";
			res.value = "Success addgroup";
		}

	callback(null, res);
});	}


function deletegroup_request(msg, callback){
	
	var email=msg.username;
	var groupname=msg.groupname;
	var uid=msg.uid;
	
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db=mongo.collection(groupname);
		var db = mongojs('login');
		
		var groupcollection = db.collection(groupname);

		groupcollection.find({}, function(err, groups) {
		    if( err || !groups) console.log("No groups found");
		    else groups.forEach( function(group) {
		        console.log(group);
		        db=mongo.collection(group._id+"group");
			    db.remove({"groupname":groupname},function(err,result){
			    	var db= mongo.collection(groupname);
			    	var res = {};
			    	console.log("wwhwhwhwhwhwhw");
			    	db.drop();
			    	
			    	
			    	res.code = "200";
			    	res.value = "Success deletegroup";


			    callback(null, res);
			    });
		      /*  mongo.collection(group._id + "group", function(err, collection) {
		            collection.remove({"groupname": groupname});*/
		        //});
		    });
		});
		
		/*db.collection(groupname).find({}, function(err, doc){
			if(err)
				{
				console.log("error"+err);
				}
			console.log(doc);
			doc.forEach(function(err,doc){
			    console.log(doc._id);
			    db=mongo.collection(doc._id+"group");
			    db.remove({"groupname":groupname});
			});
			});*/
		
		
	
		
	});
	
}

function viewgroup_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	
	var email=msg.username;
	var uid=msg.uid;
//	var password=msg.password;
	var url1="mongodb://localhost:27017/login";;
	mongo.connect(url1, function(){
		var db= mongo.collection('news');
		console.log(email);
		//console.log(password);
		var db = mongojs('login');
		db.collection(uid+"group").find( function(err,user){
		if(user)
			{
			console.log("view group"+user);
			res.code = "200";
			res.value = "Succes Login";
			res.details=user;
			}
		else
			{
			res.code = "401";
			res.value = "Failed Login";
			}
		
		callback(null, res);
	});
	});	
}


function selectgroup_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.groupname);
	
	
	var group=msg.groupname;
	
//	var password=msg.password;
	var url1="mongodb://localhost:27017/login";;
	mongo.connect(url1, function(){
		var db= mongo.collection(group);
	
		//console.log(password);
		var db = mongojs('login');
		db.collection(group).find( function(err,user){
		if(user)
			{
			console.log("view group"+user);
			res.code = "200";
			res.value = "Succes Login";
			res.details=user;
			}
		else
			{
			res.code = "401";
			res.value = "Failed Login";
			}
		
		callback(null, res);
	});
	});	
}

function addmember_request(msg, callback){
	
	var email=msg.username;
	var groupname=msg.groupname;
	
	
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db= mongo.collection("login");
		var res = {};
		db.findOne({username: email}, function(err,result){
			if(result)
				{
				
				var id=result._id;
				var db= mongo.collection(id+"group");
				db.insert({"groupname":groupname});
				var db= mongo.collection(groupname);
				db.insert({"_id":id,"username":email});
				
				res.code = "200";
				res.value = "Succes Login";
				;
				}
			else
				{
				res.code = "401";
				res.value = "Failed Login";
				}
			
			callback(null, res);
});	});
}

function removemember_request(msg, callback){
	
	var email=msg.username;
	var groupname=msg.groupname;
	
	
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db= mongo.collection("login");
		var res = {};
		db.findOne({username: email}, function(err,result){
			if(result)
				{
				
				var id=result._id;
				var db= mongo.collection(id+"group");
				db.remove({"groupname":groupname});
				var db= mongo.collection(groupname);
				db.remove({"username":email});
				
				res.code = "200";
				res.value = "Succes Login";
				;
				}
			else
				{
				res.code = "401";
				res.value = "Failed Login";
				}
			
			callback(null, res);
});	});
}


function addfriend_request(msg, callback){
	
	var fromusername=msg.fromusername;
	var tousername=msg.tousername;
	
	
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log("hw");
		var db= mongo.collection("friend");
		var res = {};
		var res = {};
		console.log("wwhwhwhwhwhwhw");
		db.insert({"fromusername": fromusername,
					"tousername":tousername});
				
				res.code = "200";
				res.value = "Succes Login";
			
			callback(null, res);
});
}

function getfriends_request(msg, callback){
	
	var res = {};
	console.log("In get friend list handle request:"+ msg.username+msg.uid);
	
	
	var email=msg.username;
	var uid=msg.uid;
	var url1="mongodb://localhost:27017/login";;
	mongo.connect(url1, function(){
		var db= mongo.collection(uid+"friends");
		var db = mongojs('login');
		db.collection(uid+"friends").find( function(err,user){
		if(user)
			{
			console.log("frnd req"+user);
			res.code = "200";
			res.value = "Success Login";
			res.details=user;
			}
		else
			{
			res.code = "401";
			res.value = "Failed Login";
			}
		
		callback(null, res);
	});
	});	
}


function responsefriend_request(msg, callback){
	
	var username=msg.fname;
	var uid=msg.id;
	var value=msg.value;
	var use=msg.user;
	
	
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		console.log(username+uid+value);
		if(value=="yes"){
			
			var db=mongo.collection("login");
			db.findOne({username:username},function(err,user){
				console.log(user.username+"step 1"+user._id);
				db=mongo.collection(user._id+"friends");
				db.insert({"username":use});
			});
			
		var db= mongo.collection(uid+"friends");
		
		
		console.log("wwhwhwhwhwhwhw");
		db.insert({"username": username},function(err,rest){
			var db= mongo.collection("friend");
			db.remove({"fromusername":username});
			var res = {};
			console.log("removed");
			res.code = "200";
			res.value = "Succes Login";
		
		callback(null, res);
		});
	
		}
		else
		{
			var db= mongo.collection("friend");
			db.remove({"fromusername":username},function(err,rest){
				var res = {};
				res.code = "200";
				res.value = "Succes Login";
			
			callback(null, res);
			});
		}
				
		
});
}

function getrequestfriends_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	
	var email=msg.username;
	
	var url1="mongodb://localhost:27017/login";
	mongo.connect(url1, function(){
		
	
		var db= mongo.collection("friend");
		var db = mongojs('login');
		db.collection("friend").find({"tousername":email}, function(err,user){
		if(user)
			{
			console.log("view group"+user);
			res.code = "200";
			res.value = "Succes Login";
			res.details=user;
			}
		else
			{
			res.code = "401";
			res.value = "Failed Login";
			}
		
		callback(null, res);
	});
	});	
}

exports.getrequestfriends_request=getrequestfriends_request;
exports.responsefriend_request=responsefriend_request;
exports.getfriends_request=getfriends_request;
exports.addfriend_request=addfriend_request;
exports.removemember_request=removemember_request;
exports.addmember_request=addmember_request;
exports.selectgroup_request=selectgroup_request;
exports.viewgroup_request=viewgroup_request;
exports.addgroup_request=addgroup_request;
exports.deletegroup_request=deletegroup_request;
exports.news_request=news_request;
exports.addnews_request=addnews_request;
exports.interest_request=interest_request;
exports.addinterest_request=addinterest_request;
exports.removeinterest_request=removeinterest_request;
exports.about_request=about_request;
exports.editabout_request=editabout_request;
exports.handle_request = handle_request;
exports.signuphandle_request = signuphandle_request;