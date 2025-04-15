/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import ResultsVisualization from "./ResultsVisualization";

const ProposalDetail = ({ proposal, votingPower, onVote, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleVote = (option) => {
    setSelectedOption(option);
    setShowConfirmation(true);
  };

  const handleConfirmVote = () => {
    onVote(proposal.id, selectedOption);
    setShowConfirmation(false);
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back Button */}
      <motion.button
        className="flex items-center transition-colors text-lavender hover:text-turquoise"
        onClick={onBack}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Proposals
      </motion.button>

      {/* Proposal Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-turquoise">
            {proposal.title}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              proposal.status === "active"
                ? "bg-turquoise"
                : proposal.status === "pending"
                ? "bg-lavender"
                : proposal.status === "passed"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {proposal.status}
          </span>
        </div>

        <div className="flex items-center justify-between mb-6 text-sm text-lavender/60">
          <div>
            <span>Start: </span>
            <span className="text-turquoise">
              {new Date(proposal.startDate).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span>End: </span>
            <span className="text-turquoise">
              {new Date(proposal.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="p-6 border rounded-xl border-lavender/20 bg-deepViolet/50"
        variants={itemVariants}
      >
        <h3 className="mb-4 text-lg font-bold text-turquoise">Description</h3>
        <p className="whitespace-pre-line text-lavender/80">
          {proposal.description}
        </p>
      </motion.div>

      {/* Voting Power */}
      <motion.div
        className="p-6 border rounded-xl border-lavender/20 bg-deepViolet/50"
        variants={itemVariants}
      >
        <h3 className="mb-4 text-lg font-bold text-turquoise">
          Your Voting Power
        </h3>
        <div className="mb-2 text-2xl font-bold text-turquoise">
          {votingPower.total.toLocaleString()}
        </div>
        <div className="text-sm text-lavender/60">
          This is the total voting power you can use to vote on this proposal
        </div>
      </motion.div>

      {/* Voting Options */}
      {proposal.status === "active" && (
        <motion.div
          className="p-6 border rounded-xl border-lavender/20 bg-deepViolet/50"
          variants={itemVariants}
        >
          <h3 className="mb-4 text-lg font-bold text-turquoise">
            Cast Your Vote
          </h3>
          <div className="grid gap-4">
            {proposal.options.map((option) => (
              <motion.button
                key={option.id}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedOption === option.id
                    ? "border-turquoise bg-turquoise/10 text-turquoise"
                    : "border-lavender/20 hover:border-turquoise/50 text-lavender"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVote(option.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  {selectedOption === option.id && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results */}
      {proposal.results && (
        <motion.div variants={itemVariants}>
          <ResultsVisualization results={proposal.results} />
        </motion.div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepViolet/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-full max-w-md p-6 border rounded-xl border-lavender/20 bg-deepViolet/50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="mb-4 text-xl font-bold text-turquoise">
              Confirm Your Vote
            </h3>
            <p className="mb-6 text-lavender/80">
              You are about to vote "{selectedOption}" on this proposal using{" "}
              {votingPower.total.toLocaleString()} voting power. This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 transition-colors rounded-lg text-lavender hover:text-turquoise"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 transition-colors rounded-lg bg-turquoise text-deepViolet hover:bg-turquoise/80"
                onClick={handleConfirmVote}
              >
                Confirm Vote
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProposalDetail;
