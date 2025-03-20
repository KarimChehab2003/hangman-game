import { useEffect } from 'react';
import { useState } from 'react';
import KeyInput from './components/KeyInput';
import hangman0 from './assets/hang0.png';
import hangman1 from './assets/hang1.png';
import hangman2 from './assets/hang2.png';
import hangman3 from './assets/hang3.png';
import hangman4 from './assets/hang4.png';
import hangman5 from './assets/hang5.png';
import hangman6 from './assets/hang6.png';

function App() {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [loading, setLoading] = useState(true);

    const hangmanPictures = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5, hangman6];

    const createLettersArray = () => {
        const letters = [];
        for (let i = 97; i <= 122; i++) {
            letters.push(String.fromCharCode(i));
        }
        return letters;
    }

    const fetchData = async () => {
        const response = await fetch('https://random-word-api.vercel.app/api?words=1');
        const data = await response.json();
        console.log(data[0]);
        setWord(data[0]);
        setGuessedLetters(Array(data[0].length).fill("_"));
    }

    const checkInput = (letter) => {
        let wordArray = word.split("");
        if (!wordArray.includes(letter))
            setIncorrectGuesses(incorrectGuesses + 1);

        setGuessedLetters(guessedLetters.map((element, index) => (wordArray[index] === letter ? letter : element)));
    }

    const changeIndicator = () => {
        switch (incorrectGuesses) {
            case 0:
                return "text-green-500";
            case 1:
                return "text-green-500";
            case 2:
                return "text-green-500";
            case 3:
                return "text-yellow-500";
            case 4:
                return "text-red-500";
            case 5:
                return "text-red-500";
            case 6:
                return "text-red-500";
            default:
                return "text-green-500";
        }
    }

    useEffect(() => {
        const fetchDataWrapper = async () => {
            await fetchData();
            setLoading(false);
        }
        fetchDataWrapper();
    }, [])

    useEffect(() => {
        if (incorrectGuesses === 6) {
            alert('Game Over!');
            window.location.reload();
        }
    }, [incorrectGuesses])

    useEffect(() => {
        console.log(guessedLetters.join(""), word);
        if (guessedLetters.join("") === word && !loading) {
            alert('You Win!');
            window.location.reload();
        }
    }, [guessedLetters, loading])

    return (
        <section className="bg-primary min-h-screen flex justify-center items-center px-2">
            <div className="bg-white flex flex-col sm:flex-row justify-between items-center rounded-lg shadow-md p-4 sm:p-8 w-full sm:w-fit space-y-4">
                <div className='flex flex-col justify-center items-center'>
                    <img src={hangmanPictures[incorrectGuesses]} alt="" className='sm:max-w-md' />
                    <h1 className='text-2xl uppercase font-bold'>Hangman Game</h1>
                </div>
                <div className='flex flex-col justify-between items-center space-y-12'>
                    <p className='text-2xl sm:text-4xl font-medium tracking-[0.2em] uppercase'>{guessedLetters.map((element) => (element + " "))}</p>
                    <p>Incorrect guesses: <span className={changeIndicator()}>{incorrectGuesses}/6</span></p>
                    <div className='flex flex-wrap justify-center items-center max-w-md'>
                        {
                            createLettersArray().map((letter, index) => (
                                <KeyInput key={index} letter={letter} checkInput={checkInput} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;