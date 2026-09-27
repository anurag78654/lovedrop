import { Component } from 'react';

/**
 * ErrorBoundary - Catches JavaScript errors in child components
 * Shows a friendly error page instead of a blank white screen
 *
 * Usage: wrap routes or risky components with <ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log for debugging (could send to monitoring service later)
    console.error('LoveDrop error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
          <div className="text-7xl mb-6">😵</div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">
            Oops, something broke!
          </h1>

          <p className="text-gray-500 max-w-md mb-6">
            Don't worry — your letter is safe. This is just a temporary glitch
            on our side.
          </p>

          {/* Technical detail (collapsible) */}
          {this.state.error && (
            <details className="mb-8 max-w-lg w-full text-left">
              <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">
                Technical details
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded-lg text-xs text-gray-600 overflow-auto max-h-40">
                {String(this.state.error.message || this.state.error)}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                this.handleReset();
                window.location.href = '/';
              }}
              className="px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-all shadow-lg"
            >
              🏠 Back to Safety
            </button>
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-white text-primary-600 font-medium rounded-xl border-2 border-primary-200 hover:border-primary-400 transition-all"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
