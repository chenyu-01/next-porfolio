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
const TestPage = () => {
  return (
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
  );
};
export default TestPage;
