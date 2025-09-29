import React, { useState, useEffect } from 'react';
import './App.css';

interface Manifestation {
  id: number;
  text: string;
  category: 'personal' | 'career' | 'relationships' | 'health' | 'spiritual';
  createdAt: Date;
  completed: boolean;
}

function App() {
  const [manifestations, setManifestations] = useState<Manifestation[]>([]);
  const [newManifestation, setNewManifestation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Manifestation['category']>('personal');
  const [filter, setFilter] = useState<'all' | Manifestation['category']>('all');
  const [healthStatus, setHealthStatus] = useState<'checking' | 'healthy' | 'error'>('checking');

  useEffect(() => {
    // Check backend health
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
    fetch(`${backendUrl}/healthz`)
      .then(res => res.json())
      .then(() => setHealthStatus('healthy'))
      .catch(() => setHealthStatus('error'));

    // Load manifestations from localStorage
    const saved = localStorage.getItem('manifestations');
    if (saved) {
      setManifestations(JSON.parse(saved).map((m: any) => ({
        ...m,
        createdAt: new Date(m.createdAt)
      })));
    }
  }, []);

  const saveManifestations = (updated: Manifestation[]) => {
    setManifestations(updated);
    localStorage.setItem('manifestations', JSON.stringify(updated));
  };

  const addManifestation = () => {
    if (!newManifestation.trim()) return;

    const newItem: Manifestation = {
      id: Date.now(),
      text: newManifestation,
      category: selectedCategory,
      createdAt: new Date(),
      completed: false
    };

    saveManifestations([...manifestations, newItem]);
    setNewManifestation('');
  };

  const toggleComplete = (id: number) => {
    const updated = manifestations.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    );
    saveManifestations(updated);
  };

  const deleteManifestation = (id: number) => {
    saveManifestations(manifestations.filter(m => m.id !== id));
  };

  const filteredManifestations = manifestations.filter(m => 
    filter === 'all' || m.category === filter
  );

  const getCategoryEmoji = (category: Manifestation['category']) => {
    const emojis = {
      personal: '🎯',
      career: '💼',
      relationships: '❤️',
      health: '🌱',
      spiritual: '✨'
    };
    return emojis[category];
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>✨ ManiDex - Social Manifestation</h1>
        <p className="tagline">Transform your dreams into reality</p>
        
        {healthStatus === 'healthy' && (
          <div className="health-indicator">🟢 Connected to backend</div>
        )}
        {healthStatus === 'error' && (
          <div className="health-indicator error">🔴 Backend offline (local storage mode)</div>
        )}
      </header>

      <main className="main-content">
        <div className="add-section">
          <h2>Create Your Manifestation</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="What do you want to manifest?"
              value={newManifestation}
              onChange={(e) => setNewManifestation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addManifestation()}
              className="manifestation-input"
            />
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value as Manifestation['category'])}
              className="category-select"
            >
              <option value="personal">🎯 Personal</option>
              <option value="career">💼 Career</option>
              <option value="relationships">❤️ Relationships</option>
              <option value="health">🌱 Health</option>
              <option value="spiritual">✨ Spiritual</option>
            </select>
            <button onClick={addManifestation} className="add-button">
              Add Manifestation
            </button>
          </div>
        </div>

        <div className="filter-section">
          <h3>Filter by Category:</h3>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All ({manifestations.length})
            </button>
            {(['personal', 'career', 'relationships', 'health', 'spiritual'] as const).map(cat => (
              <button
                key={cat}
                className={filter === cat ? 'active' : ''}
                onClick={() => setFilter(cat)}
              >
                {getCategoryEmoji(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                ({manifestations.filter(m => m.category === cat).length})
              </button>
            ))}
          </div>
        </div>

        <div className="manifestations-list">
          <h2>Your Manifestations</h2>
          {filteredManifestations.length === 0 ? (
            <p className="empty-state">No manifestations yet. Start creating your reality!</p>
          ) : (
            <ul>
              {filteredManifestations.map(manifestation => (
                <li key={manifestation.id} className={`manifestation-item ${manifestation.completed ? 'completed' : ''}`}>
                  <div className="manifestation-content">
                    <span className="category-emoji">{getCategoryEmoji(manifestation.category)}</span>
                    <div className="text-content">
                      <p className="manifestation-text">{manifestation.text}</p>
                      <p className="manifestation-date">
                        {manifestation.createdAt.toLocaleDateString()} at {manifestation.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="actions">
                    <button 
                      onClick={() => toggleComplete(manifestation.id)}
                      className="complete-button"
                    >
                      {manifestation.completed ? '✅ Manifested!' : '⭕ In Progress'}
                    </button>
                    <button 
                      onClick={() => deleteManifestation(manifestation.id)}
                      className="delete-button"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="stats-section">
          <h3>Your Manifestation Journey</h3>
          <div className="stats">
            <div className="stat">
              <span className="stat-value">{manifestations.length}</span>
              <span className="stat-label">Total Manifestations</span>
            </div>
            <div className="stat">
              <span className="stat-value">{manifestations.filter(m => m.completed).length}</span>
              <span className="stat-label">Manifested</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {manifestations.length > 0 
                  ? Math.round((manifestations.filter(m => m.completed).length / manifestations.length) * 100)
                  : 0}%
              </span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>© 2025 ManiDex - Manifest Your Dreams</p>
      </footer>
    </div>
  );
}

export default App;
