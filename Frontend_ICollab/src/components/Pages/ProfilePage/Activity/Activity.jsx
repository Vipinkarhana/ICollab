import React,{useState} from 'react'
import { Pencil, MoveRight } from "lucide-react";
import PostCard from "../../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import test1 from "../../../../assets/test.png";
import test2 from "../../../../assets/test2.png";
import testvedio from "../../../../assets/TestVedio.mp4";
import StartPostModal from "../../HomePage/MidDiv/Feed/Posts/StartPost/StartPostModal";
function Activity() {
  const [isOpen, SetIsOpen] = useState(false);
  console.log(isOpen);
  const media1 = [test1, test2];
  const media2 = testvedio;

  const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque,
laboriosam eos, mollitia atque officia
    
soluta odit fugiat aliquam sit quisquam natus deserunt error? Accusamus, voluptatibus ad! Debitis, repellat harum quis obcaecati ipsum laboriosam animi quas laudantium ipsa. Nam quibusdam atque maiores odit cum optio repellendus.
  
In, ipsum nam laudantium distinctio suscipit unde cumque deserunt. Esse dolorum iste doloremque voluptate aliquam. Nisi expedita labore iusto modi exercitationem dolorum, sunt explicabo debitis necessitatibus, magni repellat quo sequi quibusdam itaque libero quae adipisci cumque? Aspernatur, quas? Culpa, beatae similique obcaecati dolorem atque quidem eius nobis quia quisquam minus. Fugit laboriosam illo libero voluptatibus.`;
  return (
    <div className="w-[100%] h-auto bg-gray-200 rounded-md flex flex-col justify-around items-center gap-2 text-gray-800 border border-gray-400">
      <div className="h-12 w-[100%] flex justify-between items-center py-2 px-4 border-b border-gray-400">
        <div className="text-2xl font-semibold  ">
          <p>Activity</p>
        </div>
        <div className="w-[18%]   flex   justify-center items-center gap-1">
          <button
            onClick={() => {
              SetIsOpen(true);
            }}
            className=" px-2 border-2 border-gray-500 rounded-2xl hover:bg-slate-300"
          >
            Create a post
          </button>
      {isOpen && <StartPostModal SetIsOpen={SetIsOpen} isOpen={isOpen} />}
        </div>
      </div>
      <div className="h-auto w-[80%] flex">
        <PostCard text={text} media={media1} />
      </div>
      <button className="flex gap-2 text-xl text-gray-900 border-t border-gray-400 w-[100%] justify-center items-center h-auto py-2">
        <p>Show More Posts</p>
        <MoveRight />
      </button>
    </div>
  );
}

export default Activity
