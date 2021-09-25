import React from 'react';
import {useHistory} from 'react-router-dom';

function Logout(props) {
	let history=useHistory();
	
	function handleClick() {
		localStorage.setItem("user",null);
		localStorage.setItem("pass",null);
		history.push("/")
	}
	
	return<div className="logout">
		<button className="btnPush" onClick={handleClick}>
			<p className="btn-text"><b>Sign out</b></p>
		</button>
	</div>
}

export default Logout;