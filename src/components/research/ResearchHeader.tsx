import React from 'react';

interface ResearchHeaderProps {
  title?: string;
  description?: string;
}

const ResearchHeader: React.FC<ResearchHeaderProps> = ({
  title = "Research Library",
  description = "Access our comprehensive collection of research reports and analysis on various crypto projects and market trends."
}) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ResearchHeader;