import { useState } from 'react';
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section */}
        <div>
          <h2 className="font-bold text-lg">BUDGETCHAIN</h2>
          <p className="text-gray-400 text-sm mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="mt-4 border border-gray-500 px-4 py-2 text-sm rounded-md hover:bg-gray-700">
            Contact Support
          </button>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="font-semibold text-md">PRODUCT</h3>
          <ul className="mt-2 space-y-2 text-gray-400 text-sm">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`hover:text-white ${
                    activePage === item.path ? 'text-blue-500' : ''
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
