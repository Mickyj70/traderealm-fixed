import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProposalList = ({ proposals, onSelect }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProposals = proposals.filter(proposal => {
    const matchesFilter = filter === 'all' || proposal.status === filter;
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-turquoise';
      case 'pending':
        return 'bg-lavender';
      case 'passed':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-deepViolet';
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search proposals..."
            className="w-full p-3 rounded-lg bg-deepViolet/30 border border-lavender/20 text-lavender focus:outline-none focus:border-turquoise"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'passed', 'rejected'].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === status
                  ? 'bg-turquoise text-deepViolet'
                  : 'bg-deepViolet/30 text-lavender hover:bg-deepViolet/50'
              }`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Proposal Cards */}
      <div className="grid gap-4">
        {filteredProposals.map((proposal) => (
          <motion.div
            key={proposal.id}
            className="p-6 rounded-xl border border-lavender/20 bg-deepViolet/50 cursor-pointer hover:border-turquoise/50 transition-colors"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(proposal)}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-turquoise">
                {proposal.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(proposal.status)}`}>
                {proposal.status}
              </span>
            </div>

            <p className="text-lavender/80 mb-4 line-clamp-2">
              {proposal.description}
            </p>

            <div className="flex items-center justify-between text-sm text-lavender/60">
              <div>
                <span>Start: </span>
                <span className="text-turquoise">{new Date(proposal.startDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span>End: </span>
                <span className="text-turquoise">{new Date(proposal.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            {proposal.results && (
              <div className="mt-4">
                <div className="h-2 rounded-full bg-deepViolet/50 overflow-hidden">
                  {Object.entries(proposal.results).map(([option, percentage]) => (
                    <motion.div
                      key={option}
                      className={`h-full ${
                        option === 'yes' ? 'bg-turquoise' : 'bg-lavender'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  {Object.entries(proposal.results).map(([option, percentage]) => (
                    <span key={option} className="text-lavender">
                      {option}: {percentage}%
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProposals.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lavender/60">
            No proposals found matching your criteria
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProposalList; 