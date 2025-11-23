import React from 'react';
import { Container } from '@/shared/components/Container';
import { Button } from '@/shared/components/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Create Your First Landing Page?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of businesses already using Lomira to create stunning landing pages that convert.
            No credit card required. Start building today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Schedule a Demo
            </Button>
          </div>
          <p className="text-blue-100 text-sm mt-6">
            ✨ Free forever plan available • No credit card required
          </p>
        </div>
      </Container>
    </section>
  );
};

