import React from 'react'
import Card from '../Components/Card'
import Navbar from '../Components/Navbar'

function Home() {
  return (
    <div className='flex-1 bg-gray-100'>
        <Navbar />
        <div className='grid md:grid-cols-2 grid-cols-1 max-w-5xl mx-auto min-h-full'>
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    </div>
  )
}

export default Home