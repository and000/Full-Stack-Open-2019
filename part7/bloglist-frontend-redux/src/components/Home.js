import React from 'react'

import BlogList from './BlogList'

import CreateContainer from './CreateContainer'



const Home = () => {
  return (
    <>
      <div>
        <CreateContainer />

        <hr />
        <BlogList />
      </div>
    </>
  )
}



export default Home