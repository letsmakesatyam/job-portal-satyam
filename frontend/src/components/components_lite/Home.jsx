import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import CategoryCarousel from './CategoryCarousel'

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      
      <Header />
      <CategoryCarousel />
    </div>
  )
}

export default Home