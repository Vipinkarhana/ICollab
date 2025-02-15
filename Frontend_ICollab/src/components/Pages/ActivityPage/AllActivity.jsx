import React from "react";
import PostCard from "../HomePage/MidDiv/Feed/Posts/Postcard/PostCard";
import media from "/public/ProfilePic.png";
function AllActivity() {
  const posts = [
    {
      text: "This is a post 1",
      media: media,
    },
    {
      text: "This is a post 2",
      media: media,
    },
    {
      text: "This is a post 3",
      media: media,
    },
  ]
  return (
    <div className="w-auto h-auto flex flex-col justify-start items-center gap-2 ">
        <div className="h-12 w-[100%] border-b border-gray-400 flex items-center px-4 text-2xl font-semibold">
            <p>All Activity</p>
      </div>
      <div className="h-auto w-[98%] flex flex-col justify-start items-center py-1 gap-1 ">
        {
          posts.map((post) => {
            return <PostCard text={post.text} media={post.media} />;
          })
        }
      </div>
    </div>
  );
}

export default AllActivity;
