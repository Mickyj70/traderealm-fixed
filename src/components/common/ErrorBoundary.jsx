/* eslint-disable no-unused-vars */
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 border rounded-lg bg-red-900/20 border-red-500/50">
          <h2 className="mb-4 text-xl font-bold text-red-400">
            Something went wrong
          </h2>
          <details className="text-sm text-gray-300 whitespace-pre-wrap">
            <summary className="mb-2 cursor-pointer">
              View error details
            </summary>
            <p className="mt-2">
              {this.state.error && this.state.error.toString()}
            </p>
            <p className="mt-2 font-mono text-xs">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
