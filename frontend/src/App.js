import Background from "./Background";
import Todo from "./Todo";
import Header from "./Header";
import React,{useState} from "react";
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import Login from "./Login";

function App() {
  const [theme,setTheme]=useState("dark");
  function toggleTheme() {
    var t;
    if(theme==="light")
      t="dark";
    else
      t="light";
    setTheme(t);
  }
  
  return (
    <div className="App">
      <Background theme={theme} />
      <div className={"body "+theme}></div>
      <div className="foreground">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Router>
          <Switch>
            <Route path={"/todo"}>
  {localStorage.getItem("user")===null || localStorage.getItem("user")==="null"?(<Redirect to={{pathname: "/"}}/>):(<Todo theme={theme} />)}
            </Route>
            <Route exact path={"/"}>
              <Login />
            </Route>
            <Route path={"*"}>
              No page Found
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
