import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 py-6 border-t">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>
            Visit this page for <a 
              href="/about" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline decoration-dotted"
            >
                project context 
                </a>
                {' • '}
          Developed by Richard Djarbeng | {currentYear}.
          {' • '}
          <a 
              href="https://github.com/RDjarbeng/air-quality-analysis_dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline decoration-dotted"
            >
                 View on GitHub  
                </a>
                 
          {' • '}
          <span>Air quality Data obtained from{' '}
            <a 
              href="https://www.airnow.gov/international/us-embassies-and-consulates/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline decoration-dotted"
            >
              AirNow.gov
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}