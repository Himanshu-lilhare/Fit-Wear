import "./Navbar.css"
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
 <nav>
    <div className="nav-wrapper">
        <div className="nav-head-wrapper">
            <h2 className="nav-head">
                Fit-Wear
            </h2>
        </div>
        <div className="nav-link-wrapper">
           <Link href={'/'}>
            Home
           </Link>
           <Link href={'/shop'}>
            Shop
           </Link>
           <Link href={'/Profile'}>
            profile
           </Link>
           <Link href={'/cart'}>
            Cart
           </Link>
        </div>
    </div>
 </nav>
  )
}

