import React, { useState, useEffect } from "react";

const ProjectTracking = () => {
  // States to track the completion of each step
  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [step3Completed, setStep3Completed] = useState(false);
  const [step4Completed, setStep4Completed] = useState(false);
  const [step5Completed, setStep5Completed] = useState(false);
  const [step6Completed, setStep6Completed] = useState(false);

  // Function to automatically complete the steps
  useEffect(() => {
    if (step1Completed && !step2Completed) {
      setTimeout(() => setStep2Completed(true), 1000); // Automatically move to step 2 after 1 sec
    }
    if (step2Completed && !step3Completed) {
      setTimeout(() => setStep3Completed(true), 1000); // Automatically move to step 3 after 1 sec
    }
    if (step3Completed && !step4Completed) {
      setTimeout(() => setStep4Completed(true), 1000); // Automatically move to step 4 after 1 sec
    }
    if (step4Completed && !step5Completed) {
      setTimeout(() => setStep5Completed(true), 1000); // Automatically move to step 5 after 1 sec
    }
    if (step5Completed && !step6Completed) {
      setTimeout(() => setStep6Completed(true), 1000); // Automatically move to step 6 after 1 sec
    }
  }, [step1Completed, step2Completed, step3Completed, step4Completed, step5Completed]);

  return (
    <>
      <div className="text-3xl font-bold text-gray-800  p-6">
        <p>Milestones</p>
      </div>
      <div className="flex items-start space-x-6 p-4  h-auto">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          {/* Step 1 */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step1Completed
                ? "bg-green-500 text-white"
                : "border-2 border-gray-300 text-gray-400"
            }`}
          >
            ✔
          </div>
          <div
            className={`w-1 h-16 ${
              step2Completed ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>

          {/* Step 2 */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step2Completed
                ? "bg-green-500 text-white"
                : "border-2 border-green-500 text-green-500"
            }`}
          >
            2
          </div>
          <div
            className={`w-1 h-16 ${
              step3Completed ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>

          {/* Step 3 */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step3Completed
                ? "bg-green-500 text-white"
                : "border-2 border-gray-300 text-gray-400"
            }`}
          >
            3
          </div>
          <div
            className={`w-1 h-16 ${
              step4Completed ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>

          {/* Step 4 */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step4Completed
                ? "bg-green-500 text-white"
                : "border-2 border-gray-300 text-gray-400"
            }`}
          >
            4
          </div>
          <div
            className={`w-1 h-16 ${
              step5Completed ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>

          {/* Step 5 */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step5Completed
                ? "bg-green-500 text-white"
                : "border-2 border-gray-300 text-gray-400"
            }`}
          >
            5
          </div>
          <div
            className={`w-1 h-16 ${
              step6Completed ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>

          {/* Step 6 */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step6Completed
                ? "bg-green-500 text-white"
                : "border-2 border-gray-300 text-gray-400"
            }`}
          >
            6
          </div>
        </div>

        {/* Tracking Details */}
        <div className="space-y-8">
          {/* Step 1: Project Initiation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Project Initiation
            </h3>
            <p className="text-gray-500">
              The project has been initialized and is under review. All
              necessary documents have been received.
            </p>
          </div>

          {/* Step 2: Planning */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Planning</h3>
            <p className="text-gray-500">
              We are in the planning stage, determining the project scope,
              timeline, and resources needed.
            </p>
          </div>

          {/* Step 3: Design Phase */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Design Phase
            </h3>
            <p className="text-gray-500">
              The design phase is underway. We are working on initial designs
              based on the project requirements.
            </p>
          </div>

          {/* Step 4: Development Phase */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Development Phase
            </h3>
            <p className="text-gray-500">
              The development phase is now live. The team is working on
              implementing the design into functional code.
            </p>
          </div>

          {/* Step 5: Testing Phase */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Testing Phase
            </h3>
            <p className="text-gray-500">
              The project is being tested to ensure that everything works as
              expected. Any issues will be fixed.
            </p>
          </div>

          {/* Step 6: Deployment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Deployment</h3>
            <p className="text-gray-500">
              The project has been deployed. It is now live and accessible to
              the intended audience.
            </p>
          </div>

          {/* If all steps are completed */}
          {step6Completed && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Project Completed!
              </h3>
              <p className="text-gray-500">
                The project has been successfully completed. Thank you for your
                patience!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectTracking;
