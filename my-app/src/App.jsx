import { useState, useRef, useEffect } from "react";
import { USALProvider } from '@usal/react';
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import ResponsiveCardCarousel from "./ResponsiveCardCarousel";
import { useSmoothScroll } from "./useSmoothScroll";
import ScrollToTopButton from "./ScrollToTopButton";
import { useMetaTags } from "./setMetaTag";
import CupForm from "./CupForm";
import bg from "/img/bg.webp";
import "./App.css";

import hu from "./locales/hu.json";
import en from "./locales/en.json";

const translations = { HU: hu, EN: en };
const allowedLangs = ["HU", "EN",];

export default function App() {
  const scrollTo = useSmoothScroll();

  const [open, setOpen] = useState(false);

  const { lang: urlLangParam } = useParams();
  const navigate = useNavigate();

  const savedLang = localStorage.getItem("lang")?.toUpperCase();
  const browserLang = navigator.language.slice(0, 2).toUpperCase();

  // Normalize URL lang
  const urlLang = urlLangParam?.toUpperCase();

  // Determine initial language priority
  const initialLang =
    urlLang && allowedLangs.includes(urlLang)
      ? urlLang
      : savedLang && allowedLangs.includes(savedLang)
        ? savedLang
        : allowedLangs.includes(browserLang)
          ? browserLang
          : "EN";

  const [lang, setLang] = useState(initialLang);

  // Sync language with URL and localStorage
  useEffect(() => {
    localStorage.setItem("lang", lang);

    // Navigate only if URL is missing or invalid
    if (!urlLang || !allowedLangs.includes(urlLang) || urlLang !== lang) {
      navigate(`/${lang.toLowerCase()}`, { replace: true });
    }
  }, [lang, urlLang, navigate]);
  useMetaTags(translations, lang);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const desktopLangRef = useRef(null);
  const mobileLangRef = useRef(null);

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
    <div id="page" className="relative z-0 top-0 left-0 w-full h-fit bg-[var(--light-blue)] max-w-[100vw] overflow-hidden pb-1" key={lang}>
      <div id="banner"
        className="flex flex-col relative w-screen h-screen bg-cover bg-center m-0 p-0 max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw]"
        style={{ backgroundImage: `url(${bg})` }}
      >

        {/* White capsule bg */}
        <USALProvider>
          <div className="hidden md:block absolute right-0 top-0 w-1/2 h-screen max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] bg-white/55 rounded-l-full" data-usal="slide-l-100 threshold-0 delay-500 duration-2000"></div>
        </USALProvider>


        <USALProvider>
          {/* Navigation Desktop */}
          <nav className="relative z-50 top-0 left-0 w-full px-4 py-4 hidden lg:flex items-center justify-between sintony" data-usal="slide-d-150 delay-1500 duration-1000 threshold-0 once">
            {/* Left Menu */}
            <div className="flex gap-2 xl:gap-5 text-[var(--light-blue)] shadow-custom-text">
              <a
                href="#cups"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("cups");
                }}
                className="cursor-pointer px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]"
              >
                {translations[lang].menu.cups}
              </a>
              <a
                href="#production"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("production");
                }}
                className="cursor-pointer px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]"
              >
                {translations[lang].menu.production}
              </a>
              <a
                href="#renting"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("renting");
                }}
                className="cursor-pointer px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]"
              >
                {translations[lang].menu.renting}
              </a>
              <a
                href="#washing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("washing");
                }}
                className="cursor-pointer px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]"
              >
                {translations[lang].menu.washing}
              </a>
              <a
                href="#logistics"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("logistics");
                }}
                className="cursor-pointer px-2 xl:px-4 py-2 rounded-[var(--border-radius-16)] transition-all duration-500 ease-in-out hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]"
              >
                {translations[lang].menu.logistics}
              </a>
            </div>
            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Contact Button */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("contact");
                }}
                className="cursor-pointer bg-[var(--dark-blue)] text-[var(--light-blue)]
               px-4 py-2 rounded-[var(--border-radius-16)] shadow-custom-box
               transition-all duration-500 ease-in-out
               hover:bg-[var(--dark-blue-60)] hover:[box-shadow:inset_0_4px_5px_5px_rgb(0,0,0,0.25)]"
              >
                {translations[lang].menu.contact}
              </a>
              {/* Language dropdown - desktop */}
              <div className="relative" ref={desktopLangRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer bg-[var(--dark-blue)] text-[var(--light-blue)] px-2 py-2 rounded-[var(--border-radius-16)]  shadow-custom-box flex items-center justify-center gap-1 min-w-[80px] group
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
                  <div className="absolute right-0 mt-2 w-auto bg-[var(--light-blue)]  rounded-[var(--border-radius-16)] border border-[var(--dark-blue)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {allowedLangs.map((option) => (
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
        </USALProvider>

        {/* Navbar Mobile */}
        <USALProvider>
          <nav className="relative z-50 top-0 left-0 w-full px-4 py-4 flex lg:hidden items-center justify-between sintony" data-usal="slide-d-150 delay-1500 duration-1500 threshold-0 once">
            {/* Left: MAXCUP */}
            <div className="text-[var(--light-blue)] shadow-custom-text py-2 font-semibold">
              MAX CUP
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
                  className="cursor-pointer md:bg-[var(--dark-blue-60)] py-1 px-2 mx-2 rounded-md flex items-center justify-center gap-1 text-[var(--light-blue)] ring-2 ring-[var(--light-blue)] ring-opacity-50"
                >
                  <span className="font-medium">{lang}</span>
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-auto bg-[var(--light-blue)]  rounded-[var(--border-radius-16)] border border-[var(--dark-blue)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {allowedLangs.map((option) => (
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
                className="cursor-pointer p-1 rounded-md flex items-center justify-center ring-2 ring-[var(--light-blue)] ring-opacity-50 md:bg-[var(--dark-blue-60)]"
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
        </USALProvider>

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
              <a
                href="#cups"
                className="text-[var(--light-blue)] text-2xl font-medium capitalize hover:text-[var(--dark-blue)] hover:bg-[var(--light-blue)] px-6 py-1 rounded-md transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('cups');
                  setIsMenuOpen(false);
                }}
              >
                {translations[lang].menu.cups}
              </a>

              <a
                href="#production"
                className="text-[var(--light-blue)] text-2xl font-medium capitalize hover:text-[var(--dark-blue)] hover:bg-[var(--light-blue)] px-6 py-1 rounded-md transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('production');
                  setIsMenuOpen(false);
                }}
              >
                {translations[lang].menu.production}
              </a>

              <a
                href="#renting"
                className="text-[var(--light-blue)] text-2xl font-medium capitalize hover:text-[var(--dark-blue)] hover:bg-[var(--light-blue)] px-6 py-1 rounded-md transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('renting');
                  setIsMenuOpen(false);
                }}
              >
                {translations[lang].menu.renting}
              </a>

              <a
                href="#washing"
                className="text-[var(--light-blue)] text-2xl font-medium capitalize hover:text-[var(--dark-blue)] hover:bg-[var(--light-blue)] px-6 py-1 rounded-md transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('washing');
                  setIsMenuOpen(false);
                }}
              >
                {translations[lang].menu.washing}
              </a>

              <a
                href="#logistics"
                className="text-[var(--light-blue)] text-2xl font-medium capitalize hover:text-[var(--dark-blue)] hover:bg-[var(--light-blue)] px-6 py-1 rounded-md transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('logistics');
                  setIsMenuOpen(false);
                }}
              >
                {translations[lang].menu.logistics}
              </a>

              <a
                href="#contact"
                className="text-[var(--light-blue)] text-2xl font-medium capitalize hover:text-[var(--dark-blue)] hover:bg-[var(--light-blue)] px-6 py-1 rounded-md transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                  setIsMenuOpen(false);
                }}
              >
                {translations[lang].menu.contact}
              </a>

            </div>
          </div>
        )}

        <ScrollToTopButton></ScrollToTopButton>

        <USALProvider>
          <div className="hidden md:grid grid-cols-[50%_50%] flex-1 relative">
            <div className="flex flex-col items-left justify-center pl-8 xl:pl-12 ">
              <div className="hidden lg:block sintony xl-text text-[var(--light-blue)] shadow-custom-text font-bold -mx-1.5 -my-2 lg:-my-6" data-usal="fade-d duration-1500 delay-200" >
                MAX CUP
              </div>
              <div className="text-[var(--light-blue)] shadow-custom-text xl-text-between-md-lg" data-usal="fade-u split-word split-delay-100 duration-1500 delay-200">
                {translations[lang].banner.clean}
              </div>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("contact");
                }}
                className="
                    relative inline-block text-[var(--dark-blue)] bg-[var(--light-blue)]
                    px-8 py-2 my-2 w-fit rounded-[var(--border-radius-16)] transition-all duration-500
                    after:content-['»'] after:absolute after:top-1/2 after:right-0 hover:pl-6 hover:pr-10 after:-translate-y-1/2
                    after:opacity-0 after:transition-all after:duration-500
                    hover:after:opacity-100 hover:after:right-6 shadow-custom-box cursor-pointer
                  "
                data-usal="fade-u duration-1500 delay-1500"
              >
                {translations[lang].page.offer}
              </a>
            </div>
            <div className="flex justify-center items-center" data-usal="slide-l-100 duration-1500 delay-1000 threshold-0">
              <img
                src="/img/cup1.webp"
                alt="Cup"
                className="ml-10 max-h-[70vw] h-[50vh] md:px-4 lg:h-[65vh] lg:max-w-[40vw] xl:h-[80vh] w-auto max-w-full object-contain" />
            </div>
          </div>
        </USALProvider>

        <USALProvider>
          <div className="md:hidden absolute left-0 right-0 bottom-0 z-30 w-full overflow-hidden flex flex-1 h-full flex-col justify-end items-center">
            {/* Background image */}
            <div
              className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] bg-no-repeat bg-contain bg-right-bottom" data-usal="slide-l-100 duration-1500 delay-500 threshold-0"
              style={{ backgroundImage: "url('/img/cup1.webp')" }}
            />
            {/* Button */}
            <a
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="
                relative inline-block text-[var(--dark-blue)] bg-[var(--light-blue)] 
                px-8 py-2 mb-10 w-fit rounded-[var(--border-radius-16)] transition-all duration-500
                after:content-['»'] after:absolute after:top-1/2 after:right-0 hover:pl-6 hover:pr-10 after:-translate-y-1/2
                after:opacity-0 after:transition-all after:duration-500
                hover:after:opacity-100 hover:after:right-6 shadow-box cursor-pointer
              " data-usal="fade-u duration-1500 delay-1500"
            >
              {translations[lang].page.offer}
            </a>
          </div>
        </USALProvider>

      </div>


      {/* Miért a maxcup? */}
      <USALProvider>
        <div className="triangle-left hidden lg:block"></div>
        <div className="triangle-right hidden lg:block"></div>

        
        <div className="flex justify-center items-center relative w-screen min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
          <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 w-[90%] lg:w-[85%]">
            <div className="order-1 lg:order-1">
              <h1 className="lg-text sintony font-bold" data-usal="ease-in-out duration-500 threshold-100">{translations[lang].whymaxcup.whymaxcup}</h1>
              <p
                className="whitespace-pre-wrap text-justify" data-usal="ease-in-out duration-500 threshold-70"
                dangerouslySetInnerHTML={{ __html: translations[lang].whymaxcup.paragraph }}
              />
            </div>
            <div className="order-3 lg:order-2 mt-2 lg:mt-0 flex justify-center items-center" data-usal="ease-in-out duration-500 threshold-70">
              <video src="/img/maxvideo.webm" autoPlay loop muted playsInline className="h-[90vw] w-[90vw] lg:h-[40vw] lg:w-[40vw] object-cover rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)]" ></video>
            </div>
          </div>
        </div>
      </USALProvider>

      {/* Poharaink */}
      <div id="cups" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
        <div className="w-[90%] lg:w-[85%]">
          <h1 className="lg-text sintony font-bold">{translations[lang].menu.cups}</h1>
          <p
            className="whitespace-pre-wrap text-justify"
            dangerouslySetInnerHTML={{ __html: translations[lang].cups.desc }}
          />
        </div>
      </div>

      {/* Szolgáltatásaink */}
      <USALProvider>
        <div className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
          <div className="w-[90%] lg:w-[85%]">
            <h1 className="lg-text sintony font-bold mb-2" data-usal="ease-in-out duration-500 threshold-100">{translations[lang].cards.title}</h1>
            <ResponsiveCardCarousel lang={lang} translations={translations[lang]} />
          </div>
        </div>
      </USALProvider>


      {/* Gyártás */}
      <USALProvider>
        <div id="production" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
          <div className="w-[90%] lg:w-[85%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
              {/* 1 */}
              <div className="flex flex-col justify-center p-1 order-1">
                <h2 className="lg-text sintony font-bold" data-usal="fade-d delay-100 threshold-100">{translations[lang].production.title}</h2>
              </div>
              {/* 2 */}
              <div className="flex flex-col justify-center order-2 lg:order-2">
                <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]" data-usal="fade-d delay-100 threshold-100"></span>
              </div>
              {/* 3 */}
              <div className="flex flex-col justify-start p-1 order-4 lg:order-3 items-center 2xl:items-start">
                <div className="inline-block">
                  <img
                    src="/img/maxcup-repohar-gyartas.webp" alt={translations[lang].production.title}
                    className="rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)] shadow-custom-box" data-usal="fade-r threshold-80 delay-100 duration-800"
                  />
                  <button
                    className="mt-2 shadow-custom-box group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[var(--border-radius-16)] bg-[var(--dark-blue)] text-[var(--light-blue)] duration-500"
                    style={{ width: '100%' }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }} data-usal="fade-r threshold-100 delay-100 duration-800"
                  >
                    {/* Text */}
                    <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
                      {translations[lang].page.offer}
                    </div>
                    {/* Icon */}
                    <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                      >
                        <path
                          d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              {/* 4 */}
              <div className="flex flex-col justify-start p-1 order-3 lg:order-4">
                <p
                  className="whitespace-pre-wrap text-justify" data-usal="fade-u threshold-50 duration-800"
                  dangerouslySetInnerHTML={{ __html: translations[lang].production.desc }}
                />
              </div>
            </div>
          </div>
        </div>
      </USALProvider>


      {/* Bérlés */}
      <USALProvider>
        <div id="renting" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
          <div className="w-[90%] lg:w-[85%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
              {/* 1 */}
              <div className="flex flex-col justify-center p-1 order-1 lg:order-2">
                <h2 className="lg-text sintony font-bold" data-usal="fade-d delay-100 threshold-100">{translations[lang].renting.title}</h2>
              </div>
              {/* 2 */}
              <div className="flex flex-col justify-center order-2 lg:order-1">
                <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]" data-usal="fade-d delay-100 threshold-100"></span>
              </div>
              {/* 3 */}
              <div className="flex flex-col justify-start p-1 order-4 lg:order-4 items-center 2xl:items-start">
                <div className="inline-block">
                  <img
                    src="/img/maxcup-repohar-berles.webp" alt={translations[lang].renting.title}
                    className="rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)] shadow-custom-box" data-usal="fade-l threshold-80 delay-100 duration-800"
                  />
                  <button
                    className="mt-2 shadow-custom-box group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[var(--border-radius-16)] bg-[var(--dark-blue)] text-[var(--light-blue)] duration-500"
                    style={{ width: '100%' }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }} data-usal="fade-l threshold-100 delay-100 duration-800"
                  >
                    {/* Text */}
                    <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
                      {translations[lang].page.offer}
                    </div>
                    {/* Icon */}
                    <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                      >
                        <path
                          d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              {/* 4 */}
              <div className="flex flex-col justify-start p-1 order-3 lg:order-3">
                <p
                  className="whitespace-pre-wrap text-justify" data-usal="fade-u threshold-50 duration-800"
                  dangerouslySetInnerHTML={{ __html: translations[lang].renting.desc }}
                />
              </div>
            </div>
          </div>
        </div>
      </USALProvider>



      {/* Mosás */}
      <USALProvider>
        <div id="washing" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
          <div className="w-[90%] lg:w-[85%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
              {/* 1 */}
              <div className="flex flex-col justify-center p-1 order-1">
                <h2 className="lg-text sintony font-bold" data-usal="fade-d delay-100 threshold-100">{translations[lang].washing.title}</h2>
              </div>
              {/* 2 */}
              <div className="flex flex-col justify-center order-2 lg:order-2">
                <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]" data-usal="fade-d delay-100 threshold-100"></span>
              </div>
              {/* 3 */}
              <div className="flex flex-col justify-start p-1 order-4 lg:order-3 items-center 2xl:items-start">
                <div className="inline-block">
                  <img
                    src="/img/maxcup-repohar-mosas.webp" alt={translations[lang].washing.title}
                    className="rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)] shadow-custom-box" data-usal="fade-r threshold-80 delay-100 duration-800"
                  />
                  <button
                    className="mt-2 shadow-custom-box group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[var(--border-radius-16)] bg-[var(--dark-blue)] text-[var(--light-blue)] duration-500"
                    style={{ width: '100%' }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }} data-usal="fade-r threshold-100 delay-100 duration-800"
                  >
                    {/* Text */}
                    <div className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
                      {translations[lang].page.offer}
                    </div>
                    {/* Icon */}
                    <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                      >
                        <path
                          d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              {/* 4 */}
              <div className="flex flex-col justify-start p-1 order-3 lg:order-4">
                <p
                  className="whitespace-pre-wrap text-justify" data-usal="fade-u threshold-50 duration-800"
                  dangerouslySetInnerHTML={{ __html: translations[lang].washing.desc }}
                />
              </div>
            </div>
          </div>
        </div>
      </USALProvider>

      {/* Logisztika */}
      <USALProvider>
        <div id="logistics" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
          <div className="w-[90%] lg:w-[85%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
              {/* 1 */}
              <div className="flex flex-col justify-center p-1 order-1 lg:order-2">
                <h2 className="lg-text sintony font-bold" data-usal="fade-d delay-100 threshold-100">{translations[lang].logistics.title}</h2>
              </div>
              {/* 2 */}
              <div className="flex flex-col justify-center order-2 lg:order-1">
                <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]" data-usal="fade-d delay-100 threshold-100"></span>
              </div>
              {/* 3 */}
              <div className="flex flex-col justify-start p-1 order-4 lg:order-4 items-center 2xl:items-start">
                <div className="inline-block">
                  <img
                    src="/img/maxcup-repohar-raktarozas-szallitas.webp" alt={translations[lang].logistics.title}
                    className="rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)] shadow-custom-box" data-usal="fade-l threshold-80 delay-100 duration-800"
                  />
                </div>
              </div>
              {/* 4 */}
              <div className="flex flex-col justify-start p-1 order-3 lg:order-3">
                <p
                  className="whitespace-pre-wrap text-justify" data-usal="fade-u threshold-50 duration-800"
                  dangerouslySetInnerHTML={{ __html: translations[lang].logistics.desc }}
                />
              </div>
            </div>
          </div>
        </div>
      </USALProvider>


      {/* Kapcsolat */}
      <USALProvider>
        <div id="contact" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
          <div className="w-[90%] lg:w-[85%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-auto lg:grid-cols-[40%_60%]">
              {/* 1 */}
              <div className="flex flex-col justify-center p-1 order-1 lg:order-1">
                <h1 className="lg-text sintony font-bold" data-usal="fade-d delay-100 threshold-100">{translations[lang].contact.title}</h1>
              </div>
              {/* 2 */}
              <div className="flex flex-col justify-center order-2 lg:order-2">
                <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]" data-usal="fade-d delay-100 threshold-100"></span>
              </div>
              {/* 3 */}
              <div className="flex flex-col justify-start p-1 order-4 lg:order-4 items-center 2xl:items-start">
                <CupForm lang={lang} translations={translations[lang]} ></CupForm>
              </div>
              <div className="flex flex-col justify-start items-start p-1 order-3 lg:order-3 space-y-4">
                {/* Description */}
                <p className="whitespace-pre-wrap text-justify" data-usal="fade-r threshold-80 delay-100 duration-800">
                  {translations[lang].contact.desc}
                </p>
                {/* Értékesítés */}
                <div className="space-y-2" data-usal="fade-r threshold-80 delay-100 duration-800">
                  <span className="font-bold">{translations[lang].contact.sales}</span>
                  <div className="flex flex-col space-y-2">
                    {/* Email */}
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="black"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                      <a
                        href="mailto:maxcupsales@max-group.net"
                        className="sm-text relative after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-500 hover:after:scale-x-100"
                      >
                        maxcupsales@max-group.net
                      </a>
                    </div>
                    {/* Phone */}
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                        />
                      </svg>
                      <span className="sm-text">+36 20 998 8172</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </USALProvider>


      {/* Footer */}
      <USALProvider>
        <footer className="bg-[var(--dark-blue)] w-full h-auto mt-30 md:mt-10" data-usal="fade-u threshold-10 duration-800">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 w-full flex-1" data-usal="fade-u delay-300 threshold-10 duration-800">
              {/* Logo */}
              <div className="flex items-center justify-center py-4 order-3 md:hidden lg:flex lg:order-1">
                <img
                  src="/img/maxcup-logo-white.webp"
                  alt="MAX CUP"
                  className="h-auto max-h-25 object-contain"
                />
              </div>
              {/* Contact */}
              <div className="py-4 flex flex-col items-center justify-start order-1 md:order-1 lg:order-2">
                <div className="text-center md-text text-[var(--light-blue)] sintony underline decoration-2 underline-offset-4">
                  {translations[lang].footer.contact}
                </div>
                <a
                  href="mailto:maxcupsales@max-group.net"
                  className="xs-text text-center text-[var(--light-blue)] relative after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--light-blue)] after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  maxcupsales@max-group.net
                </a>
                <span className="xs-text text-center text-[var(--light-blue)]">+36 20 998 8172</span>
                <div class="flex gap-4 md:gap-2 mt-2">
                  {/* Facebook */}
                  <a href="https://www.facebook.com/MaxCupHungary" target="_blank" class="text-[var(--light-blue)] hover:scale-125 transition-transform">
                    <svg viewBox="0 0 512 512" class="w-7 h-7 md:w-5 md:h-5 fill-current">
                      <path d="M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-106.468,0l0,-192.915l66.6,0l12.672,-82.621l-79.272,0l0,-53.617c0,-22.603 11.073,-44.636 46.58,-44.636l36.042,0l0,-70.34c0,0 -32.71,-5.582 -63.982,-5.582c-65.288,0 -107.96,39.569 -107.96,111.204l0,62.971l-72.573,0l0,82.621l72.573,0l0,192.915l-191.104,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/maxcuphungary?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" class="text-[var(--light-blue)] hover:scale-125 transition-transform">
                    <svg viewBox="0 0 512 512" class="w-7 h-7 md:w-5 md:h-5 fill-current">
                      <path d="M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-386.892,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Zm-193.446,81c-47.527,0 -53.487,0.201 -72.152,1.053c-18.627,0.85 -31.348,3.808 -42.48,8.135c-11.508,4.472 -21.267,10.456 -30.996,20.184c-9.729,9.729 -15.713,19.489 -20.185,30.996c-4.326,11.132 -7.284,23.853 -8.135,42.48c-0.851,18.665 -1.052,24.625 -1.052,72.152c0,47.527 0.201,53.487 1.052,72.152c0.851,18.627 3.809,31.348 8.135,42.48c4.472,11.507 10.456,21.267 20.185,30.996c9.729,9.729 19.488,15.713 30.996,20.185c11.132,4.326 23.853,7.284 42.48,8.134c18.665,0.852 24.625,1.053 72.152,1.053c47.527,0 53.487,-0.201 72.152,-1.053c18.627,-0.85 31.348,-3.808 42.48,-8.134c11.507,-4.472 21.267,-10.456 30.996,-20.185c9.729,-9.729 15.713,-19.489 20.185,-30.996c4.326,-11.132 7.284,-23.853 8.134,-42.48c0.852,-18.665 1.053,-24.625 1.053,-72.152c0,-47.527 -0.201,-53.487 -1.053,-72.152c-0.85,-18.627 -3.808,-31.348 -8.134,-42.48c-4.472,-11.507 -10.456,-21.267 -20.185,-30.996c-9.729,-9.728 -19.489,-15.712 -30.996,-20.184c-11.132,-4.327 -23.853,-7.285 -42.48,-8.135c-18.665,-0.852 -24.625,-1.053 -72.152,-1.053Zm0,31.532c46.727,0 52.262,0.178 70.715,1.02c17.062,0.779 26.328,3.63 32.495,6.025c8.169,3.175 13.998,6.968 20.122,13.091c6.124,6.124 9.916,11.954 13.091,20.122c2.396,6.167 5.247,15.433 6.025,32.495c0.842,18.453 1.021,23.988 1.021,70.715c0,46.727 -0.179,52.262 -1.021,70.715c-0.778,17.062 -3.629,26.328 -6.025,32.495c-3.175,8.169 -6.967,13.998 -13.091,20.122c-6.124,6.124 -11.953,9.916 -20.122,13.091c-6.167,2.396 -15.433,5.247 -32.495,6.025c-18.45,0.842 -23.985,1.021 -70.715,1.021c-46.73,0 -52.264,-0.179 -70.715,-1.021c-17.062,-0.778 -26.328,-3.629 -32.495,-6.025c-8.169,-3.175 -13.998,-6.967 -20.122,-13.091c-6.124,-6.124 -9.917,-11.953 -13.091,-20.122c-2.396,-6.167 -5.247,-15.433 -6.026,-32.495c-0.842,-18.453 -1.02,-23.988 -1.02,-70.715c0,-46.727 0.178,-52.262 1.02,-70.715c0.779,-17.062 3.63,-26.328 6.026,-32.495c3.174,-8.168 6.967,-13.998 13.091,-20.122c6.124,-6.123 11.953,-9.916 20.122,-13.091c6.167,-2.395 15.433,-5.246 32.495,-6.025c18.453,-0.842 23.988,-1.02 70.715,-1.02Zm0,53.603c-49.631,0 -89.865,40.234 -89.865,89.865c0,49.631 40.234,89.865 89.865,89.865c49.631,0 89.865,-40.234 89.865,-89.865c0,-49.631 -40.234,-89.865 -89.865,-89.865Zm0,148.198c-32.217,0 -58.333,-26.116 -58.333,-58.333c0,-32.217 26.116,-58.333 58.333,-58.333c32.217,0 58.333,26.116 58.333,58.333c0,32.217 -26.116,58.333 -58.333,58.333Zm114.416,-151.748c0,11.598 -9.403,20.999 -21.001,20.999c-11.597,0 -20.999,-9.401 -20.999,-20.999c0,-11.598 9.402,-21 20.999,-21c11.598,0 21.001,9.402 21.001,21Z" />
                    </svg>
                  </a>
                  {/* Pinterest */}
                  <a href="https://www.pinterest.com" target="_blank" class="text-[var(--light-blue)] hover:scale-125 transition-transform">
                    <svg viewBox="0 0 512 512" class="w-7 h-7 md:w-5 md:h-5 fill-current">
                      <path d="M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-260.214,0c10.837,-18.276 24.602,-44.144 30.094,-65.264c3.331,-12.822 17.073,-65.143 17.073,-65.143c8.934,17.04 35.04,31.465 62.807,31.465c82.652,0 142.199,-76.005 142.199,-170.448c0,-90.528 -73.876,-158.265 -168.937,-158.265c-118.259,0 -181.063,79.384 -181.063,165.827c0,40.192 21.397,90.228 55.623,106.161c5.192,2.415 7.969,1.351 9.164,-3.666c0.909,-3.809 5.53,-22.421 7.612,-31.077c0.665,-2.767 0.336,-5.147 -1.901,-7.86c-11.323,-13.729 -20.394,-38.983 -20.394,-62.536c0,-60.438 45.767,-118.921 123.739,-118.921c67.317,0 114.465,45.875 114.465,111.485c0,74.131 -37.438,125.487 -86.146,125.487c-26.9,0 -47.034,-22.243 -40.579,-49.52c7.727,-32.575 22.696,-67.726 22.696,-91.239c0,-21.047 -11.295,-38.601 -34.673,-38.601c-27.5,0 -49.585,28.448 -49.585,66.551c0,24.27 8.198,40.685 8.198,40.685c0,0 -27.155,114.826 -32.132,136.211c-5.51,23.659 -3.352,56.982 -0.956,78.664l0.011,0.004l-103.993,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Z" />
                    </svg>
                  </a>
                  {/* Tiktok */}
                  <a href="https://www.tiktok.com/@maxcuphungary?is_from_webapp=1&sender_device=pc" target="_blank" class="text-[var(--light-blue)] hover:scale-125 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-5 md:h-5 fill-current" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 1000 1000"><path d="M906.25 0H93.75C42.19 0 0 42.19 0 93.75v812.49c0 51.57 42.19 93.75 93.75 93.75l812.5.01c51.56 0 93.75-42.19 93.75-93.75V93.75C1000 42.19 957.81 0 906.25 0zM684.02 319.72c-32.42-21.13-55.81-54.96-63.11-94.38-1.57-8.51-2.45-17.28-2.45-26.25H515l-.17 414.65c-1.74 46.43-39.96 83.7-86.8 83.7-14.57 0-28.27-3.63-40.35-9.99-27.68-14.57-46.63-43.58-46.63-76.97 0-47.96 39.02-86.98 86.97-86.98 8.95 0 17.54 1.48 25.66 4.01V421.89c-8.41-1.15-16.95-1.86-25.66-1.86-105.01 0-190.43 85.43-190.43 190.45 0 64.42 32.18 121.44 81.3 155.92 30.93 21.72 68.57 34.51 109.14 34.51 105.01 0 190.43-85.43 190.43-190.43V400.21c40.58 29.12 90.3 46.28 143.95 46.28V343.03c-28.89 0-55.8-8.59-78.39-23.31z" /></svg>
                  </a>
                </div>
              </div>
              {/* Address */}
              <div className="py-4 flex flex-col items-center justify-start order-2 md:order-3">
                <div className="text-center md-text text-[var(--light-blue)] sintony underline decoration-2 underline-offset-4">
                  {translations[lang].footer.address}
                </div>
                <a
                  href="https://maps.app.goo.gl/S6yvPNBsgZ8mwKq36" target="_blank"
                  className="xs-text text-center text-[var(--light-blue)] relative after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--light-blue)] after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  2146 Mogyoród Erdőalja utca 3.
                </a>
              </div>
            </div>
            <div className="w-full bg-black/30 flex items-center justify-center p-2 text-[var(--light-blue)] sintony text-center xs-text" data-usal="fade-u delay-500 threshold-10 duration-800">
              {translations[lang].footer.maxcup}
            </div>
          </div>
        </footer>
      </USALProvider>

    </div>
  );
}
