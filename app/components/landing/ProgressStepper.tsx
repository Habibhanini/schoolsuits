import React from "react";

interface Step {
  label: string;
  completed: boolean;
  current: boolean;
}

interface ProgressStepperProps {
  currentStep: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      label: "Create an account",
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      label: "School overview",
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      label: "Classrooms overview",
      completed: currentStep > 3,
      current: currentStep === 3,
    },
    {
      label: "Staff overview",
      completed: currentStep > 4,
      current: currentStep === 4,
    },
  ];

  return (
    <div className="bg-[#fff2e9] rounded-2xl p-6 w-[400px] h-[700px] flex flex-col items-center">
      <ul className="relative space-y-8 mt-4">
        {steps.map((step, index) => (
          <li key={index} className="relative flex items-center">
            {/* Vertical Line */}
            {index > 0 && (
              <span className="absolute top-[-30px] left-[16px] h-[30px] w-[2px] bg-gray-300"></span>
            )}

            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                step.completed
                  ? "bg-yellow-500 border-yellow-500 text-white"
                  : step.current
                  ? "bg-yellow-500 border-yellow-500"
                  : "border-gray-300 bg-white"
              }`}
            >
              {/* Checkmark for completed step */}
              {step.completed && (
                <span className="text-white font-bold text-lg">✓</span>
              )}

              {/* Smaller white circle for current step */}
              {step.current && (
                <div className="w-4 h-4 rounded-full bg-white"></div>
              )}
            </div>

            {/* Step Label */}
            <span
              className={`ml-4 text-sm ${
                step.completed || step.current
                  ? "text-black font-medium"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressStepper;
