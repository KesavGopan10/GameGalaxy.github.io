import React, { useState, useEffect, useRef } from "react";
import "./snake.css";

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;

const Direction = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
};

const getRandomCoordinate = (exclude = []) => {
    let coord;
    do {
        coord = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS),
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
    const [food, setFood] = useState(getRandomCoordinate(snake));
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(150);
    const gameContainerRef = useRef(null);

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
        if (isGameStarted) {
            const interval = setInterval(() => moveSnake(), speed);
            return () => clearInterval(interval);
        }
    }, [snake, isGameStarted, direction, speed]);

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
            newHead.x >= COLS ||
            newHead.y < 0 ||
            newHead.y >= ROWS ||
            newSnake.slice(1).some(
                (segment) => segment.x === newHead.x && segment.y === newHead.y
            )
        ) {
            setGameOver(true);
            setIsGameStarted(false);
            return;
        }

        newSnake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            setFood(getRandomCoordinate(newSnake));
            setScore(score + 1);
            setSpeed((prevSpeed) => Math.max(prevSpeed - 5, 50)); // Increase speed
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
        ]));
        setSpeed(150); // Reset speed
    };

    const resetGame = () => {
        setIsGameStarted(false);
        setGameOver(false);
        setSnake([
            { x: 10, y: 10 },
            { x: 10, y: 11 },
        ]);
        setFood(getRandomCoordinate(snake));
        setScore(0);
        setSpeed(150); // Reset speed
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
        <div
            className="game-container"
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "30px",
                borderRadius: "20px",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
            }}
        >
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
                    width: COLS * CELL_SIZE,
                    height: ROWS * CELL_SIZE,
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
                            position: "absolute",
                            top: segment.y * CELL_SIZE,
                            left: segment.x * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            backgroundColor: "green",
                            borderRadius: "4px",
                        }}
                    />
                ))}
                <div
                    className="food"
                    style={{
                        position: "absolute",
                        top: food.y * CELL_SIZE,
                        left: food.x * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: "red",
                        borderRadius: "50%",
                    }}
                />
            </div>
            
            <div className="controls" style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button onClick={() => handleDirectionChange(Direction.UP)}>Up</button>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={() => handleDirectionChange(Direction.LEFT)} style={{ marginRight: "10px" }}>Left</button>
                    <button onClick={() => handleDirectionChange(Direction.RIGHT)}>Right</button>
                </div>
                <button onClick={() => handleDirectionChange(Direction.DOWN)} style={{ marginTop: "10px" }}>Down</button>
            </div>
        </div>
    );
};

export default SnakeGame;
