import '../Styles/AppSearch.css'

const AppSearch = ({ change, submit, logout }) => {
    return(
        <>
            <form
            className='form'
            onSubmit={submit}>
                <input
                className='input'
                onChange={change} 
                placeholder='task'
                type='text'/>
                <button
                className='button'>Enviar</button>
                <button onClick={logout}>Logout</button>
            </form>
        </>
    )
}

export {AppSearch}