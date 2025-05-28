import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Main container for TicTacToe Classic.
   * Features:
   *   - Two player mode (X and O, play on same device)
   *   - Win and draw detection
   *   - Status messaging & game reset
   *   - Color theme: primary: #b52121, secondary: #d94a4a, accent: #3b873e (light mode)
   */

  // Game board is 9 cells, null/"X"/"O"
  const [board, setBoard] = useState(Array(9).fill(null));
  // X always goes first
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next: Player X");

  // Returns 'X', 'O', 'draw', or null for the state of current game
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    if (squares.every((sq) => sq !== null)) return "draw";
    return null;
  }

  // Handle click on a grid cell
  function handleClick(idx) {
    // If already filled or game over, ignore clicks
    if (board[idx] || calculateWinner(board)) return;

    const squares = board.slice();
    squares[idx] = xIsNext ? "X" : "O";
    setBoard(squares);

    const winner = calculateWinner(squares);

    if (winner === "X") {
      setStatus("Winner: Player X");
    } else if (winner === "O") {
      setStatus("Winner: Player O");
    } else if (winner === "draw") {
      setStatus("It's a draw!");
    } else {
      setStatus(`Next: Player ${xIsNext ? "O" : "X"}`);
      setXIsNext(!xIsNext);
    }
  }

  // Reset game to initial state
  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus("Next: Player X");
  }

  // Inline styles for simplicity (theme colors)
  const rootColor = "#f5f5f5";
  const colorPrimary = "#b52121";
  const colorSecondary = "#d94a4a";
  const colorAccent = "#3b873e";
  const borderColor = "#ddd";
  const cellFontColor = "#222";

  // The game board cells
  function renderCell(idx) {
    const value = board[idx];
    let cellStyle = {
      width: 64,
      height: 64,
      background: "#fff",
      border: `1.5px solid ${borderColor}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.5rem",
      fontWeight: 600,
      cursor: value || calculateWinner(board) ? "default" : "pointer",
      color:
        value === "X"
          ? colorPrimary
          : value === "O"
          ? colorAccent
          : cellFontColor,
      transition: "background 0.15s, color 0.2s",
      userSelect: "none",
    };
    // Win line highlight
    const winner = calculateWinner(board);
    if (
      winner &&
      winner !== "draw" &&
      value === winner
    ) {
      cellStyle.background =
        value === "X"
          ? "#fbd8d8"
          : "#d0f3d0";
      cellStyle.border = `2px solid ${value === "X" ? colorPrimary : colorAccent}`;
    }
    return (
      <button
        key={idx}
        style={cellStyle}
        onClick={() => handleClick(idx)}
        aria-label={`TicTacToe Cell ${idx + 1}`}
        disabled={!!value || !!calculateWinner(board)}
      >
        {value}
      </button>
    );
  }

  // Mantain status message style
  const statusStyle = {
    margin: "20px 0 12px 0",
    fontSize: "1.25rem",
    fontWeight: 500,
    color:
      status.indexOf("X") !== -1
        ? colorPrimary
        : status.indexOf("O") !== -1
        ? colorAccent
        : colorSecondary,
    minHeight: "1.5em",
    letterSpacing: "0.02em"
  };

  // Main container style
  const containerStyle = {
    minHeight: "100vh",
    minWidth: "100vw",
    background: rootColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    margin: 0,
    transition: "background 0.3s",
  };

  // Box for game grid & controls
  const boxStyle = {
    background: "#fff",
    padding: "32px 28px 20px 28px",
    borderRadius: "18px",
    boxShadow: "0 4px 40px rgba(181,33,33,0.09)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 340,
    maxWidth: "90vw",
    border: `1.5px solid ${colorPrimary}22`,
  };

  // Game grid styling
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3,64px)",
    gridTemplateRows: "repeat(3,64px)",
    gap: "0px", // borders visually divide
    margin: "8px 0 16px 0",
    borderRadius: "14px",
    background: "#fdfbfa"
  };

  // Reset button
  const buttonStyle = {
    marginTop: "10px",
    background: colorSecondary,
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 26px",
    fontSize: "1.04rem",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.03em",
    boxShadow: "0 2px 16px #d94a4a18",
    transition: "background 0.25s",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle} className="tictactoe-classic-main">
        <h1
          style={{
            color: colorPrimary,
            fontWeight: 800,
            fontSize: "2.6rem",
            margin: "0 0 7px 0",
            letterSpacing: "0.05em",
            fontFamily:
              "'Montserrat', 'Arial Rounded MT', Arial, sans-serif",
          }}
        >
          TicTacToe Classic
        </h1>
        <div style={statusStyle}>{status}</div>
        <div style={gridStyle}>
          {Array.from({ length: 9 }).map((_, idx) => renderCell(idx))}
        </div>
        <button style={buttonStyle} onClick={handleReset}>
          Reset Game
        </button>
        <div style={{ fontSize: "0.97em", marginTop: "7px", color: "#88888892" }}>
          Two player mode &bull; Theme&nbsp;
          <span style={{ color: colorPrimary }}>■</span>
          <span style={{ color: colorSecondary, margin: "0 2px" }}>■</span>
          <span style={{ color: colorAccent }}>■</span>
        </div>
      </div>
    </div>
  );
}

export default TicTacToeClassic;
