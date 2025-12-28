import React, { useState } from 'react'
import './App.css'
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState();

  const handleFormSubmit = async (e) =>{
    e.preventDefault();

    const response = await axios.get('https://api.github.com/users/' + username)
    console.log(response);
    setUserInfo(response.data)
    
  }
  return (
    <div>
      <div className="container">
        <h1 className='heading'>Github Wrapper</h1>
        <form className='formCard' onSubmit={handleFormSubmit}>
          <input type='text' value={username} onChange={e => {
            setUsername(e.target.value)
            if(e.target.value === "") setUserInfo(null);
          }}/>
          <button>Search</button>
        </form>
        {userInfo && (<div className='userDetailCard'>
           <div className='userDetailBody'>
            <p className='name'>{userInfo.name}</p>
            <em className='username'>{userInfo.login}</em>
            <div className='follow'>
               <p>{userInfo.followers}</p>
               <p>{userInfo.following}</p>
            </div>
            <div className='prof'>
              <p>{userInfo.company}</p>
              <p>{userInfo.bio}</p>
            </div>
           </div>
           <div className="userImage">
            <img src={userInfo.avatar_url} alt=''/>
           </div>
        </div>)}
      </div>
    </div>
  )
}

export default App