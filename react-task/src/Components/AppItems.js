import '../Styles/AppItems.css'

const AppItems = ({ content, click }) => {
    return (
        <>
            <div className='boxitem'>
                <h4 
                className='item'
                >{content}</h4>
                <button
                className='delete' 
                onClick={click}>X</button>
            </div>
        </>
    )
}

export { AppItems }