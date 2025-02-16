import React, { useState } from "react";

function Survey() {
  const [selectedOption, setSelectedOption] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You selected: ${selectedOption}`);
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Survey
      </button>
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[40svw]">
            <span
              className="float-right text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-2xl mb-4 font-semibold">Feature Survey</h2>
            <form onSubmit={handleSubmit}>
              <p className="mb-4">
                Which feature would you like to be added to the website?
              </p>
              <div className="mb-2">
                <input
                  type="radio"
                  id="feature1"
                  name="feature"
                  value="Feature 1"
                  checked={selectedOption === "Feature 1"}
                  onChange={handleOptionChange}
                  className="mr-2 w-10"
                />
                <label htmlFor="feature1" className="text-lg font-semibold">Likes & Comments</label>
              </div>
              <div className="mb-4">
                <input
                  type="radio"
                  id="feature2"
                  name="feature"
                  value="Feature 2"
                  checked={selectedOption === "Feature 2"}
                  onChange={handleOptionChange}
                  className="mr-2 w-10"
                />
                <label htmlFor="feature2" className="text-lg font-semibold">Save & Edit</label>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </form>
            <p className="mt-4">From ICollab Development Team :<br />
              (Tanmay and Naman)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Survey;
