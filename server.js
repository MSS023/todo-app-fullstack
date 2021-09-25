require('dotenv').config()
const express = require("express");
const app=express();
const router=express.Router();
const cors=require("cors");
const mongoose=require("mongoose");
const PORT=process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(router);
mongoose.connect('mongodb+srv://admin-manan:'+process.env.PASS+'@cluster0.r8bar.mongodb.net/todoApp?retryWrites=true&w=majority');
var list=[{
		message: "Welcome to TODO App",
		check: "unchecked"
	},
	{
		message: "Click on Sun/Moon above to toggle theme ^",
		check: "unchecked"
	},
	{
		message: "<- Click on this button to mark as completed",
		check: "unchecked"
	},
	{
		message: "Click on this button to delete this note ->",
		check: "unchecked"
	}
	];
var active=4;
var todoSchema={user: String,
	password: String,
	list: [{message: String, check: String}],active: Number};
var Todo=mongoose.model("Todo",todoSchema);
app.route("/login").post((req,res) => {
	var user=req.body.user;
	var password=req.body.password;
	Todo.find({user: user,password: password},(err,todo) => {
		if(err)
			console.log(err);
		else if(todo.length==0)
		{
			return res.json({status: "Failure"});			
		}
		else
		{
			return res.json({status: "Success"});
		}
	});
});

app.route("/register").post((req,res) => {
	var user=req.body.user;
	var password=req.body.password;
	Todo.find({user: user,password: password},(err,todo) => {
		if(err)
			console.log(err);
		else if(todo.length==0)
		{
			var obj=new Todo({user: user,password: password,list: list,active: active});
			obj.save();			
		}
	})
});

app.route("/notes/user/:user/password/:password").get((req,res) => {
	Todo.find({user: req.params.user,password: req.params.password})
		.then(foundNotes => res.json(foundNotes))
});

app.route("/update").post((req,res) => {
	const user=req.body.user;
	const password=req.body.password;
	const li=req.body.list;
	const act=req.body.active;
	Todo.findOneAndUpdate({user: user,password: password},{user:user,password:password,list:li,active:act},(err,todo) => {
		if(err)
			console.log(err);
		else
			return res.json({done: "done"});
	})
});

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get("*",(req,res) => {
		res.sendFile(path.resolve(__dirname, "frontend","build","index.html"))
	})
}

app.listen(PORT,function() {
	console.log("Server is running on port 3001");
});