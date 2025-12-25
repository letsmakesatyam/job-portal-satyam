import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <h1>
            Job <span>Portal</span>
        </h1>
        <div>
            <ul>
                <li><Link>Home</Link></li>
                <li><Link>Browse</Link></li>
                <li><Link>Job</Link></li>
                
            </ul>
        </div>
    </div>
  )
}

export default Navbar