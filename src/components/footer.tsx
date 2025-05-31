import { useState } from 'react';
import Image from 'next/image';
import ArrowCircleUpRight from '../../public/ArrowCircleUpRight.svg'
import Logo from '../../public/svg/Logo.svg';
import Link from 'next/link';

const Footer = () => {
  const [activePage, setActivePage] = useState('home');

  const menuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Prices', path: '/pricing' },
  ];

  return (
    <footer className="  text-white py-10 px-6 md:px-16 mt-5">
      <div className="flex justify-between w-full">
        {/* Left Section */}
        <div>
          <div className="text-white h-[37.34px] w-[150px] pr-4">
            <Image
              src={Logo}
              width={50}
              height={50}
              alt="Logo"
              className="w-full h-full object-fill"
            />
          </div>
          <p className="text-gray-400 text-sm mt-2 w-[300px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam doloribus voluptatibus ipsa debitis consequuntur iure!
          </p>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="font-semibold text-md">PRODUCT</h3>
          <ul className="mt-2 space-y-2 text-gray-400 text-sm">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`hover:text-white ${activePage === item.path ? 'text-blue-500' : ''
                    }`}
                  onClick={() => setActivePage(item.path)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold text-md">COMPANY</h3>
          <ul className="mt-2 space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/career" className="hover:text-white">
                Career
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/address" className="hover:text-white">
                Address
              </a>
            </li>
            <li>
              <a href="/developers" className="hover:text-white">
                Developers
              </a>
            </li>
          </ul>
        </div>

        {/* Socials Section */}
        <div>
          <h3 className="font-semibold text-md">SOCIALS</h3>
          <ul className="mt-2 space-y-2 text-gray-400 text-sm">
            <li>
              <a href="https://telegram.com" className="hover:text-white">
                Telegram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" className="hover:text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://discord.com" className="hover:text-white">
                Discord
              </a>
            </li>
            <li>
              <a href="https://github.com" className="hover:text-white">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-[12px] mt-10">
        <div>
          <button className="mt-4 mb-6 border px-4 py-2 text-lg text-black rounded-md bg-white flex">
            Contact Support
            <Image
              src={ArrowCircleUpRight}
              width={25}
              height={35}
              alt="Logo"
              className=" object-fill ml-2"
            ></Image>
          </button>
        </div>
        <h1>
          Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
          egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl.
        </h1>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} BudgetChain. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
