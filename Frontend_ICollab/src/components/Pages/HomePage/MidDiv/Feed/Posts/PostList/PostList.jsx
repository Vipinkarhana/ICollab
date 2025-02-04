import React from 'react'
import PostCard from "../Postcard/PostCard"
function PostList() {
  const text = `Lorem ipsumdolor

sit amet consectetur adipisicing elit.Dolorem delectus accusantium quia non.Labore sitab quos error veniam ratione sunt facere quisquam doloribus ex autem est ad magni ea, illum deleniti necessitatibus

eius, officiis nihil eaque molestias dicta quaerat.Impedit id delectus eligendi explicabo iste deserunt maiores unde reprehenderit ? Delectus autem saepe nesciunt corrupti nam, aspernatur aperiam a maiores adipisci, soluta aliquid sapiente beatae voluptatibus ducimus error.Similique, delectus ? 
   
Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit tenetur at delectus, quibusdam aliquam, porro dolor nesciunt id assumenda ipsum voluptatibus facilis pariatur officiis dolore quam reiciendis nobis accusamus corrupti sint laboriosam? Earum nulla blanditiis facere officiis aliquid magni cumque debitis, maxime sed accusamus velit molestias sapiente voluptatibus, minus non rem incidunt obcaecati est veritatis ut. Sequi soluta nihil omnis quasi ipsa incidunt officia, cum dolorem rem! Voluptatum esse magnam excepturi ad reiciendis neque, cupiditate ut molestiae, delectus quibusdam voluptate nisi qui, dignissimos voluptatibus corporis dolore corrupti possimus quam eligendi. Delectus quis modi nisi. Provident tenetur commodi, reprehenderit eos accusamus blanditiis mai
   
ores veniam possimus voluptatem nihil debitis pariatur itaque culpa adipisci, voluptatum quibusdam delectus ipsam harum molestias iste quidem qui facere perspiciatis! Delectus sunt eos, aliquam, voluptatem placeat adipisc
   
i tempora tempore ut, necessitatibus maxime culpa mollitia repellat iure! Fugit placeat tenetur, sint atque vel ex commodi laudantium eveniet, blanditiis iusto ipsum magnam id quas aut quidem nam. Cumque ex rerum illum, eveniet aliquid modi corporis aspernatur hic dolores recusandae, doloribus deleniti animi magnam dolore quis ut dolorem architecto? Libero earum impedit veniam? Sunt exercitationem ratione nam ipsum maxime, distinctio dolor a, et eveniet facere blanditiis cupiditate dolore voluptatum veritatis, eos voluptatem voluptatibus ullam saepe quos? Voluptatum qui incidunt illo, iste quod voluptas maiores ex soluta rem quae ducimus reprehenderit ipsa dolorem officiis similique blanditiis vitae dignissimos aut ut nam, atque perspiciatis placeat tenetur? Odio ipsum officia aperiam eius deserunt ex distinctio mollitia, unde, consequatur omnis in maiores doloremque, quis sapiente?`;
  return (
    <div className='h-[70svh] w-[99%] border overflow-y-auto scroll-auto scrollbar-hide px-4 '>
      <PostCard text={text}/>
      <PostCard text={text}/>
      <PostCard text={text}/>
    </div>
  )
}

export default PostList
