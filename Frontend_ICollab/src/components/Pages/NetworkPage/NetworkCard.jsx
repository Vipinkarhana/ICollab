const NetworkCard = ({ person }) => {
    return (
      <div className="bg-white p-4 shadow-md rounded-md">
        <img
          src={person.img}
          alt={person.name}
          className="w-20 h-20 mx-auto rounded-full mb-2 border border-gray-300"
        />
        <h3 className="text-center font-bold">{person.name}</h3>
        <p className="text-center text-gray-600">{person.role}</p>
        <button className="w-full mt-2 bg-blue-500 text-white py-1 rounded">
          Collab
        </button>
      </div>
    );
  };
  
  export default NetworkCard;
  