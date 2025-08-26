"use client"

import type React from "react"

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "1.",
      title: "Register and Connect your Wallet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
    },
    {
      number: "2.",
      title: "Transfer Funds and Make Budget",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
    },
    {
      number: "3.",
      title: "Get AI Insights",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
    },
    {
      number: "4.",
      title: "Monitor & Optimize",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
    },
  ]

  return (
    <main className="mt-8 md:mt-20 mb-8">
      <h2 className="text-sm md:text-[16px] font-bold text-white uppercase px-4 md:px-8 lg:pl-20">How It Works</h2>
      <section className="text-white flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-6xl">
          {/* Mobile Layout - Vertical */}
          <div className="block lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border border-dashed rounded-full text-lg font-bold mb-4">
                  <span className="bg-[#28283A] py-3 px-4 md:py-4 md:px-5 rounded-full text-sm md:text-base">
                    {step.number}
                  </span>
                </div>
                {index < steps.length + 1 && <div className="w-px h-8 border-l border-dashed border-white my-2"></div>}
                <div className="max-w-sm">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{step.description}</p>
                </div>
                {/* {index < steps.length - 1 && <div className="w-px h-8 border-l border-dashed border-white mt-6"></div>} */}
              </div>
            ))}
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:block space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center justify-center space-x-6 xl:space-x-10 px-4 xl:px-20">
                <div className="flex items-center justify-center w-20 h-20 xl:w-24 xl:h-24 border border-dashed rounded-full text-lg font-bold flex-shrink-0">
                  <span className="bg-[#28283A] py-4 px-5 xl:py-5 xl:px-6 rounded-full">{step.number}</span>
                </div>

                {index < steps.length + 1 && (
                  <hr className="border border-dashed text-white w-32 xl:w-48 flex-shrink-0" />
                )}

                <div className="flex-1 max-w-md xl:max-w-lg">
                  <h3 className="text-xl xl:text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HowItWorks
