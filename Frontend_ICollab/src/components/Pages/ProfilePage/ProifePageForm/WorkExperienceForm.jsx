import { useState } from "react";

function WorkExperienceForm() {
  const [experiences, setExperiences] = useState([
    {
      employer: "",
      role: "",
      fromMonth: "",
      fromYear: "",
      toMonth: "",
      toYear: "",
      description: "",
      currentlyWorking: false,
    },
  ]);
  const [noExperience, setNoExperience] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        employer: "",
        role: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        description: "",
        currentlyWorking: false,
      },
    ]);
  };

  const deleteExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  const toggleCurrentlyWorking = (index) => {
    const updated = [...experiences];
    updated[index].currentlyWorking = !updated[index].currentlyWorking;
    if (updated[index].currentlyWorking) {
      updated[index].toMonth = "";
      updated[index].toYear = "";
    }
    setExperiences(updated);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

  return (
    <div className="sm:p-6 p-4 bg-white rounded-xl shadow-md space-y-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold">Work Experience</h2>

      <label className="flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          checked={noExperience}
          onChange={() => setNoExperience(!noExperience)}
          className="accent-blue-600"
        />
        I have no prior work experience
      </label>

      {!noExperience &&
        experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-gray-200 p-5 rounded-xl space-y-6"
          >
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700">Employer</label>
              <input
                type="text"
                value={exp.employer}
                onChange={(e) =>
                  handleChange(index, "employer", e.target.value)
                }
                className="mt-1 w-full border rounded-md px-3 py-2 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) =>
                  handleChange(index, "role", e.target.value)
                }
                className="mt-1 w-full border rounded-md px-3 py-2 placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <select
                value={exp.fromMonth}
                onChange={(e) =>
                  handleChange(index, "fromMonth", e.target.value)
                }
                className="w-full border rounded-md px-1 text-sm py-2"
              >
                <option value="">From Month</option>
                {months.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>

              <select
                value={exp.fromYear}
                onChange={(e) =>
                  handleChange(index, "fromYear", e.target.value)
                }
                className="w-full border rounded-md px-1 text-sm py-2"
              >
                <option value="">From Year</option>
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>

              {!exp.currentlyWorking && (
                <>
                  <select
                    value={exp.toMonth}
                    onChange={(e) =>
                      handleChange(index, "toMonth", e.target.value)
                    }
                    className="w-full border rounded-md text-sm px-1 py-2"
                  >
                    <option value="">To Month</option>
                    {months.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>

                  <select
                    value={exp.toYear}
                    onChange={(e) =>
                      handleChange(index, "toYear", e.target.value)
                    }
                    className="w-full border rounded-md px-1 text-sm py-2"
                  >
                    <option value="">To Year</option>
                    {years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={() => toggleCurrentlyWorking(index)}
                className="accent-blue-600"
              />
              Currently working here
            </label>

            <textarea
              rows={4}
              placeholder="Description of your role/responsibilities"
              value={exp.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border rounded-md px-3 py-2 placeholder-gray-400"
            ></textarea>

            <button
              onClick={() => deleteExperience(index)}
              className="bg-red-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-all w-full mt-4"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default WorkExperienceForm;
