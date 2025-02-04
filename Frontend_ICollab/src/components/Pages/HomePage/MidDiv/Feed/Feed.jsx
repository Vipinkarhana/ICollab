import React from 'react'
import Filter from './Filter/Filter'
import PostList from './Posts/PostList/PostList'

function Feed() {
  return (
    <div className='flex flex-col justify-around items-center h-auto w-full gap-1'>
      <Filter />
      <PostList/>
    </div>
  )
}

export default Feed
