import React, { useState, useEffect } from 'react';
import './Space.css';

const Spaces = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameover'
  const [ship, setShip] = useState({ x: 50, y: 90 });
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const bulletInterval = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets.map((bullet) => ({ ...bullet, y: bullet.y - 2 })).filter((bullet) => bullet.y > 0)
      );

      setEnemies((prevEnemies) =>
        prevEnemies.map((enemy) => ({
          ...enemy,
          x: enemy.x + enemy.dx,
          y: enemy.y + enemy.dy,
        }))
      );

      checkCollisions();
    }, 100);

    return () => clearInterval(bulletInterval);
  }, [enemies, bullets, gameState]);

  const handleKeyDown = (e) => {
    if (gameState !== 'playing') return;

    if (e.key === 'ArrowLeft' && ship.x > 0) {
      setShip((prevShip) => ({ ...prevShip, x: prevShip.x - 5 }));
    }
    if (e.key === 'ArrowRight' && ship.x < 95) {
      setShip((prevShip) => ({ ...prevShip, x: prevShip.x + 5 }));
    }
    if (e.key === ' ') {
      setBullets((prevBullets) => [...prevBullets, { x: ship.x + 2.5, y: ship.y }]);
    }
  };

  const checkCollisions = () => {
    setBullets((prevBullets) =>
      prevBullets.filter((bullet) => {
        const collidedEnemy = enemies.find(
          (enemy) =>
            enemy.x >= bullet.x - 2 &&
            enemy.x <= bullet.x + 2 &&
            enemy.y >= bullet.y - 2 &&
            enemy.y <= bullet.y + 2
        );
        if (collidedEnemy) {
          setEnemies((prevEnemies) =>
            prevEnemies.filter((enemy) => enemy !== collidedEnemy)
          );
          setScore((prevScore) => prevScore + 10);
          return false;
        }
        return true;
      })
    );

    const collidedEnemy = enemies.find(
      (enemy) =>
        enemy.x >= ship.x - 2 &&
        enemy.x <= ship.x + 2 &&
        enemy.y >= ship.y - 2 &&
        enemy.y <= ship.y + 2
    );
    if (collidedEnemy) {
      setGameState('gameover');
    }
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const enemyInterval = setInterval(() => {
      const newEnemy = {
        x: Math.random() * 90,
        y: 0,
        dx: Math.random() * 4 - 2,
        dy: Math.random() * 2 + 1,
      };
      setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
    }, 1000);
    return () => clearInterval(enemyInterval);
  }, [gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ship, gameState]);

  const startGame = () => {
    setGameState('playing');
    setShip({ x: 50, y: 90 });
    setBullets([]);
    setEnemies([]);
    setScore(0);
  };

  const restartGame = () => {
    setGameState('playing');
    setShip({ x: 50, y: 90 });
    setBullets([]);
    setEnemies([]);
    setScore(0);
  };

  return (
    <div className="space-game">
      <h1>Space Game</h1>
      <p>Score: {score}</p>
      {gameState === 'start' && <button onClick={startGame}>Start Game</button>}
      {gameState === 'gameover' && (
        <div className="dialog-box">
          <p>Game Over! Your score: {score}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
      <div className="game-area">
        {gameState === 'playing' && <Ship position={ship} />}
        {gameState === 'playing' &&
          bullets.map((bullet, index) => (
            <Bullet key={index} position={bullet} />
          ))}
        {gameState === 'playing' &&
          enemies.map((enemy, index) => (
            <Enemy key={index} position={enemy} />
          ))}
      </div>
    </div>
  );
};

const Ship = ({ position }) => {
  return (
    <div
      className="ship"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <img src="https://img.icons8.com/ios-filled/50/ffffff/rocket.png" alt="ship" />
    </div>
  );
};

const Bullet = ({ position }) => {
  return (
    <div
      className="bullet"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    />
  );
};

const Enemy = ({ position }) => {
  return (
    <div
      className="enemy"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <img src="https://img.icons8.com/ios-filled/50/ff0000/rock.png" alt="enemy" />
    </div>
  );
};

export default Spaces;