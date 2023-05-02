import { useCallback, useEffect, useState } from 'react';
import './App.css';
import boards from './boards';
import { checkWinner } from './helpers/checkWinner';
import { circle, cross, initial } from './helpers/constants';

function App() {
    const [state, setState] = useState(initial);
    const [isCross, setIsCross] = useState(false);
    const [winner, setWinner] = useState();

    const clickHandler = (rowIndex, elIndex) => {
        if (winner) {
            return;
        }

        const edited = [...state];
        const el = edited[rowIndex][elIndex];
        if (el === ' ') {
            edited[rowIndex][elIndex] = isCross ? cross : circle;
            setState([...edited]);
        }
    };

    useEffect(() => {
        setIsCross(!isCross);
        const winner = checkWinner(state);

        setWinner(winner);
    }, [state]);

    const reset = () => {
        const reseted = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];

        setIsCross(false);
        setState(reseted);
        setWinner(undefined);
    };

    useEffect(() => {
        if (winner) {
            console.log(winner);
        }
    }, [winner]);

    const getStyles = useCallback(
        (r, c) => {
            if (winner) {
                const array = winner[1];

                if (!array) {
                    return {
                        opacity: '0.5',
                        transform: 'scale(0.8)',
                    };
                }

                for (let i = 0; i < array.length; i++) {
                    const cord = array[i];

                    if (cord[0] === r && cord[1] === c) {
                        return {
                            transform: 'scale(1.1)',
                            background: 'gray',
                        };
                    }
                }

                return {
                    opacity: '0.5',
                    transform: 'scale(0.8)',
                };
            } else {
                return {};
            }
        },
        [winner]
    );

    return (
        <div className='App'>
            <div className='container'>
                <button onClick={reset}>RESET</button>

                {state.map((row, rowIndex) => (
                    <div key={rowIndex} className='row'>
                        {row.map((el, elIndex) => (
                            <div
                                key={elIndex}
                                className='el'
                                onClick={() => clickHandler(rowIndex, elIndex)}
                                row={`${rowIndex}`}
                                col={`${elIndex}`}
                                style={getStyles(rowIndex, elIndex)}
                            >
                                {el}
                            </div>
                        ))}
                    </div>
                ))}
                {winner && <h1>{winner[0]}</h1>}
            </div>
        </div>
    );
}

export default App;
