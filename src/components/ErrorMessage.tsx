import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry,
  className = '' 
}) => {
  return (
    <div className={`text-center py-20 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <p className="text-red-600 mb-4 text-lg font-medium">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

