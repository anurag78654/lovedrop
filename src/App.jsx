import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

// Route-level code splitting: only Home + 404 load initially.
// Create/View/Gallery (with effects, games, howler usage) load on demand.
const Create = lazy(() => import('./pages/Create.jsx'));
const View = lazy(() => import('./pages/View.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));

function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-5xl mb-4 animate-bounce">💌</div>
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/letter/:id" element={<View />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
