import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" style={{ opacity: 0.65, pointerEvents: "none" }}>
              TicTacToe Demo
            </button>
          </div>
        </div>
      </nav>
      <main>
        {/* Main TicTacToe Game Container */}
        <TicTacToeClassic />
      </main>
    </div>
  );
}

export default App;