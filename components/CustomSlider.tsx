import type { ReactElement } from 'react';

import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
const renderSlides = (
  slides: Array<ReactElement>,
  currentSlide: number,
  className?: string
) => {
  const nextSlide = (currentSlide + 1) % slides.length;
  const prevSlide = (currentSlide - 1 + slides.length) % slides.length;

  return (
    <div className={cn('relative h-64 overflow-hidden', className)}>
      {slides.map((slide, index) => {
        return (
          <div
            key={index}
            className={cn(
              'absolute left-0 top-0 flex h-64 w-full items-center justify-center opacity-0 transition-all duration-500 ease-in-out',
              currentSlide === index && 'translate-x-0 opacity-100',
              nextSlide === index && 'translate-x-full',
              prevSlide === index && '-translate-x-full'
            )}
          >
            {slide}
          </div>
        );
      })}
    </div>
  );
};

export default function CustomSlider({
  children,
  className,
}: {
  children: ReactElement[];
  className?: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % children.length);
      setIsAnimating(false);
    }, 500);
  }, [children.length, isAnimating]);
  const clickNextSlide = () => {
    nextSlide();
    setIsClicked(true);
    setInterval(() => {
      setIsClicked(false);
    }, 3000);
  };
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + children.length) % children.length);
      setIsAnimating(false);
    }, 500);
  };
  const clickPrevSlide = () => {
    prevSlide();
    setIsClicked(true);
    setInterval(() => {
      setIsClicked(false);
    }, 3000);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTabVisible && !isClicked) {
      interval = setInterval(nextSlide, 3000);
      if (window.outerWidth < 768) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTabVisible, nextSlide, isClicked]);
  return (
    <div>
      <div>{renderSlides(children, currentSlide, className)}</div>
      <div className="hidden justify-between px-4 pb-4 md:flex">
        <Button onClick={clickPrevSlide} variant="ghost" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button onClick={clickNextSlide} variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
