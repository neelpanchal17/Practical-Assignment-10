import React ,{useState} from 'react'

function LoginForm({Login,error}) {
    
    const [details,setDetails]=useState({username:"",password:""});

    const submitHandler = e =>{
        e.preventDefault(); 
        Login(details);
    }
    return (
            <center>
                 <h1>Task Tracker App</h1>
                 <br/>
                <h2>Login</h2>
                 <br/>
                 <form onSubmit={submitHandler}> 
                     <input type="text" placeholder='Enter Username' name='uname' id='username' onChange={e =>setDetails({...details, username : e.target.value})} value={details.username}></input>
                     <br></br>
                     <input type="password" placeholder='Enter Password' name='passwd' id='password' onChange={e =>setDetails({...details, password : e.target.value})} value={details.password}></input>
                     <br></br>
                     <input type="submit"></input>
                     <br/><br/>
                 {(error!=="") ? (<div className='error'>{error}</div>):""}
                 </form>
            </center>
    )
}
export default LoginForm;

