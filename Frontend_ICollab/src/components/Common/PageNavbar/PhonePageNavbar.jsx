import React, { useState } from 'react';
import clsx from 'clsx';

function PhonePageNavbar({ tabs, activeTab, setActiveTab, className = "", onMenuToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    if (onMenuToggle) onMenuToggle(newState); // Notify parent
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
    if (onMenuToggle) onMenuToggle(false); // Close menu on tab click
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-100 shadow-md">
      <nav className={clsx('flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-3 md:py-4', className)}>
        <div className="w-full flex justify-between items-center mb-2 md:mb-0">
          <div className="text-xl font-bold text-blue-800">MyPortfolio</div>
          <div className="md:hidden">
            <button onClick={handleMenuToggle} className="text-blue-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={clsx('w-full flex-col md:flex md:flex-row md:items-center md:space-x-4', menuOpen ? 'flex' : 'hidden md:flex')}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={clsx(
                'w-full md:w-auto text-left md:text-center px-4 py-2 rounded-md text-sm md:text-base transition-colors',
                activeTab === tab ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-300'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default PhonePageNavbar;
