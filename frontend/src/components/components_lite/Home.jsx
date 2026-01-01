import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './Footer'

const Home = () => {
  return (
    /* Updated styling: 
       - bg-black as base
       - bg-[radial-gradient] adds a subtle violet/red glow from the top center 
    */
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black antialiased">
      
      <div className="relative">
        {/* Optional: Add a very faint noise or grid texture to the gradient */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
        
        <Header />
        <CategoryCarousel />
        <LatestJob />
        <Footer/>
      </div>
    </div>
  )
}

export default Home