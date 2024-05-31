import React, { useEffect, useState } from 'react'
import './Hangman.css'
import { Col, Container, Row } from 'react-bootstrap'
import WordList from './WordList' //1.import wordlist
import { Link } from 'react-router-dom'

function Hangman() {

    const [newWord, setWord] = useState('') //3.useState create for store word
    const [newHint, setHint] = useState('') //4.useState create for store hint
    const [guessed, setGuessed] = useState(new Set()) //8.useState create for if the typed character is correct & new Set() we can add and remove elements from set methods
    const [wrongGuess, setWrongguess] = useState(0)//10. useState created for count Wrong gussess
    const maxGuess = 6 // 14. initialise maxGuess



    const randomWord = () => {
        const { word, hint } = WordList[Math.floor(Math.random() * WordList.length)] //2. accessing word and hint from wordList
        // console.log(word,hint);
        setWord(word)
        setHint(hint)

        setGuessed(new Set()) //18. Reset guessed
        setWrongguess(0) //19.reset wrong guessess
    }
    // console.log(newWord);
    // console.log(nweHint);
    useEffect(() => { //5. Call randomWord() in useEffect
        randomWord()
    }, [])

    // 7.check the character exists in newWord
    const btnClick = (i) => {
        // console.log(i);
        if (newWord.includes(i)) {
            // console.log("yes");
            setGuessed(letter => new Set(letter.add(i)))  // 9.store the correct guessed letters into an object
        }
        else {
            // console.log("no");
            setWrongguess(wrongGuess + 1) //11.count the wrong guess
        }
    }
    // console.log(guessed);
    // console.log(wrongGuess);

    //12. create wordDisplay function s. split the word in the wodList.dynamicaly print the <li> element with respect to newWord length
    const wordDisplay = () => {
        //newWord=BICYCLE
        return newWord.split('').map((i, index) => (    //[B,I,C,Y,C,L,E]
            <li key={index} className={`letter ${guessed.has(i) ? "guessed" : ""}`} >{guessed.has(i) ? i : ""}</li>
        ))
    }

    //create a victory function for split the newWord into array & check all the elements are exists in the guessed object,if all the char is exist return true else return false
    const victory = () => {
        return newWord.split('').every(i => guessed.has(i))
    }
    return (
        <div className='hangman-main d-flex align-items-center justify-content-center min-vh-100'>

                {/* 17.if wrongGuess >= maxGuess game over model box displaying */ }
            {
                wrongGuess >= maxGuess &&
                <div className="game-model">
                    <div className="content">
                        <img src="./assets/lost.gif" alt="" />
                        <h5>The correct word was: <b>{newWord.toUpperCase()}</b></h5>
                        <h4 className='text-danger'>Game Over!</h4>
                        <button onClick={randomWord} className='play-again mt-2'>Play Again</button>
                        <Link to={'/'} style={{ textDecoration: "none" }}><button className='play-again mt-2'>Home</button></Link>
                        {/* 18. call randomWord function in inClick  */}
                    </div>
                </div>
            }

            {
                victory() &&
                <div className="game-model">
                    <div className="content">
                        <img src="./assets/victory.gif" alt="" />
                        <h4>Word: {newWord.toUpperCase()}</h4>
                        <h4 className='text-success'>You Won...!</h4>
                        <button onClick={randomWord} className='play-again mt-2'>Play Again</button>
                        <Link to={'/'} style={{ textDecoration: "none" }}><button className='play-again mt-2'>Home</button></Link>
                    </div>
                </div>
            }


            <Container className='hangman-sub' style={{ maxWidth: "1200px" }}>
                <Row className='rowzz'>
                    <Col className='d-flex align-items-center justify-content-center'>
                        <div className='hangman-box d-flex justify-content-center align-items-center'>
                            <img src={`./assets/hangman-${wrongGuess}.svg`} alt="" />
                            {/* change the hangman image */}
                        </div>
                    </Col>

                    <Col>
                        <div className='game-box'>
                            <ul className='word-display d-flex d-flex align-items-center justify-content-center mt-5 p-0'>
                                {wordDisplay()}
                                {/* 13.wordDisplay() function call */}
                            </ul>
                            <h4 className='hint-text'>
                                Hint:
                                <b>{newHint}</b>
                            </h4>

                            <h4 className='guesses-text'>
                                Incorrect guesses:
                                <b> {wrongGuess}/ {maxGuess}</b>
                                {/*15.display wrongGuess and maxGuess*/}
                            </h4>
                            <div className='keyboard d-flex flex-wrap justify-content-center'>
                                {/*6. convert alphabets into array then pass the character into btnClick function  */}
                                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((i, index) => <button disabled={guessed.has(i.toUpperCase()) || wrongGuess >= maxGuess} key={index} onClick={() => btnClick(i.toLowerCase())}>{i}</button>)}
                                {/*16. Disable the button when the wrong guess >=6 */}
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>

        </div>

    )
}

export default Hangman