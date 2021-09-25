import React,{useState,useEffect} from "react";
import Create from "./Create";
import ListItem from "./ListItem";
import FooterNav from "./FooterNav";
import NavCategoryMini from "./NavCategoryMini";
import axios from "axios";
import Logout from "./Logout";

function Todo(props) {
	const [[create,placeholder,list,active,visited], setCreate]=useState(["","Create a new todo...",[],0,false]);
	const [def,setDefault]=useState("all");
	useEffect(() => {
		if(!visited) {
		fetch("/notes/user/"+localStorage.getItem("user")+"/password/"+localStorage.getItem("pass")).then(res => {
			if(res.ok)
				return res.json()
		}).then(jsonRes => {
			const obj=jsonRes[0];
			setCreate([create,placeholder,obj.list,obj.active,true]);
		})
	}});
	
	async function handleCreate() {
		if(create==="")
		{
			return;
		}
		list.unshift({
		message: create,
		check: "unchecked"
		});
		const det={user:localStorage.getItem("user"),password: localStorage.getItem("pass"),list: list,active: active+1}
		axios.post('http://localhost:3001/create',det);
		setCreate(["","Create a new todo...",list,active+1,true]);
	}
	async function handleChange(e) {
    var value=e.target.value;
    setCreate([value,placeholder,list,active,true]);
  }
  
  async function handleKey(e) {
    var key=e.key;
    if(key==="Enter")
    {
        list.unshift({
          message: create,
          check: "unchecked"
        });
		const det={user:localStorage.getItem("user"),password: localStorage.getItem("pass"),list: list, active: active+1}
		axios.post('/update',det).then(response => {if(response.ok){console.log(response.json())}});
        setCreate(["","Create a new todo...",list,active+1,true]);
    }
    else
        setCreate([create,"Currently typing ",list,active,true])
  }  
  
  async function handleCheck(e){
      var id=e.target.name;
      var act;
      if(list[id].check==="checked")
      {
        act=active+1;
        list[id].check="unchecked";
      }
      else
      {
        act=active-1;
        list[id].check="checked";
      }
	  const det={user:localStorage.getItem("user"),password: localStorage.getItem("pass"),list: list, active: act};
      axios.post('/update',det).then(response => {if(response.ok){console.log(response.json())}});
      setCreate([create,placeholder,list,act,true]);
  }
  
	async function handleDelete(e) {
		var id=e.target.name;
		var el=list.splice(id,1);
		var act=active;
		if(el[0].check==="unchecked")
			act-=1;
		const det={user:localStorage.getItem("user"),password: localStorage.getItem("pass"),list: list, active: act};
		axios.post('/update',det).then(response => {if(response.ok){console.log(response.json())}});
		setCreate([create,placeholder,list,act,true]);
	}
  
	async function clearCompleted() {
		var temp=list,i=0;
		while(i<temp.length)
		{
			if(temp[i].check==="checked")
			temp.splice(i,1);
			else
			i++;
		}
		const det={user:localStorage.getItem("user"),password: localStorage.getItem("pass"),list: temp, active: active};
		axios.post('/update',det).then(response => {if(response.ok){console.log(response.json())}});
		setCreate([create,placeholder,temp,active,true]);
	}
  
	function changeDefault(e) {
		var value=e.target.name;
		setDefault(value);
	}
	return <div>
		<div className={"todo "+props.theme}>
        <Create theme={props.theme} handleCreate={handleCreate} placeholder={placeholder} create={create} setCreate={setCreate} list={list} active={active} handleChange={handleChange} handleKey={handleKey} />
        <div className={"List "+props.theme}>
          {list.map(function(element,i) {
              if(def==="all")
                return <ListItem i={i} theme={props.theme} check={element.check} handleCheck={handleCheck} message={element.message} handleDelete={handleDelete} />;
              else if(def==="active" && element.check==="unchecked")
                return <ListItem i={i} theme={props.theme} check={element.check} handleCheck={handleCheck} message={element.message} handleDelete={handleDelete} />;
              else if(def==="completed" && element.check==="checked")
                return <ListItem i={i} theme={props.theme} check={element.check} handleCheck={handleCheck} message={element.message} handleDelete={handleDelete} />;
              return "";
          })}
          <FooterNav theme={props.theme} active={active} def={def} changeDefault={changeDefault} clearCompleted={clearCompleted} />
        </div>
        <NavCategoryMini theme={props.theme} def={def} changeDefault={changeDefault} />
      </div>
	  <Logout />
	</div>
}

export default Todo;