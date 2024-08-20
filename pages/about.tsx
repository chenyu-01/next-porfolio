import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { User, Briefcase, GraduationCap, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">About Me</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" /> Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Hi, my name is Chen Yu. I&apos;m a passionate web developer with a
              keen interest in creating beautiful and functional websites.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2" /> Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              I have worked as an frontend developer at Total ebiz Solutions
              from Mar 2024 to July 2024 for 5 months.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              I completed Graduate Diploma in System Analysis from National
              University of Singapore, and currently pursuing Master of
              Technology in Software Engineering in NUS.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2" /> Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>When I&apos;m not coding, I enjoy [Your Interests/Hobbies].</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
