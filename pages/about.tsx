import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import CustomSlider from '@/components/CustomSlider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap, SparkleIcon, User } from 'lucide-react';
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
const AboutPage: React.FC = () => {
  return (
    <div className="px-4 py-8">
      <div className="mb-8 flex w-full flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex aspect-square flex-shrink items-center justify-center md:w-1/3">
          <div className="relative aspect-square w-48 overflow-hidden rounded-full lg:w-56">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <CustomSlider>
            {slides.map((slide, index) => (
              <Card key={index} className="w-full flex-shrink-0">
                <CardHeader>
                  <CardTitle className="flex items-center md:text-3xl">
                    {slide.icon} {slide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{slide.content}</p>
                </CardContent>
              </Card>
            ))}
          </CustomSlider>
        </div>
      </div>
      <div className="flex w-full items-center p-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Contact Me</h2>
          <p className="break-words">
            <span className="font-semibold">Email:</span>{' '}
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
    </div>
  );
};

export default AboutPage;
