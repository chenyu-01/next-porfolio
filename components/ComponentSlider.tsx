import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import next from 'next';

const renderSlides = (
  slides: number[],
  currentSlide: number,
  direction: 'next' | 'prev'
) => {
  const toBeginning =
    direction === 'next' && currentSlide === slides.length - 1;
  const toEnd = direction === 'prev' && currentSlide === 0;
  const nextSlide = toBeginning ? 0 : currentSlide + 1;
  const prevSlide = toEnd ? slides.length - 1 : currentSlide - 1;
  return (
    <div className="relative">
      {slides.map((slide, index) => {
        return (
          <div
            key={index}
            className={cn(
              'absolute left-0 top-0 flex h-64 w-full items-center justify-center opacity-0 transition-all duration-500 ease-in-out',
              currentSlide === index && 'translate-x-0 opacity-100',
              nextSlide === index && 'translate-x-20 opacity-100',
              prevSlide === index && '-translate-x-20 opacity-100'
            )}
          >
            {slide}
            <div className="flex h-3 w-3 items-center justify-center bg-primary p-4"></div>
          </div>
        );
      })}
    </div>
  );
};

export default function ComponentSlider() {
  const slides = [1, 2, 3, 4];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative">
      index: {currentSlide}
      <div className="mb-4 flex space-x-3">
        <Button onClick={prevSlide}>Prev</Button>
        <Button onClick={nextSlide}>Next</Button>
      </div>
      <div className="relative h-64 overflow-hidden">
        {renderSlides(slides, currentSlide, direction)}
      </div>
    </div>
  );
}
