var express = require("express"); // importing express package to your app
var app = express(); // crating an instance of express and storing into app variable
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todoapp", {useMongoClient:true});
var Task = require("./models/tasks.models.js");
var moment = require("moment");

app.use(bodyparser.urlencoded({extended:false})); 

//app.use(bodyparser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./assets"));
app.get("/", function(req, res){
    res.send("Hello TodoApp");
} );
// web page to display list of user tasks
app.get("/tasks", function(req,res){
    console.log(req.query);
   // res.send("list of tasks ");
   Task.find({}, [], {sort:{fromDate:1}} , function(err, results){
    res.render("allTasks", {tasks: results, dateFormater: moment});
   });
});
/*app.get("/task/:id", function(req,res){
    console.log(req.params);
    res.send("list of tasks with id "+req.params.id);
});
app.get("/task/:id/:name", function(req,res){
    console.log(req.params);
    res.send("list of tasks with id "+req.params.id);
});*/


// web page to display list of user tasks
app.get("/tasks", function(req,res){
    console.log(req.query);
    res.send("list of tasks "+ req.query.task_name);
});

// Web page to add a task 
app.get("/task/add", function(req,res){
	//res.send("task add page")
    	res.render("addTask");
});

// to add task into database
app.post("/task/add", function(req,res){
   console.log(req.body);
   let task = new Task();
   task.title = req.body.title;
   task.fromDate = moment(req.body.fdate).toDate();
   task.toDate = moment(req.body.tdate).toDate();
   task.notes = req.body.notes;

   task.save(function(err, result){
   if(!err){
    res.redirect("/tasks");
   }else{
    console.log(err);
   }

   });
  // res.send("task add via post request");
});

// to edit a task in database
app.get("/task/edit/:id", function(req,res){
    // write delete code here
});

// to edit a task in database
app.post("/task/save/:id", function(req,res){
    // write delete code here
});

// to delete a task in database 
app.post("/task/delete/:id", function(req,res){
    // write delete code here
});

// web page to show single task with id given as part of route URL 
app.get("/task/:id", function(req, res){
    console.log(req.params);
    res.send(" task - "+ req.params.id );
});


app.listen(3000, function(err){
    if(!err){
        console.log("app is listening at http://localhost:3000");
    }
});
