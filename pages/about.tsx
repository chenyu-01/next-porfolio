import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import AboutSlides from '@/components/AboutSlides';

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
        <div className="md:w-2/3">
          <AboutSlides />
        </div>
      </div>
      <div className="space-y-4 p-2">
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
  );
};

export default AboutPage;
