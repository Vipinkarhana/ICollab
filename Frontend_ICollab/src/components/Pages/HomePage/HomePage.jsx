import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftDiv from "./LeftDiv/LeftDiv";
import MidDiv from "./MidDiv/MidDiv";
import RightDiv from "./RightDiv/RightDiv";
import Survey from "../../Common/Survey";
import WelcomeModal from "../Login_RegistrationPages/WelcomeModal";
import ProfileCheckList from "./RightDiv/ProfileStatus/ProfileCheckList";

const HomePage = () => {
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

  const handleSkip = () => {
    setShowModal(false);
  };

   const handleNext = () => {
    setShowModal(false);
    navigate("/profile/edit"); 
  };

  return (
    <>
      <div className="w-[100svw] mt-16 flex flex-col items-center  justify-center gap-3 md:flex-row md:items-start lg:justify-evenly p-2">
        {/* <Survey /> */}
        {showModal && <WelcomeModal onClose={handleSkip} onNext={handleNext} />}
        <LeftDiv className="hidden lg:flex lg:w-[20%]"/>
        <MidDiv className="sm:w-[95%] md:w-[95%] lg:w-[50%]"/>
        <RightDiv className="hidden lg:block" />
        <ProfileCheckList className="hidden lg:block" />
      </div>
    </>
  ); 
  
}

export default HomePage;