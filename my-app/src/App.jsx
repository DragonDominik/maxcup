import { useState, useRef, useEffect } from "react";
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
    <div id="page" className="relative z-0 top-0 left-0 w-full h-fit bg-[var(--light-blue)] max-w-[100vw] overflow-hidden" key={lang}>
      <div id="banner"
        className="flex flex-col relative w-screen h-screen bg-cover bg-center m-0 p-0 max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw]"
        style={{ backgroundImage: `url(${bg})` }}
      >

        {/* White capsule bg */}
        <div className="hidden md:block absolute right-0 top-0 w-1/2 h-screen max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] bg-white/55 rounded-l-full custom-ease-in"></div>


        {/* Navigation Desktop */}
        <nav className="relative z-50 top-0 left-0 w-full px-4 py-4 hidden lg:flex items-center justify-between float-from-above sintony">
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

        {/* Navbar Mobile */}
        <nav className="relative z-50 top-0 left-0 w-full px-4 py-4 flex lg:hidden items-center justify-between float-from-above sintony">
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

        <div className="hidden md:grid grid-cols-[50%_50%] flex-1 relative">
          <div className="flex flex-col items-left justify-center custom-ease-in pl-8 xl:pl-12 ">
            <div className="hidden lg:block sintony xl-text text-[var(--light-blue)] shadow-custom-text font-bold -mx-1.5 -my-2 lg:-my-6">
              MAX CUP
            </div>
            <div className="text-[var(--light-blue)] shadow-custom-text xl-text-between-md-lg">
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
                  hover:after:opacity-100 hover:after:right-6 shadow-custom-box
                "
            >
              {translations[lang].page.offer}
            </a>
          </div>

          <div className="flex justify-center items-center">
            <img
              src="/img/cup1.webp"
              alt="Cup"
              className="ml-10 max-h-[70vw] h-[50vh] md:px-4 lg:h-[65vh] lg:max-w-[40vw] xl:h-[80vh] w-auto max-w-full slide-from-right object-contain" />
          </div>
        </div>

        <div className="md:hidden absolute left-0 right-0 bottom-0 z-30 w-full overflow-hidden flex flex-1 h-full flex-col justify-end items-center">

          {/* Background image */}
          <div
            className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] bg-no-repeat bg-contain bg-right-bottom slide-from-right"
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
      hover:after:opacity-100 hover:after:right-6 custom-ease-in-late shadow-box
    "
          >
            {translations[lang].page.offer}
          </a>
        </div>

      </div>



      {/* Miért a maxcup? */}
      <div className="triangle-left hidden lg:block"></div>
      <div className="triangle-right hidden lg:block"></div>

      <div className="flex justify-center items-center relative w-screen min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 w-[90%] lg:w-[85%]">
          <div className="order-1 lg:order-1">
            <h1 className="lg-text sintony font-bold">{translations[lang].whymaxcup.whymaxcup}</h1>
            <p
              className="whitespace-pre-wrap text-justify"
              dangerouslySetInnerHTML={{ __html: translations[lang].whymaxcup.paragraph }}
            />
          </div>

          <div className="order-3 lg:order-2 mt-2 lg:mt-0 flex justify-center items-center">
            <video src="/img/maxvideo.webm" autoPlay loop muted playsInline className="h-[90vw] w-[90vw] lg:h-[40vw] lg:w-[40vw] object-cover rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)]" ></video>
          </div>
        </div>
      </div>

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
      <div className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
        <div className="w-[90%] lg:w-[85%]">
          <h1 className="lg-text sintony font-bold mb-2">{translations[lang].cards.title}</h1>
          <ResponsiveCardCarousel lang={lang} translations={translations[lang]} />
        </div>
      </div>


      {/* Gyártás */}
      <div id="production" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
        <div className="w-[90%] lg:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
            {/* 1 */}
            <div className="flex flex-col justify-center p-1 order-1">
              <h2 className="lg-text sintony font-bold">{translations[lang].production.title}</h2>
            </div>

            {/* 2 */}
            <div className="flex flex-col justify-center order-2 lg:order-2">
              <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]"></span>
            </div>

            {/* 3 */}
            <div className="flex flex-col justify-start p-1 order-4 lg:order-3 items-center 2xl:items-start">
              <div className="inline-block">
                <img
                  src="/img/maxcup-repohar-gyartas.webp" alt={translations[lang].production.title}
                  className="rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)] shadow-custom-box"
                />

                <button
                  className="mt-2 shadow-custom-box group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[var(--border-radius-16)] bg-[var(--dark-blue)] text-[var(--light-blue)] duration-500"
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("contact");
                  }}
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
                className="whitespace-pre-wrap text-justify"
                dangerouslySetInnerHTML={{ __html: translations[lang].production.desc }}
              />
            </div>
          </div>
        </div>
      </div>


      {/* Bérlés */}
      <div id="renting" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
        <div className="w-[90%] lg:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
            {/* 1 */}
            <div className="flex flex-col justify-center p-1 order-1 lg:order-2">
              <h2 className="lg-text sintony font-bold">{translations[lang].renting.title}</h2>
            </div>

            {/* 2 */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]"></span>

            </div>

            {/* 3 */}
            <div className="flex flex-col justify-start p-1 order-4 lg:order-4 items-center 2xl:items-start">
              <div className="inline-block">
                <img
                  src="/img/maxcup-repohar-berles.webp" alt={translations[lang].renting.title}
                  className="rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)] shadow-custom-box"
                />

                <button
                  className="mt-2 shadow-custom-box group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[var(--border-radius-16)] bg-[var(--dark-blue)] text-[var(--light-blue)] duration-500"
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("contact");
                  }}
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
                className="whitespace-pre-wrap text-justify"
                dangerouslySetInnerHTML={{ __html: translations[lang].renting.desc }}
              />
            </div>
          </div>
        </div>
      </div>



      {/* Mosás */}
      <div id="washing" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
        <div className="w-[90%] lg:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
            {/* 1 */}
            <div className="flex flex-col justify-center p-1 order-1">
              <h2 className="lg-text sintony font-bold">{translations[lang].washing.title}</h2>
            </div>

            {/* 2 */}
            <div className="flex flex-col justify-center order-2 lg:order-2">
              <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]"></span>

            </div>

            {/* 3 */}
            <div className="flex flex-col justify-start p-1 order-4 lg:order-3 items-center 2xl:items-start">
              <div className="inline-block">
                <img
                  src="/img/maxcup-repohar-mosas.webp" alt={translations[lang].washing.title}
                  className="rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)] shadow-custom-box"
                />

                <button
                  className="mt-2 shadow-custom-box group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-[var(--border-radius-16)] bg-[var(--dark-blue)] text-[var(--light-blue)] duration-500"
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("contact");
                  }}
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
                className="whitespace-pre-wrap text-justify"
                dangerouslySetInnerHTML={{ __html: translations[lang].washing.desc }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logisztika */}
      <div id="logistics" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
        <div className="w-[90%] lg:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
            {/* 1 */}
            <div className="flex flex-col justify-center p-1 order-1 lg:order-2">
              <h2 className="lg-text sintony font-bold">{translations[lang].logistics.title}</h2>
            </div>

            {/* 2 */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]"></span>

            </div>

            {/* 3 */}
            <div className="flex flex-col justify-start p-1 order-4 lg:order-4 items-center 2xl:items-start">
              <div className="inline-block">
                <img
                  src="/img/maxcup-repohar-raktarozas-szallitas.webp" alt={translations[lang].logistics.title}
                  className="rounded-[var(--border-radius-50)] border-15 lg:border-15 border-[var(--mid-blue)] shadow-custom-box"
                />
              </div>
            </div>

            {/* 4 */}
            <div className="flex flex-col justify-start p-1 order-3 lg:order-3">
              <p
                className="whitespace-pre-wrap text-justify"
                dangerouslySetInnerHTML={{ __html: translations[lang].logistics.desc }}
              />
            </div>
          </div>
        </div>
      </div>


      {/* Kapcsolat */}
      <div id="contact" className="flex justify-center items-center relative w-full min-h-[100vh] 2xl:min-h-[60vw] h-fit max-h-[1000px] md:max-h-[160vw] lg:max-h-[80vw] m-0 p-0 mt-20 lg:mt-0">
        <div className="w-[90%] lg:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-auto lg:grid-cols-[40%_60%]">
            {/* 1 */}
            <div className="flex flex-col justify-center p-1 order-1 lg:order-1">
              <h1 className="lg-text sintony font-bold">{translations[lang].contact.title}</h1>
            </div>

            {/* 2 */}
            <div className="flex flex-col justify-center order-2 lg:order-2">
              <span className="w-full h-[var(--border-radius-16)] shadow-custom-box bg-[var(--dark-blue)] rounded-[var(--border-radius-16)]"></span>

            </div>

            {/* 3 */}
            <div className="flex flex-col justify-start p-1 order-4 lg:order-4 items-center 2xl:items-start">
              <CupForm lang={lang} translations={translations[lang]} ></CupForm>
            </div>

            <div className="flex flex-col justify-start items-start p-1 order-3 lg:order-3 space-y-4">
              {/* Description */}
              <p className="whitespace-pre-wrap text-justify">
                {translations[lang].contact.desc}
              </p>

              {/* Értékesítés */}
              <div className="space-y-2">
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

              {/* Üzem */}
              <div className="space-y-2">
                <span className="font-bold">{translations[lang].contact.factory}</span>
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
                    <span className="sm-text">+36 20 380 4630</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
