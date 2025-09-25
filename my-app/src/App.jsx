import { useState } from "react";
import bg from "./img/bg.png";
import "./App.css";

import hu from "./locales/hu.json";
import en from "./locales/en.json";

const translations = { HU: hu, EN: en };

export default function App() {
  const [open, setOpen] = useState(false);

  const browserLang = navigator.language.slice(0, 2).toUpperCase();
  const defaultLang = ["HU", "EN", "SK"].includes(browserLang) ? browserLang : "EN";
  const [lang, setLang] = useState(defaultLang); //böngésző nyelv

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div id="page" key={lang}>
      <div
        className="w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Navigation Desktop */}
        <nav className="w-full justify-between items-center px-2 xl:px-8 py-4 bg-transparent float-from-above hidden lg:flex sintony">
          {/* Left Menu */}
          <div className="flex gap-2 xl:gap-5 text-[var(--light-blue)] shadow-custom">
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[25px] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.cups}
            </a>
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[25px] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.production}
            </a>
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[25px] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.renting}
            </a>
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[25px] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.washing}
            </a>
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[25px] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.logistics}
            </a>
          </div>


          {/* Jobb oldal */}
          <div className="flex items-center gap-4">
            {/* Kapcsolat Button */}
            <button className="bg-[var(--dark-blue)] text-[var(--light-blue)] 
                   px-4 py-2 rounded-[16px] shadow-custom 
                   transition-all duration-500 ease-in-out 
                   hover:bg-[var(--dark-blue-60)] hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              <p className="shadow-custom">{translations[lang].menu.contact}</p>
            </button>


            {/* Nyelv lenyíló menü */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="bg-[var(--dark-blue)] text-[var(--light-blue)] px-2 py-2 rounded-[16px]  shadow-custom flex items-center justify-center gap-1 min-w-[80px] group
                          transition-all duration-500 ease-in-out 
                          hover:bg-[var(--dark-blue-60)] hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]"
              >
                <span className="">{lang}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-auto bg-[var(--light-blue)] rounded-2xl shadow-xl border border-[var(--dark-blue)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {["HU", "EN", "SK"].map((option, index) => (
                    <div
                      key={option}
                      className={`px-4 py-3 cursor-pointer hover:bg-[var(--dark-blue)] hover:text-[var(--light-blue)] transition-all duration-150 flex items-center justify-center font-medium text-gray-700 hover:text-[var(--dark-blue)] ${option === lang ? 'bg-[var(--darkb-blue)] text-[var(--light-blue)]' : ''
                        } ${index === 0 ? 'rounded-t-2xl' : ''} ${index === 2 ? 'rounded-b-2xl' : ''}`}
                      onClick={() => {
                        setLang(option);
                        setOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Navbar Mobile */}
        <nav className="fixed top-0 left-0 w-full px-4 py-4 z-50 flex lg:hidden items-center justify-between float-from-above sintony">
          {/* Left: MAXCUP */}
          <div className="text-[var(--light-blue)] shadow-custom py-2  font-semibold">
            MAXCUP
          </div>

          {/* Right: Menu toggle */}
          <div className="flex items-center h-full">
            {/* Language Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setOpen(!open);
                }}
                className="py-1 px-2 mx-2 rounded-md flex items-center justify-center gap-1 text-[var(--light-blue)] ring-2 ring-[var(--light-blue)] ring-opacity-50"
              >
                <span className="font-medium">{lang}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-auto bg-[var(--light-blue)] rounded-2xl shadow-xl border border-[var(--dark-blue)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {["HU", "EN", "SK"].map((option, index) => (
                    <div
                      key={option}
                      className={`px-4 py-3 cursor-pointer hover:bg-[var(--dark-blue)] hover:text-[var(--light-blue)] transition-all duration-150 flex items-center justify-center font-medium text-gray-700
          } ${index === 0 ? 'rounded-t-2xl' : ''} ${index === 2 ? 'rounded-b-2xl' : ''}`}
                      onClick={() => {
                        setLang(option);
                        setOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setOpen(false);
              }}
              className="p-1 rounded-md flex items-center justify-center ring-2 ring-[var(--light-blue)] ring-opacity-50"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 text-[var(--light-blue)] transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Fullscreen Menu */}
        {isMenuOpen && (
          <div
            className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
            onClick={() => setIsMenuOpen(false)} // close when clicking overlay
          >
            <div
              className={`bg-[var(--dark-blue)] w-full h-full flex flex-col items-center justify-center space-y-6 overflow-y-auto transition-transform duration-300 ${isMenuOpen ? 'animate-in fade-in slide-in-from-top duration-300' : 'animate-out fade-out slide-out-to-top duration-300'
                }`}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking menu itself
            >
              {[translations[lang].menu.cups, translations[lang].menu.production, translations[lang].menu.renting, translations[lang].menu.washing, translations[lang].menu.logistics, translations[lang].menu.contact].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-[var(--light-blue)] text-2xl font-medium capitalize hover:text-[var(--dark-blue)] hover:bg-[var(--light-blue)] px-6 py-1 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
