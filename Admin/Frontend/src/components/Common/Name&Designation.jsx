const Name_Designation = ({ name, designation }) => {
  return (
    <div className="ml-2">
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-xs text-gray-500">{designation || "User"}</p>
    </div>
  );
};

export { Name_Designation };
