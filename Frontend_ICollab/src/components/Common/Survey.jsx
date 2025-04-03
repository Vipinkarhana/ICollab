/**
 * @file Survey.js
 * @brief A modal survey form for collecting user feedback on new features.
 * @details This component displays a survey modal asking users to choose between
 *          different feature requests. The selected response is sent to the server.
 *          The survey appears only if the user hasn't submitted it before.
 * @author ICollab Development Team
 * @date 2025-02-20
 */

import React, { useState, useEffect } from "react";
import privateAxios from "../../Services/apiService";

/**
 * @class Survey
 * @brief A modal survey form component.
 * @returns {JSX.Element | null} The Survey component or null if the survey is already submitted.
 */
function Survey() {
  const [selectedOption, setSelectedOption] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /**
   * @brief Initializes survey state on component mount.
   * @details Checks if the survey has been submitted before using local storage.
   *          If not, the survey modal is displayed.
   */
  useEffect(() => {
    localStorage.removeItem("Survey1");
    // const surveyStatus = localStorage.getItem("Survey1");
    // if (!surveyStatus) {
    //   localStorage.setItem("Survey1", "NotSubmitted");
    //   setModalIsOpen(true);
    // } else if (surveyStatus === "NotSubmitted") {
    //   setModalIsOpen(true);
    // } else {
    //   setModalIsOpen(false);
    // }
  }, []);

  /**
   * @brief Handles the change event for radio input selection.
   * @param {Event} event The change event.
   */
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  /**
   * @brief Handles survey form submission.
   * @details Saves the survey status in local storage and sends the selected answer to the backend API.
   * @param {Event} event The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      localStorage.setItem("Survey1", "Submitted");
      await privateAxios.post("/announcement/survey", {
        answer: selectedOption,
      });
    } catch (error) {
      console.log("Survey Form Submit Error: ", error);
    }
    setModalIsOpen(false);
  };

  /**
   * @brief Closes the survey modal without submitting.
   */
  const handleClose = () => {
    setModalIsOpen(false);
  };

  if (true) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded shadow-lg w-[40svw]">
        <span
          className="float-right text-xl cursor-pointer"
          onClick={handleClose}
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
              value="Likes & Comments"
              checked={selectedOption === "Likes & Comments"}
              onChange={handleOptionChange}
              className="mr-2 w-10"
            />
            <label htmlFor="feature1" className="text-lg font-semibold">
              Likes &amp; Comments
            </label>
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="feature2"
              name="feature"
              value="Edit & Delete"
              checked={selectedOption === "Edit & Delete"}
              onChange={handleOptionChange}
              className="mr-2 w-10"
            />
            <label htmlFor="feature2" className="text-lg font-semibold">
              Edit &amp; Delete
            </label>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </form>
        <p className="mt-4">
          From ICollab Development Team
          <br />
          (Ayush, Tanmay and Naman)
        </p>
      </div>
    </div>
  );
}

export default Survey;
