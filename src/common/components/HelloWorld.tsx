import React from 'react'

function HelloWorld() {
    const handleClick = () => {
        alert('clicked');
    }

    return (
        <div>
            <h4>Hello World..</h4>
            <button onClick={handleClick}>Click Me</button>
        </div>
    )
}

export default HelloWorld