import React, { useState, useEffect, useRef } from "react";
import "./snake.css";
import eatSound from "./sounds/eat.mp3";
import gameOverSound from "./sounds/over.wav";

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
        if (isGameStarted) {
            const interval = setInterval(() => moveSnake(), 150); // Slow down the game for better control
            return () => clearInterval(interval);
        }
    }, [snake, isGameStarted, direction]);

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

        // Check collision with walls or itself
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
            gameOverSoundRef.current.play();
            return;
        }

        newSnake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            setFood(getRandomCoordinate(newSnake));
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
        setFood(getRandomCoordinate(snake));
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
                <div className="game-over-message">
                    Game Over Your score was: {score}
                </div>
            )}
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
                            top: segment.y * CELL_SIZE,
                            left: segment.x * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                        }}
                    />
                ))}
                <div
                    className="food"
                    style={{
                        top: food.y * CELL_SIZE,
                        left: food.x * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                    }}
                />
            </div>

            <div className="controls">
                <button className="left" onClick={() => handleDirectionChange(Direction.LEFT)}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className="controls-row">
                    <button className="up" onClick={() => handleDirectionChange(Direction.UP)}>
                        <i className="fas fa-arrow-up"></i>
                    </button>
                    <button className="center" onClick={isGameStarted || gameOver ? resetGame : startGame}>
                        {isGameStarted || gameOver ? "Reset" : "Start"}
                    </button>
                    <button className="down" onClick={() => handleDirectionChange(Direction.DOWN)}>
                        <i className="fas fa-arrow-down"></i>
                    </button>
                </div>
                <button className="right" onClick={() => handleDirectionChange(Direction.RIGHT)}>
                    <i className="fas fa-arrow-right"></i>
                </button>
                <p>Score: {score}</p>
            </div>
        </div>
    );
};

export default SnakeGame;
