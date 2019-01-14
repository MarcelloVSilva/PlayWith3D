import React from 'react'
import "./Header.css"

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <div>First Play With THREE.JS</div>
                <ul>
                    <li>Zoom</li>
                    <li>Pause</li>
                </ul>
            </div>
        )
    }
}

export default Header