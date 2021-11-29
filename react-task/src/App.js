import './App.css';
import { useState, useEffect } from 'react';
import { AppTitle } from './Components/AppTitle';
import { AppSearch } from './Components/AppSearch';
import { AllTask, CreateTask, DeleTask, setToken } from './Services/Task';
import { AppItems } from './Components/AppItems'
import { AppLogin } from './Components/AppLogin';
import LoginService from './Services/Login'

function App() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    AllTask()
    .then(res => {
      setItems(res.data)
    })
  }, [])

 useEffect(() => {
   const LoggerUserJSON = window.localStorage.getItem('LoggerTaskAppUser')
   if (LoggerUserJSON) {
    const users = JSON.parse(LoggerUserJSON)
    setUser(users)
    setToken(users.token)
  }
 }, [])
 

  const handleChange = (e) => {
      let task = e.target.value
      setValue(task)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      CreateTask(value)
      .then(res => {
        console.log(res.data)
        setItems(items => items.concat(res.data))
      })
  }

  const handleClick = (id) => {
    DeleTask(id)
    .then(res => {
      setItems(items.filter(el => el.id !== id))
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = await LoginService.Login({
        username,
        password
    })

    window.localStorage.setItem(
        'LoggerTaskAppUser', JSON.stringify(user)
    )

    console.log(user)
    setToken(user.token)
    setUser(user)
    
}

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('LoggerTaskAppUser')
  }

  return (
    <>
    <div className="App">

      <AppTitle/>
      {
        user === null
        ? <AppLogin
        Login={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      : <AppSearch
        logout={handleLogout}
        change={handleChange}
        submit={handleSubmit}
      />
      }
      

      {
        user === null
        ? ''
        : items.map(res => (
          <AppItems
            click={() => handleClick(res.id)}
            {...res}
          />
        ))
      }


    </div> 
    </>
  );
}

export default App;
