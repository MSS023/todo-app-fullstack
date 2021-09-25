import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Login(props) {
	const [[user,pass],setUser]=useState(["",""]);
	let history=useHistory();
	function handleUser(e) {
		setUser([e.target.value,pass]);
	}
	
	function handlePass(e) {
		setUser([user,e.target.value]);
	}
	
	function handleClick(){
		axios.post("/login",{user:user,password: pass})
		.then(response => {
			return response.data;
		}).then(resp => {
			const dat=resp;
			if(dat.status==="Success")
			{
				localStorage.setItem("user",user);
				localStorage.setItem("pass",pass);
				history.push("/todo");
			}
			else
				alert("please try again");
		});
	}
	function handleClick2(){
		axios.post("/register",{user:user,password: pass})
		localStorage.setItem("user",user);
		localStorage.setItem("pass",pass);
		history.push("/todo");
	}
	
	return<div className="login">
		<input className="btn-text" value={user} onChange={handleUser} placeholder="Username" />
		<input className="btn-text" type="password" value={pass} onChange={handlePass} placeholder="Password" />
		<button className="btnPush" onClick={handleClick}>
			<p className="btn-text"><b>Sign in</b></p>
		</button>
		<button className="btnPush" onClick={handleClick2}>
			<p className="btn-text"><b>Register</b></p>
		</button>
	</div>
}

export default Login;