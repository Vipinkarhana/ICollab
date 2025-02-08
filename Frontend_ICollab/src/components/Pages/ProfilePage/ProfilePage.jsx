import React,{useState} from "react";

import ProfileCard from "./ProfileCard/ProfileCard";
import AboutDiv from "./AboutDiv/AboutDiv";
import Activity from "./Activity/Activity";
import Experiences from "./Experiences/Experiences";
const ProfilePage = () => {
  
  
  const text =
`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque,
laboriosam eos, mollitia atque officia
    
soluta odit fugiat aliquam sit quisquam natus deserunt error? Accusamus, voluptatibus ad! Debitis, repellat harum quis obcaecati ipsum laboriosam animi quas laudantium ipsa. Nam quibusdam atque maiores odit cum optio repellendus.
  
In, ipsum nam laudantium distinctio suscipit unde cumque deserunt. Esse dolorum iste doloremque voluptate aliquam. Nisi expedita labore iusto modi exercitationem dolorum, sunt explicabo debitis necessitatibus, magni repellat quo sequi quibusdam itaque libero quae adipisci cumque? Aspernatur, quas? Culpa, beatae similique obcaecati dolorem atque quidem eius nobis quia quisquam minus. Fugit laboriosam illo libero voluptatibus.`;
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);
    const words = text.split(" ");
    const wordLimit = 30;
    const textToDisplay = isFullTextVisible
      ? text
      : words.slice(0, wordLimit).join(" ");
  return (
    <div className="w-[100%] h-auto  mt-12 py-1 flex justify-center gap-2">
      <div className="w-[55%] h-auto  p-2 flex flex-col gap-4 ">
        <ProfileCard />
        <AboutDiv text={text} />
        <Activity />
        <Experiences/>
      </div>
      <div className="w-[20%]  bg-gray-200 rounded-md"></div>
    </div>
  ); 
  
}

export default ProfilePage;