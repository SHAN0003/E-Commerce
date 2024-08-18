import React from 'react'
import Hero from '../compon/Hero/Hero'
import NewCollection from '../compon/NewCollections/NewCollection'
import Offers from '../compon/Offers/Offers'
import Popular from '../compon/Popular/Popular'
import NewsLetter from '../compon/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollection />
      <NewsLetter />
    </div>
  )
}

export default Shop
