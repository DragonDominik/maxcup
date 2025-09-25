import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./App.css";

import hu from "./locales/hu.json";
import en from "./locales/en.json";

const ResponsiveCardCarousel = ({ lang, translations }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const cards = [
        {
            id: 1,
            title: `${translations.menu.production}`,
            icon: "/img/maxcup-gyartas-pictogram.png",
            text: `${translations.cards.production}`,
            link: "#poharak"
        },
        {
            id: 2,
            title: `${translations.menu.renting}`,
            icon: "/img/maxcup-berles-pictogram.png",
            text: `${translations.cards.renting}`,
            link: "#berles"
        },
        {
            id: 3,
            title: `${translations.menu.washing}`,
            icon: "/img/maxcup-mosas-pictogram.png",
            text: `${translations.cards.washing}`,
            link: "#mosas"
        },
        {
            id: 4,
            title: `${translations.menu.logistics}`,
            icon: "/img/maxcup-logisztika-pictogram.png",
            text: `${translations.cards.logistics}`,
            link: "#logisztika"
        }
    ];

    const nextSlide = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex >= cards.length ? 0 : nextIndex;
        });

        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setCurrentIndex((prevIndex) => {
            const prevIndexNew = prevIndex - 1;
            return prevIndexNew < 0 ? cards.length - 1 : prevIndexNew;
        });

        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToSlide = (index) => {
        if (isAnimating || index === currentIndex) return;

        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="w-full">
            {/* Desktop verzió - 4 kártya egyszerre (md és nagyobb) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div key={card.id} className="bg-[var(--mid-blue-40)] rounded-[var(--border-radius-24)] shadow-custom-box overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[55vw] lg:h-[40vw] min-h-none xl:min-h-[500px] xl:h-[30vw] max-h-[1000px] xl:max-h-[800px]">
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex justify-center mb-2">
                                <img
                                    src={card.icon}
                                    alt={`${card.title} icon`}
                                    className="h-[80px] xl:h-[100px] w-auto object-contain"
                                />
                            </div>
                            <h2 className="font-bold text-center mb-1">{card.title}</h2>

                            <p className="xs-text leading-relaxed flex-grow text-center">
                                {card.text}
                            </p>
                            <a
                                href={card.link}
                                className="
    relative
    flex justify-center items-center
    text-[var(--dark-blue)]
    font-medium text-sm
    underline
    mt-auto
    transition-transform duration-300
    hover:-translate-y-0.5
  "
                            >
                                <span
                                    className="
      relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px]
      after:w-0 after:h-[2px] after:bg-[var(--dark-blue)]
      after:transition-all after:duration-300
      hover:after:w-full
    "
                                >
                                    {translations.cards.readmore}
                                </span>
                            </a>


                        </div>
                    </div>
                ))}
            </div>

            {/* Mobil verzió - karusszel (sm és kisebb) */}
            <div className="md:hidden relative">
                <div className="overflow-hidden rounded-lg px-4">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {cards.map((card, index) => (
                            <div key={card.id} className="w-full flex-shrink-0 px-2">
                                <div className="bg-[var(--mid-blue-40)] rounded-[var(--border-radius-24)] shadow-custom-box flex flex-col h-[130vw] mb-2">
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-center mb-2">
                                            <img
                                                src={card.icon}
                                                alt={`${card.title} icon`}
                                                className="h-[100px] w-auto object-contain"
                                            />
                                        </div>
                                        <h2 className="font-bold text-center mb-1">{card.title}</h2>

                                        <p className="md-text leading-relaxed flex-grow text-center">
                                            {card.text}
                                        </p>
                                        <a
                                            href={card.link}
                                            className="
    relative
    flex justify-center items-center
    text-[var(--dark-blue)]
    font-medium text-sm
    underline
    mt-auto
    transition-transform duration-300
    hover:-translate-y-0.5
  "
                                        >
                                            <span
                                                className="
      relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px]
      after:w-0 after:h-[2px] after:bg-[var(--dark-blue)]
      after:transition-all after:duration-300
      hover:after:w-full
    "
                                            >
                                                {translations.cards.readmore}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigációs nyíl gombok */}
                <button
                    onClick={prevSlide}
                    disabled={isAnimating}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 bg-[var(--dark-blue)] backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 hover:bg-white ${isAnimating ? 'opacity-50' : ''
                        }`}
                >
                    <ChevronLeft className="w-5 h-5 text-[var(--light-blue)]" />
                </button>

                <button
                    onClick={nextSlide}
                    disabled={isAnimating}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--dark-blue)] backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 hover:bg-white ${isAnimating ? 'opacity-50' : ''
                        }`}
                >
                    <ChevronRight className="w-5 h-5 text-[var(--light-blue)]" />
                </button>

                {/* Indikátor pontok */}
                <div className="flex justify-center mt-4 space-x-2">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            disabled={isAnimating}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-[var(--dark-blue)]' : 'bg-gray-300'
                                }`}
                            aria-label={`${index + 1}. kártya`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResponsiveCardCarousel;