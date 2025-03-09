import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 py-6 border-t bg-gray-50">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          {/* Project Context Link */}
          <p>
            Curious about the project?{' '}
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline decoration-dotted"
            >
              Explore Kigali’s Air
            </a>
          </p>

          {/* Separator for small screens */}
          <span className="hidden md:inline"> • </span>

          {/* Developer Credit */}
          <p>
            Built by{' '}
            <span className="font-semibold text-gray-700">Richard Djarbeng</span> | {currentYear}
          </p>

          {/* Separator for small screens */}
          <span className="hidden md:inline"> • </span>

          {/* GitHub Link */}
          <p>
            <a
              href="https://github.com/RDjarbeng/air-quality-analysis_dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline decoration-dotted"
            >
              View on GitHub
            </a>
          </p>

          {/* Separator for small screens */}
          <span className="hidden md:inline"> • </span>

          {/* Data Source */}
          <p>
            Data from{' '}
            <a
              href="https://www.airnow.gov/international/us-embassies-and-consulates/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline decoration-dotted"
            >
              AirNow.gov
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}