import React, { useState } from "react";

function Survey() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You selected: ${selectedOption}`);
  };

  return (
    <div>
      <h2>Feature Survey</h2>
      <form onSubmit={handleSubmit}>
        <p>Which feature would you like to be added to the website?</p>
        <div>
          <input
            type="radio"
            id="feature1"
            name="feature"
            value="Feature 1"
            checked={selectedOption === "Feature 1"}
            onChange={handleOptionChange}
          />
          <label htmlFor="feature1">Feature 1</label>
        </div>
        <div>
          <input
            type="radio"
            id="feature2"
            name="feature"
            value="Feature 2"
            checked={selectedOption === "Feature 2"}
            onChange={handleOptionChange}
          />
          <label htmlFor="feature2">Feature 2</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Survey;
