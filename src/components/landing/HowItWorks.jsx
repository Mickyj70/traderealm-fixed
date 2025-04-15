import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Acquire BARON Tokens',
      description: 'Purchase BARON tokens to gain voting power and access to the protocol\'s features.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-turquoise'
    },
    {
      title: 'Control Trade Routes',
      description: 'Use your BARON tokens to control trade routes and collect tariffs from traders.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'text-lavender'
    },
    {
      title: 'Participate in Governance',
      description: 'Vote on protocol changes and help shape the future of the trade empire.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'text-purple-400'
    },
    {
      title: 'Earn Rewards',
      description: 'Receive a share of protocol revenue and grow your influence in the empire.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      color: 'text-green-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-deepViolet">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-turquoise mb-4">
            How TradeRealm Works
          </h2>
          <p className="text-xl text-lavender/80 max-w-2xl mx-auto">
            Join the decentralized trade empire and become a powerful baron controlling trade routes and shaping the future of commerce.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-xl border border-lavender/20 bg-deepViolet/50"
              variants={itemVariants}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-turquoise flex items-center justify-center text-deepViolet font-bold">
                {index + 1}
              </div>

              {/* Step Content */}
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-full ${step.color.replace('text', 'bg')}/10 flex items-center justify-center ${step.color}`}>
                  {step.icon}
                </div>
                <h3 className={`text-xl font-bold ${step.color}`}>
                  {step.title}
                </h3>
                <p className="text-lavender/80">
                  {step.description}
                </p>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 right-0 w-8 h-0.5 bg-lavender/20 hidden lg:block">
                  <motion.div
                    className="h-full bg-turquoise"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Timeline */}
        <motion.div
          className="mt-16 relative hidden lg:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5 bg-lavender/20">
              <motion.div
                className="h-full bg-turquoise"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
            </div>
          </div>
          <div className="relative flex justify-between">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className="w-4 h-4 rounded-full bg-turquoise"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 