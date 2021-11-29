import '../Styles/AppLogin.css'

const AppLogin = ({ username, setUsername, password, setPassword, Login }) => {

        

    return (
        <>
            <form
            className='formLogin'
            onSubmit={Login}>
                <input
                    className='inputLogin'
                    type='text'
                    value={username}
                    placeholder='username'
                    onChange={({target}) => setUsername(target.value)}
                />
                <input
                    className='inputLogin'
                    type='password'
                    value={password}
                    placeholder='password'
                    onChange={({target}) => setPassword(target.value)}
                />
                <button className='buttonLogin'>Login</button>
            </form>
        </>
    )
}

export { AppLogin }