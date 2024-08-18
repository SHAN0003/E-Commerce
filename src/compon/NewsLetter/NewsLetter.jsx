import React from 'react'
import "./NewsLetter.scss"

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newslatter and stay updated</p>
      <div>
        <input type="emai" placeholder='Your Email Id' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
