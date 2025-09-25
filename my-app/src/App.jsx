import { useState, useRef, useEffect } from "react";
import bg from "/img/bg.png";
import "./App.css";

import hu from "./locales/hu.json";
import en from "./locales/en.json";

const translations = { HU: hu, EN: en };

export default function App() {
  const [open, setOpen] = useState(false);

  const browserLang = navigator.language.slice(0, 2).toUpperCase();
  const defaultLang = ["HU", "EN", "SK"].includes(browserLang) ? browserLang : "EN";
  const [lang, setLang] = useState(defaultLang);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // refs for the language dropdown wrappers (desktop and mobile)
  const desktopLangRef = useRef(null);
  const mobileLangRef = useRef(null);

  // close dropdown when clicking outside of either lang wrapper
  useEffect(() => {
    function handleClickOutside(e) {
      if (!open) return;
      const target = e.target;
      if (desktopLangRef.current && desktopLangRef.current.contains(target)) return;
      if (mobileLangRef.current && mobileLangRef.current.contains(target)) return;
      setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div id="page" className="absolute top-0 left-0 w-full h-[400vh] bg-[var(--light-blue)]" key={lang}>
      <div
     className="relative w-screen h-screen bg-cover bg-center m-0 p-0 max-h-[800px] sm:max-h-none"
        style={{ backgroundImage: `url(${bg})` }}
      >

        {/* White capsule bg */}
        <div className="hidden md:block absolute right-0 top-0 w-1/2 h-screen bg-white/55 rounded-l-full custom-ease-in"></div>


        {/* Navigation Desktop */}
        <nav className="relative z-50 top-0 left-0 w-full px-2 py-4 hidden lg:flex items-center justify-between float-from-above sintony">
          {/* Left Menu */}
          <div className="flex gap-2 xl:gap-5 text-[var(--light-blue)] shadow-custom">
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.cups}
            </a>
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.production}
            </a>
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.renting}
            </a>
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.washing}
            </a>
            <a href="#" className="px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              {translations[lang].menu.logistics}
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Contact Button */}
            <button className="bg-[var(--dark-blue)] text-[var(--light-blue)] 
                   px-4 py-2 rounded-[var(--border-radius-16)] shadow-custom 
                   transition-all duration-500 ease-in-out 
                   hover:bg-[var(--dark-blue-60)] hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]">
              <p className="shadow-custom">{translations[lang].menu.contact}</p>
            </button>

            {/* Language dropdown - desktop */}
            <div className="relative" ref={desktopLangRef}>
              <button
                onClick={() => setOpen(!open)}
                className="bg-[var(--dark-blue)] text-[var(--light-blue)] px-2 py-2 rounded-[var(--border-radius-16)]  shadow-custom flex items-center justify-center gap-1 min-w-[80px] group
                          transition-all duration-500 ease-in-out 
                          hover:bg-[var(--dark-blue-60)] hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]"
              >
                <span className="">{lang}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-auto bg-[var(--light-blue)]  rounded-[var(--border-radius-16)] custom-shadow border border-[var(--dark-blue)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {["HU", "EN", "SK"].map((option) => (
                    <div
                      key={option}
                      className={`px-4 py-1 cursor-pointer flex items-center justify-center font-medium text-gray-700 
  transition-colors duration-300 ease-in-out 
  hover:bg-[var(--dark-blue)] hover:text-[var(--light-blue)]`}
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
        <nav className="relative z-50 top-0 left-0 w-full px-4 py-4 flex lg:hidden items-center justify-between float-from-above sintony">
          {/* Left: MAXCUP */}
          <div className="text-[var(--light-blue)] shadow-custom py-2  font-semibold">
            MAXCUP
          </div>

          {/* Right: Menu toggle */}
          <div className="flex items-center h-full">
            {/* Language Button - mobile */}
            <div className="relative" ref={mobileLangRef}>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setOpen(!open);
                }}
                className="md:bg-[var(--dark-blue-60)] py-1 px-2 mx-2 rounded-md flex items-center justify-center gap-1 text-[var(--light-blue)] ring-2 ring-[var(--light-blue)] ring-opacity-50"
              >
                <span className="font-medium">{lang}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-auto bg-[var(--light-blue)]  rounded-[var(--border-radius-16)] custom-shadow border border-[var(--dark-blue)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {["HU", "EN", "SK"].map((option) => (
                    <div
                      key={option}
                      className={`px-4 py-1 cursor-pointer flex items-center justify-center font-medium text-gray-700 
  transition-colors duration-300 ease-in-out 
  hover:bg-[var(--dark-blue)] hover:text-[var(--light-blue)]`}
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
              className="p-1 rounded-md flex items-center justify-center ring-2 ring-[var(--light-blue)] ring-opacity-50 md:bg-[var(--dark-blue-60)]"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 text-[var(--light-blue)] transition-transform duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
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
            className={`absolute inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className={`bg-[var(--dark-blue)] w-full h-full flex flex-col items-center justify-center space-y-6 overflow-y-auto transition-transform duration-300 ${isMenuOpen ? "animate-in fade-in slide-in-from-top duration-300" : "animate-out fade-out slide-out-to-top duration-300"}`}
              onClick={(e) => e.stopPropagation()}
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

        <div className="hidden md:grid grid-cols-[50%_50%] h-[80vh] max-h-[1200px] relative">
          <div className="flex flex-col items-left justify-center h-full custom-ease-in pl-8 xl:pl-12">
            <div className="hidden lg:block sintony xl-text text-[var(--light-blue)] shadow-custom font-bold -mx-1.5 -my-2 lg:-my-6">
              MAXCUP
            </div>
            <div className="text-[var(--light-blue)] shadow-custom xl-text-between-md-lg">
              {translations[lang].banner.clean}
            </div>

            <a
              href="#contact"
              className="
                relative inline-block text-[var(--dark-blue)] bg-[var(--light-blue)] 
                px-8 py-2 my-2 w-fit rounded-[var(--border-radius-16)] transition-all duration-500
                after:content-['»'] after:absolute after:top-1/2 after:right-0 hover:pl-6 hover:pr-10 after:-translate-y-1/2
                after:opacity-0 after:transition-all after:duration-500
                hover:after:opacity-100 hover:after:right-6
              "
            >
              {translations[lang].page.offer}
            </a>
          </div>

          <div className="flex justify-center items-center h-full pointer-events-none">
            <img
              src="/img/cup1.png"
              alt="Cup"
              className="ml-10 h-[50vh] md:px-4 lg:h-[65vh] lg:max-w-[40vw] xl:h-[80vh] 2xl:pt-10 w-auto max-w-full slide-from-right object-contain" />
          </div>
        </div>

<div className="md:hidden absolute left-0 right-0 bottom-0 z-30 w-full h-[80vh] overflow-hidden flex flex-col justify-end items-center">

 {/* Background image */}
  <div
    className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] bg-no-repeat bg-contain bg-right-bottom pointer-events-none slide-from-right"
    style={{ backgroundImage: "url('/img/cup1.png')" }}
  />
  
  {/* Button */}
  <a
    href="#contact"
    className="
      relative inline-block text-[var(--dark-blue)] bg-[var(--light-blue)] 
      px-8 py-2 mb-10 w-fit rounded-[var(--border-radius-16)] transition-all duration-500
      after:content-['»'] after:absolute after:top-1/2 after:right-0 hover:pl-6 hover:pr-10 after:-translate-y-1/2
      after:opacity-0 after:transition-all after:duration-500
      hover:after:opacity-100 hover:after:right-6 custom-ease-in-late
    "
  >
    {translations[lang].page.offer}
  </a>
</div>

      </div>
      yaho
    </div>
  );
}
