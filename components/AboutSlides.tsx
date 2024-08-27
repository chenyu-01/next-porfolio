import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  User,
  Briefcase,
  GraduationCap,
  SparkleIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export default function AboutSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  }, []);
  const clickNextSlide = () => {
    nextSlide();
    setIsClicked(true);
    setInterval(() => {
      setIsClicked(false);
    }, 3000);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
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

  const slides = [
    {
      title: 'Personal Info',
      icon: <User className="mr-2" />,
      content:
        "Hi, my name is Chen Yu. I'm a passionate web developer with a keen interest in creating interactive and user-friendly web applications.",
    },
    {
      title: 'Work Experience',
      icon: <Briefcase className="mr-2" />,
      content:
        'I have worked as a frontend dev intern at Total ebiz Solutions from Mar 2024 to July 2024 for 5 months.',
    },
    {
      title: 'Education',
      icon: <GraduationCap className="mr-2" />,
      content:
        'I completed Graduate Diploma in System Analysis from National University of Singapore, and currently pursuing Master of Technology in Software Engineering in NUS.',
    },
    {
      title: 'Tech & Skills',
      icon: <SparkleIcon className="mr-2" />,
      content:
        'I have experience with various technologies and frameworks. This website is built with Next.js and Tailwind CSS.',
    },
  ];
  return (
    <Card className="h-full overflow-hidden">
      <div
        className={cn(
          'transition-transform duration-500 ease-in-out',
          `md:-translate-x-[${currentSlide * 100}%]`
        )}
      >
        <div className="relative flex flex-col md:flex-row">
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <CardHeader>
                <CardTitle className="flex items-center md:text-3xl">
                  {slide.icon} {slide.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{slide.content}</p>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden justify-between px-4 pb-4 md:flex">
        <Button onClick={clickPrevSlide} variant="ghost" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button onClick={clickNextSlide} variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
