const ProfilePic = ({ picture }) => {
    return (
      <img
        src={picture}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    );
  };
  
  export { ProfilePic};
  