import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
import Link from 'next/link';

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vite',
  'Vue.js',
  'Git',
  'Nuxt.js',
  'Next.js',
  'Tailwind CSS',
];

const AboutPage: React.FC = () => {
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="flex items-center justify-center md:w-1/3">
          <div className="h-48 w-48 overflow-hidden rounded-full">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              width={256}
              height={256}
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <Card className="h-full overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="flex">
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <CardHeader>
                      <CardTitle className="flex items-center text-3xl">
                        {slide.icon} {slide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{slide.content}</p>
                      {index === 3 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="rounded-full bg-blue-500 px-2 py-1 text-sm text-white dark:bg-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between px-4 pb-4">
              <Button onClick={clickPrevSlide} variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={clickNextSlide} variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Contact Me</h2>
        <p>
          Feel free to reach out to me at{' '}
          <Link
            href="mailto:e1221685@u.nus.edu"
            className="text-blue-500 hover:underline dark:text-green-300"
          >
            e1221685@u.nus.edu
          </Link>
        </p>
        <p>
          You can also find me on{' '}
          <Link
            href="www.linkedin.com/in/yu-chen-2a4110290"
            className="text-blue-500 hover:underline dark:text-green-300"
          >
            LinkedIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
