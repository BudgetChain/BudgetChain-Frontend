'use client';

interface SidebarProps {
  currentStep: number;
}

export default function Sidebar({ currentStep }: SidebarProps) {
  const steps = [
    {
      number: 1,
      title: 'Provide Basic Info About The Project',
      subtitle: "You'd Like To Submit.",
    },
    {
      number: 2,
      title: 'Provide Basic Info About The Project',
      subtitle: "You'd Like To Submit.",
    },
    {
      number: 3,
      title: 'Provide Basic Info About The Project',
      subtitle: "You'd Like To Submit.",
    },
  ];

  return (
    <div className="flex flex-col px-4 md:px-0 md:ml-12 w-full max-w-xs">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold text-[#4F4AE6] mb-1">
        Create An Account
      </h1>
      <p className="text-gray-300 mb-6 md:mb-[35%] h-10 flex items-center text-sm md:text-base">
        To Activate Our Service
      </p>

      {/* Steps */}
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-start mb-4 md:mb-0">
          <div className="relative flex flex-col items-center">
            {/* Faded-to-Solid Dotted Line Above Step 1 */}
            {index === 0 && (
              <div className="absolute top-[-40px] h-10 w-0.5 border-l-2 border-dashed border-gray-300 hidden md:block"></div>
            )}

            <div className="relative flex items-center justify-center mb-2 mt-2">
              {/* Outer Dotted Border */}
              <div
                className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-dashed
                  ${
                    currentStep >= step.number
                      ? 'border-gray-300 border-2 opacity-100' // Fully visible for active steps
                      : 'border-gray-400 border-2 opacity-30' // Faded & blurred for inactive steps
                  }`}
              ></div>

              {/* Inner Solid Circle */}
              <div
                className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full
                  ${
                    currentStep >= step.number
                      ? 'bg-gray-800 border-2 border-gray-800'
                      : 'bg-gray-800 border-2 border-gray-800'
                  }`}
              >
                <span
                  className={`text-${currentStep >= step.number ? 'white' : 'gray-500'} text-xs md:text-sm`}
                >
                  {step.number}
                </span>
              </div>
            </div>

            {/* Faded-to-Solid Dotted Line Below (Only if Not Last Step) */}
            {index < steps.length - 1 && (
              <div className="h-8 md:h-12 w-0.5 border-l-2 border-dashed opacity-30 bg-gradient-to-b from-transparent to-gray-300"></div>
            )}
          </div>

          {/* Right Section - Step Content */}
          <div className="ml-4 flex flex-col justify-center">
            <p
              className={`text-${currentStep === step.number ? 'white' : 'gray-500'} text-xs md:text-sm`}
            >
              {step.title}
            </p>
            <p
              className={`text-${currentStep === step.number ? 'white' : 'gray-500'} text-xs md:text-sm`}
            >
              {step.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
