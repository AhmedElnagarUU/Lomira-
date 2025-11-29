import React from 'react';
import { Container } from '@/shared/components/Container';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    value: '50K+',
    label: 'Landing Pages Created',
  },
  {
    value: '10K+',
    label: 'Happy Customers',
  },
  {
    value: '99.9%',
    label: 'Uptime',
  },
  {
    value: '4.9',
    label: 'Average Rating',
    suffix: '/5',
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-white border-y border-gray-200">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {stat.value}
                {stat.suffix && <span className="text-2xl text-gray-600">{stat.suffix}</span>}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};







