import { circle, cross } from './constants';

export const checkWinner = (state) => {
    let counterCross = 0;
    let counterCircle = 0;
    let indexesCross = [];
    let indexesCircle = [];

    // diagonal top to bot
    for (let i = 0; i < 3; i++) {
        if (state[i][i] === cross) {
            counterCross += 1;
            indexesCross.push([i, i]);
        } else if (state[i][i] === circle) {
            counterCircle += 1;
            indexesCircle.push([i, i]);
        }
    }

    if (counterCross >= 3) {
        console.log('cross win');
        return ['cross', indexesCross];
    } else if (counterCircle >= 3) {
        console.log('circle win');
        return ['circle', indexesCircle];
    }

    indexesCross = [];
    indexesCircle = [];
    counterCross = 0;
    counterCircle = 0;

    // diagonal bot to top
    for (let i = 2; i >= 0; i--) {
        if (state[i][Math.abs(i - 2)] === cross) {
            counterCross += 1;
            indexesCross.push([i, Math.abs(i - 2)]);
        } else if (state[i][Math.abs(i - 2)] === circle) {
            counterCircle += 1;
            indexesCircle.push([i, Math.abs(i - 2)]);
        }
    }

    if (counterCross >= 3) {
        console.log('cross win');
        return ['cross', indexesCross];
    } else if (counterCircle >= 3) {
        console.log('circle win');
        return ['circle', indexesCircle];
    }

    indexesCross = [];
    indexesCircle = [];
    counterCross = 0;
    counterCircle = 0;

    // row horizontal
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] === cross) {
                counterCross += 1;
                indexesCross.push([i, j]);
            } else if (state[i][j] === circle) {
                counterCircle += 1;
                indexesCircle.push([i, j]);
            }
        }

        if (counterCross === 3) {
            console.log('cross win');
            return ['cross', indexesCross];
        }

        if (counterCircle === 3) {
            console.log('circle win');
            return ['circle', indexesCircle];
        }

        indexesCross = [];
        indexesCircle = [];
        counterCross = 0;
        counterCircle = 0;
    }

    // col vertical
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[j][i] === cross) {
                counterCross += 1;
                indexesCross.push([j, i]);
            } else if (state[j][i] === circle) {
                counterCircle += 1;
                indexesCircle.push([j, i]);
            }
        }

        if (counterCross === 3) {
            console.log('cross win');
            return ['cross', indexesCross];
        }
        if (counterCircle === 3) {
            console.log('circle win');
            return ['circle', indexesCircle];
        }

        indexesCross = [];
        indexesCircle = [];
        counterCross = 0;
        counterCircle = 0;
    }

    let countBlank = 0;
    state.forEach((element) => {
        element.forEach((item) => {
            if (item === ' ') {
                countBlank += 1;
            }
        });
    });

    if (countBlank === 0) {
        console.log('tie');
        return ['tie', undefined];
    }
};
