"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useRouter } from "next/navigation"
import LoginModal from "@/components/ui/login-modal"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // Function to check if link is active
  const isActive = (href: string) => pathname === href

  const handleLoginClick = () => {
    setLoginOpen(true)
  }

  // Navigation links - unified for both mobile and desktop
  const navLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "White Paper", href: "/white-paper" },
    { name: "FAQs", href: "/faqs" },
    { name: "Demo", href: "/demo" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:pt-6">
      <nav className="bg-[#060612]/95 backdrop-blur-sm text-white rounded-[20px] border border-[#EBEBEB80] max-w-6xl mx-auto shadow-lg">
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 w-full">
          {/* Logo */}
          <Link href={"/"} className="flex-shrink-0">
            <div className="text-white h-8 sm:h-[37.34px] w-auto sm:w-[157px]">
              <Image src="/svg/Logo.svg" width={157} height={38} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:justify-center md:items-center md:space-x-4 lg:space-x-6 flex-grow ml-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-gray-300 text-sm lg:text-base whitespace-nowrap ${
                  isActive(item.href) ? "text-blue-500 font-semibold border-b-2 border-blue-500" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex md:space-x-2 lg:space-x-4 flex-shrink-0">
            <button
              className="w-[120px] lg:w-[170px] h-[40px] lg:h-[50px] rounded-[12px] border border-[#EBEBEB80] px-3 lg:px-4 py-1 lg:py-2 transition hover:bg-white hover:text-black text-sm lg:text-base"
              onClick={handleLoginClick}
            >
              LOGIN
            </button>
            <button className="w-[120px] lg:w-[170px] h-[40px] lg:h-[50px] rounded-[12px] bg-white px-3 lg:px-4 py-1 lg:py-2 text-black transition hover:bg-opacity-80 text-sm lg:text-base">
              GET STARTED
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={handleToggle}
              className="text-white transition hover:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
                  />
                ) : (
                  <path fillRule="evenodd" clipRule="evenodd" d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu (visible when isOpen = true) */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 bg-[#060612] px-4 py-4 border-t border-[#EBEBEB40]">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-gray-300 py-2 ${
                    isActive(item.href) ? "text-blue-500 font-semibold border-b border-blue-500" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 flex flex-col space-y-3 py-2">
                <button
                  className="rounded-[12px] border border-[#EBEBEB80] px-4 py-3 transition hover:bg-white hover:text-black"
                  onClick={() => {
                    handleLoginClick()
                    setIsOpen(false)
                  }}
                >
                  LOGIN
                </button>
                <button
                  className="rounded-[12px] bg-white px-4 py-3 text-black transition hover:bg-opacity-80"
                  onClick={() => setIsOpen(false)}
                >
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal isOpen={loginOpen} onOpenChange={setLoginOpen} />
      </nav>
    </nav>
  )
}

export default Navbar
