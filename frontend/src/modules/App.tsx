import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';

export function App() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('ThemeContext not available');
  const { theme, toggleTheme } = ctx;

  return (
    <div className="container">
      <header className="header">
        <h1>Theme Provider Demo</h1>
        <button className="toggle" onClick={toggleTheme} aria-label="Toggle color theme">
          {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </header>
      <main>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <p>
          This demo uses CSS variables bound to <code>data-theme</code> on <code>&lt;html&gt;</code>.
        </p>
      </main>
    </div>
  );
}

