import React, { useState, useEffect, useRef } from "react";
import "./snake.css";
import eatSound from "./sounds/eat.mp3";
import gameOverSound from "./sounds/over.wav";

const Direction = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
};

const getRandomCoordinate = (exclude = [], cols, rows) => {
    let coord;
    do {
        coord = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
        };
    } while (exclude.some((segment) => segment.x === coord.x && segment.y === coord.y));
    return coord;
};

const SnakeGame = () => {
    const [snake, setSnake] = useState([
        { x: 10, y: 10 },
        { x: 10, y: 11 },
    ]);
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [food, setFood] = useState(getRandomCoordinate(snake, 20, 20));
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [cellSize, setCellSize] = useState(20);
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(20);
    const gameContainerRef = useRef(null);
    const eatSoundRef = useRef(new Audio(eatSound));
    const gameOverSoundRef = useRef(new Audio(gameOverSound));

    const handleKeyDown = (e) => {
        if (isGameStarted && !gameOver) {
            switch (e.key) {
                case "ArrowUp":
                    if (direction !== Direction.DOWN) setDirection(Direction.UP);
                    break;
                case "ArrowDown":
                    if (direction !== Direction.UP) setDirection(Direction.DOWN);
                    break;
                case "ArrowLeft":
                    if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
                    break;
                case "ArrowRight":
                    if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const gameContainer = gameContainerRef.current;
            if (gameContainer) {
                const { clientWidth, clientHeight } = gameContainer;
                const newCellSize = Math.min(clientWidth / cols, clientHeight / rows);
                setCellSize(newCellSize);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [cols, rows]);

    useEffect(() => {
        if (isGameStarted) {
            const interval = setInterval(() => moveSnake(), 180);
            return () => clearInterval(interval);
        }
    }, [isGameStarted, direction]);

    useEffect(() => {
        gameContainerRef.current?.focus();
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isGameStarted, gameOver, direction]);

    const moveSnake = () => {
        const newSnake = [...snake];
        let newHead = { ...newSnake[0] };

        switch (direction) {
            case Direction.UP:
                newHead.y -= 1;
                break;
            case Direction.DOWN:
                newHead.y += 1;
                break;
            case Direction.LEFT:
                newHead.x -= 1;
                break;
            case Direction.RIGHT:
                newHead.x += 1;
                break;
            default:
                break;
        }

        if (
            newHead.x < 0 ||
            newHead.x >= cols ||
            newHead.y < 0 ||
            newHead.y >= rows ||
            newSnake.slice(1).some(
                (segment) => segment.x === newHead.x && segment.y === newHead.y
            )
        ) {
            setGameOver(true);
            setIsGameStarted(false);
            gameOverSoundRef.current.play();
            return;
        }

        newSnake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            setFood(getRandomCoordinate(newSnake, cols, rows));
            setScore(score + 1);
            eatSoundRef.current.play();
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    const startGame = () => {
        setIsGameStarted(true);
        setGameOver(false);
        setScore(0);
        setSnake([
            { x: 10, y: 10 },
            { x: 10, y: 11 },
        ]);
        setFood(getRandomCoordinate([
            { x: 10, y: 10 },
            { x: 10, y: 11 },
        ], cols, rows));
    };

    const resetGame = () => {
        setIsGameStarted(false);
        setGameOver(false);
        setSnake([
            { x: 10, y: 10 },
            { x: 10, y: 11 },
        ]);
        setFood(getRandomCoordinate(snake, cols, rows));
        setScore(0);
    };

    const handleDirectionChange = (newDirection) => {
        if (!gameOver && isGameStarted) {
            if (newDirection === Direction.UP && direction !== Direction.DOWN) {
                setDirection(Direction.UP);
            } else if (newDirection === Direction.DOWN && direction !== Direction.UP) {
                setDirection(Direction.DOWN);
            } else if (newDirection === Direction.LEFT && direction !== Direction.RIGHT) {
                setDirection(Direction.LEFT);
            } else if (newDirection === Direction.RIGHT && direction !== Direction.LEFT) {
                setDirection(Direction.RIGHT);
            }
        }
    };

    return (
        <div className="game-container">
            {gameOver && (
                <div style={{ color: "red", marginTop: "10px" }}>
                    Game Over! Your score was: {score}
                </div>
            )}
            <div style={{ marginTop: "20px" }}>
                {!isGameStarted && !gameOver && (
                    <button onClick={startGame}>Start Game</button>
                )}
                {(isGameStarted || gameOver) && (
                    <button onClick={resetGame}>Reset Game</button>
                )}
                <p>Score: {score}</p>
            </div>
            <div
                ref={gameContainerRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                style={{
                    width: "100%",
                    height: `${rows * cellSize}px`,
                    position: "relative",
                    overflow: "hidden",
                    outline: "solid 6px blue",
                    backgroundColor: "black",
                }}
            >
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className="snake-segment"
                        style={{
                            top: segment.y * cellSize,
                            left: segment.x * cellSize,
                            width: cellSize,
                            height: cellSize,
                        }}
                    />
                ))}
                <div
                    className="food"
                    style={{
                        top: food.y * cellSize,
                        left: food.x * cellSize,
                        width: cellSize,
                        height: cellSize,
                    }}
                />
            </div>
            <div className="controls">
                <div className="controls-row">
                    <button onClick={() => handleDirectionChange(Direction.UP)}>Up</button>
                </div>
                <div className="controls-row">
                    <button onClick={() => handleDirectionChange(Direction.LEFT)}>Left</button>
                    {isGameStarted || gameOver ? (
                        <button onClick={resetGame}>Reset Game</button>
                    ) : (
                        <button onClick={startGame}>Start Game</button>
                    )}
                    <button onClick={() => handleDirectionChange(Direction.RIGHT)}>Right</button>
                </div>
                <div className="controls-row">
                    <button onClick={() => handleDirectionChange(Direction.DOWN)}>Down</button>
                </div>
                <p>Score: {score}</p>
            </div>
        </div>
    );
};

export default SnakeGame;
