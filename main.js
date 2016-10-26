var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("index");
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server)
if (!conversation){
	var conversation = [];
}
io.sockets.on('connection', function (socket) {
	socket.on("formSub", function (data){
	    socket.emit("addName", data)
	    io.emit("addConvo", conversation)
	})
	socket.on("thisFormSub", function (data){
		conversation.push(data)
	    io.emit("addConvo", conversation)
	})
})