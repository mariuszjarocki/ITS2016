var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var mime = require('mime');
var util = require('util');
var mongodb = require('mongodb');
var db = 'app1';
var co_users_name = 'users';
var co_sessions_name = 'sessions';
var co_students_name = 'students';
var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db(db, server, {});
var co_users = null;
var co_sessions = null;
var co_students = null;
var sessions = [];

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
  response.write('Błąd 404: plik nie został znaleziony.');
  response.end();
}

function send403(response) {
  response.writeHead(403, {'Content-Type': 'text/plain; charset=utf-8'});
  response.write('Błąd 403: dostęp zabroniony.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serveStatic(response, absPath) {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
			if(err) {
            send404(response);
          } else {
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
}

client.open(function (err) {
	if(err) throw err;
	client.collection(co_users_name, function(err, coll) {
		if(err) throw err;	
		co_users = coll;
	});
	client.collection(co_sessions_name, function(err, coll) {
		if(err) throw err;	
		co_sessions = coll;
	});
	client.collection(co_students_name, function(err, coll) {
		if(err) throw err;	
		co_students = coll;
	});
});

http.createServer().on('request', function (req, rep) {
	var session = req.headers['x-session-token'];
	console.log(req.method + ' ' + req.url + ' ' + session);
	if(req.url == '/') {
		serveStatic(rep, 'html/index.html');
	} else if(req.url == '/favicon.ico') {
		serveStatic(rep, 'html/favicon.ico');
	} else {
		if(/^\/(html|css|js|fonts)\//.test(req.url)) {
			serveStatic(rep, './' + req.url);
		} else if(/^\/user\//.test(req.url)) {
					var arg = req.url.slice(6);
					switch(req.method) {
						case 'GET':
							if(arg == '') {
								co_users.find().toArray(function (err, found) {
										if(err) throw err;
										rep.writeHead(200, {'Content-Type': 'application/json'});
										rep.end(JSON.stringify(found));
								});
							} else {
								if(arg.length < 12) {
									send403(rep);									
								} else {
									var o_id = new mongodb.ObjectID(arg);
									co_users.find({'_id': o_id}).toArray(function (err, found) {
											if(err) throw err;
											if(found.length > 0) {
												rep.writeHead(200, {'Content-Type': 'application/json'});
												rep.end(JSON.stringify(found[0]));
											} else {
												rep.writeHead(404, {'Content-Type': 'application/json'});
												rep.end('null');
											}
									});
								}								
							}
							break;
						case 'POST':
							var item = '';
							req.setEncoding('utf8');
							req.on('data', function(chunk) {
								item += chunk;
							});
							req.on('end', function() {
								var user = JSON.parse(item);
								co_users.insert(user, {'safe': true}, function (err, documents) { if(err) throw err; });
								rep.writeHead(200, {'Content-Type': 'application/json'});
								rep.end(JSON.stringify(user));
							});
							break;
						case 'DELETE':
							var o_id = new mongodb.ObjectID(arg);
							co_users.remove({'_id': o_id}, true);
							rep.writeHead(200, {'Content-Type': 'application/json'});
							rep.end('null');
							break;
						default:
							send403();
					}
		} else if(/^\/login\//.test(req.url)) {
					var arg = req.url.slice(7);
					switch(req.method) {
						case 'GET':
							if(sessions[session]) {
								rep.writeHead(200, {'Content-Type': 'application/json'});
								rep.end(sessions[session]);											
							} else {
								rep.writeHead(404, {'Content-Type': 'application/json'});
								rep.end('null');								
							}
							break;
						case 'POST':
							var item = '';
							req.setEncoding('utf8');
							req.on('data', function(chunk) {
								item += chunk;
							});
							req.on('end', function() {
								var loginData = JSON.parse(item);
								loginData.session = session;
								loginData.when = new Date();
								co_sessions.insert(loginData, {'safe': true}, function (err, documents) { if(err) throw err; });
								sessions[session] = loginData.name; 
								rep.writeHead(200, {'Content-Type': 'application/json'});
								rep.end(JSON.stringify(loginData));
							});
							break;
						default:
							send403();
					}			
		} else if(/^\/student\//.test(req.url)) {
					var arg = req.url.slice(9);
					switch(req.method) {
						case 'GET':
							if(arg == '') {
								co_students.find().toArray(function (err, found) {
										if(err) throw err;
										rep.writeHead(200, {'Content-Type': 'application/json'});
										rep.end(JSON.stringify(found));
								});
							} else {
								if(arg.length < 12) {
									send403(rep);									
								} else {
									var o_id = new mongodb.ObjectID(arg);
									co_students.find({'_id': o_id}).toArray(function (err, found) {
											if(err) throw err;
											if(found.length > 0) {
												rep.writeHead(200, {'Content-Type': 'application/json'});
												rep.end(JSON.stringify(found[0]));
											} else {
												rep.writeHead(404, {'Content-Type': 'application/json'});
												rep.end('null');
											}
									});
								}								
							}
							break;
						case 'POST':
							var item = '';
							req.setEncoding('utf8');
							req.on('data', function(chunk) {
								item += chunk;
							});
							req.on('end', function() {
								var student = JSON.parse(item);
								co_students.insert(student, {'safe': true}, function (err, documents) { if(err) throw err; });
								rep.writeHead(200, {'Content-Type': 'application/json'});
								rep.end(JSON.stringify(student));
							});
							break;
						case 'PUT':
							var item = '';
							req.setEncoding('utf8');
							req.on('data', function(chunk) {
								item += chunk;
							});
							req.on('end', function() {
								var student = JSON.parse(item);
								var o_id = new mongodb.ObjectID(student._id);
								co_students.update({_id: o_id}, { $set: { email: student.email, firstName: student.firstName, lastName: student.lastName}}, 	function (err, documents) { if(err) throw err; });
								rep.writeHead(200, {'Content-Type': 'application/json'});
								rep.end(JSON.stringify(student));
							});
							break;
						case 'DELETE':
							var o_id = new mongodb.ObjectID(arg);
							co_students.remove({'_id': o_id}, true);
							rep.writeHead(200, {'Content-Type': 'application/json'});
							rep.end('null');
							break;
						default:
							send403();
					}
		} else if(/^\/students\//.test(req.url)) {
					var arg = req.url.slice(10);
					switch(req.method) {
						case 'GET':
							var parsed = url.parse(req.url, true).query;
							var limit = parseInt(parsed.limit); if(limit <= 0 || limit == NaN) limit=10; 
							var skip = parseInt(parsed.skip); if(skip < 0 || skip == NaN) skip = 0;
							var search = parsed.search || '';
							var q = co_students.find({$or: [{ firstName: { $regex: search, $options: 'i' }}, { lastName: { $regex: search, $options: 'i' }}]}).limit(limit).skip(skip);
							q.count(false).then(
								function(nRecords) {
									q.toArray(function (err, found) {
										if(err) throw err;
										rep.writeHead(200, {'Content-Type': 'application/json', 'X-Records': nRecords});
										rep.end(JSON.stringify(found));
									});
								},
								function() {}
							);
							break;
						default:
							send403();
					}
					
		} else {	
			send403(rep);
		}
	}
}).listen(8000);