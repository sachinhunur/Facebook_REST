var express = require('express');
var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";

var mongo = require("./mongo");



/*function sign_in(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}*/

function sign_up(req,res)
{
var username=req.param("email");
var firstname=req.param("firstname");
var lastname=req.param("lastname");
var gender=req.param("gender");
var password=req.param("password");
var msg_payload = { "username": username, "password": password, "firstname":firstname,"lastname":lastname,"gender":gender };
mq_client.make_request('signup_queue',msg_payload, function(err,results){
	
	console.log(results);
	if(err){
		throw err;
	}
	else 
	{
		if(results.code == 200){
			console.log("valid Signup");
			
			res.render("signin",{title:"Welcome"});
		}
		else {    
			
			console.log("Invalid Signup");
			res.render("index");
		}
	}  
});

}

function after_sign_in(req,res)
{
	
	// check user already exists
	//var getUser="select * from users where emailid='"+req.param("username")+"'";
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
					console.log("hhhhh"+req.expressSession.username);
					res.render("Success",{user:username});
				
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
	
}

function edit_about(req,res)
{
	// check user already exists
	//var getUser="select * from users where emailid='"+req.param("username")+"'";
	var username=req.session.username;
	var uname=req.param("uname");
	var city=req.param("city");
	var occupation=req.param("current");
	var dob=req.param("dob");
	var msg_payload = { "username": username, "name": uname, "city":city,"occupation":occupation,"dob":dob };
		
	console.log("In POST Request = UserName:"+ username+" "+uname+""+city+""+occupation+""+dob);
	
	mq_client.make_request('about_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				
				
				res.render("Success",{user:username});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Edit About":"Fail"});
			}
		}  
	});
}

function add_interest(req,res)
{
	// check user already exists
	//var getUser="select * from users where emailid='"+req.param("username")+"'";
	var username=req.session.username;
	var interest=req.param("interest");
	
	var msg_payload = { "username": username, "interest": interest };
		
	console.log("In POST Request = UserName:"+ username+" "+interest);
	
	mq_client.make_request('addinterest_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				
				
				res.render("Success",{user:username});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"add Interest":"Fail"});
			}
		}  
	});
}

function remove_interest(req,res)
{
	// check user already exists
	//var getUser="select * from users where emailid='"+req.param("username")+"'";
	var username=req.session.username;
	var interest=req.param("interest");
	
	var msg_payload = { "username": username, "interest": interest };
		
	console.log("In POST Request = UserName:"+ username+" "+interest);
	
	mq_client.make_request('removeinterest_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				
				
				res.render("Success",{user:username});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Remove Interest":"Fail"});
			}
		}  
	});
}


function success_loginabout(req,res)
{
	var username=req.session.username;
	var msg_payload = { "username": username};
	
	console.log("In POST Request = UserName:"+ username+" kkkk");
	
	mq_client.make_request('aboutget_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				res.end(JSON.stringify(results.details));
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Get About":"Fail"});
			}
		}  
	});
	
}

function success_logininterest(req,res)
{
	var username=req.session.username;
	var msg_payload = { "username": username};
	
	console.log("In POST Request = UserName:"+ username+" interest");
	
	mq_client.make_request('interest_queue',msg_payload, function(err,results){
		console.log("valid interests");
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid interests");
				console.log(results.details);
				res.end(JSON.stringify(results.details));
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Get Interest":"Fail"});
			}
		}  
	});
	
}

function success_loginnews(req,res)
{
	var username=req.session.username;
	var msg_payload = { "username": username};
	
	console.log("In POST Request = UserName:"+ username+" interest");
	
	mq_client.make_request('news_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid News");
				console.log(results.details);
				res.end(JSON.stringify(results.details));
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"News Display":"Fail"});
			}
		}  
	});}
function success_addnews(req,res)
{
	var username=req.session.username;
	var news=req.param('event');
	var msg_payload = { "username": username, "news":news};
	
	console.log("In POST Request = UserName:"+ username+" news");
	
	mq_client.make_request('addnews_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.render("Success",{user:username});
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Add News":"Fail"});
			}
		}  
	});

}
function add_group(req,res)
{
	var username=req.session.username;
	var id=req.session.uid;
	var groupname=req.param('groupname');
	var msg_payload = { "username": username, "groupname":groupname,"uid":id};
	
	console.log("In POST Request = UserName:"+ username+" groupadd");
	
	mq_client.make_request('addgroup_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.render("addgroups",{title:groupname});
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Add Group":"Fail"});
			}
		}  
	});

}

function delete_group(req,res)
{
	var username=req.session.username;
	var id=req.session.uid;
	var groupname=req.param('groupname');
	var msg_payload = { "username": username, "groupname":groupname,"uid":id};
	
	console.log("In POST Request = UserName:"+ username+" groupdelete");
	
	mq_client.make_request('deletegroup_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.render("deletegroups",{title:groupname});
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Delete Group":"Fail"});
			}
		}  
	});

}

function fail_login(req,res)
{
	ejs.renderFile('./views/fail_login.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}


function view_group(req,res)
{
	var username=req.session.username;
	var id=req.session.uid;
	var msg_payload = { "username": username,"uid":id};

	
	console.log("In POST Request = UserName:"+ username+" group");
	
	mq_client.make_request('viewgroup_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.end(JSON.stringify(results.details));
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"View Group":"Fail"});
			}
		}  
	});}

function select_group(req,res)
{
	var groupname=req.session.groupname;
	console.log("select group"+groupname);
	var msg_payload = { "groupname":groupname};

	
	console.log("In POST Request = UserName:"+ groupname+" selectgroup");
	
	mq_client.make_request('selectgroup_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.end(JSON.stringify(results.details));
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Select Group":"Fail"});
			}
		}  
	});}

function add_member(req,res)
{
	var username=req.param("membername");
	var id=req.session.uid;
	console.log(req.session.groupname);
	var groupname=req.session.groupname;
	var msg_payload = { "username": username, "groupname":groupname,};
	
	console.log("In POST Request = UserName:"+ username+" groupadd");
	
	mq_client.make_request('addmember_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.render("selectgroup",{title:"member added"});
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Member Add":"Fail"});
			}
		}  
	});

}
function remove_member(req,res)
{
	var username=req.param("membername");
	var id=req.session.uid;
	console.log(req.session.groupname);
	var groupname=req.session.groupname;
	var msg_payload = { "username": username, "groupname":groupname,};
	
	console.log("In POST Request = UserName:"+ username+" groupadd");
	
	mq_client.make_request('removemember_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.render("selectgroup",{title:"member removed"});
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"Member Removel":"Fail"});
			}
		}  
	});

}

function add_friend(req,res)
{
	var tousername=req.param("email");
	var fromusername=req.session.username;
	var msg_payload = { "fromusername": fromusername, "tousername":tousername};
	
	console.log("In POST Request = UserName:"+ fromusername+" friend add"+tousername);
	
	mq_client.make_request('addfriend_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.render("friend",{msg:"Friend Request Sent"});
				
			}
			else {    
				
				console.log("Invalid Friends REquest");
				res.render("friend",{msg:"Friend Request Not Sent"});
			}
		}  
	});

}

function get_friends(req,res)
{
	var username=req.session.username;
	var uid=req.session.uid;
	var msg_payload = { "username": username,"uid":uid};

	
	console.log("In POST Request = UserName:"+ username+" group");
	
	mq_client.make_request('getfriends_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.end(JSON.stringify(results.details));
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"friends":"Fail"});
			}
		}  
	});}

function response_friends(fname,value,uid,user)
{
	console.log("....................................."+value);
	var msg_payload = { "id": uid, "value":value, "fname":fname, "user":user};
	
	console.log("In POST Request = UserName:"+ value+" friend response"+fname);
	
	mq_client.make_request('responsefriends_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				console.log(results.details);
				res.render("friend",{msg:"Friends"});
				
			}
			else {    
				
				console.log("Invalid Friends REquest");
				res.render("friend",{msg:"Friend Request Not Sent"});
			}
		}  
	});

}

function getrequest_friends(req,res)
{
	var username=req.session.username;
	
	var msg_payload = { "username": username};

	
	console.log("In POST Request = UserName:"+ username+" group");
	
	mq_client.make_request('getrequestfriends_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid request");
				console.log(results.details);
				res.end(JSON.stringify(results.details));
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"friends":"Fail"});
			}
		}  
	});}

//exports.sign_in=sign_in;
exports.getrequest_friends=getrequest_friends;
exports.response_friends=response_friends;
exports.get_friends=get_friends;
exports.add_friend=add_friend;
exports.remove_member=remove_member;
exports.add_member=add_member;
exports.select_group=select_group;
exports.add_group=add_group;
exports.view_group=view_group;
exports.delete_group=delete_group;
exports.success_addnews=success_addnews;
exports.success_loginnews=success_loginnews;
exports.remove_interest=remove_interest;
exports.success_logininterest=success_logininterest;
exports.add_interest=add_interest;
exports.sign_up=sign_up;
exports.edit_about=edit_about;
exports.after_sign_in=after_sign_in;
exports.success_loginabout=success_loginabout;
exports.fail_login=fail_login;