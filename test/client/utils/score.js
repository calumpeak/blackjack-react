'use strict';

import { expect } from 'chai';
import { getBestScore, countOfAces, isAce, getCardScore, oneOrEleven, isDraw, overLimit } from 'utils/score';

const cardSample = [
    {rank: 'Queen', suit: 'H', value: 10},
    {rank: '2', suit: 'S', value: 2}
];

const cardSampleAces = [
    {rank: 'Ace', suit: 'C', value: 11},
    {rank: '3', suit: 'H', value: 3},
    {rank: '2', suit: 'S', value: 2},
    {rank: 'Ace', suit: 'D', value: 11}
];

describe('getBestScore', () => {
    it('should return the current tally of values in an array of cards', () => {
        expect(getBestScore(cardSample)).to.equal(12);
    });

    it('should return the best score if cards contain aces and are valued over 21', () => {
        expect(getBestScore(cardSampleAces)).to.equal(17);
    });
});

describe('countOfAces', () => {
    it('should return count of all aces in an array of cards', () => {
        expect(countOfAces(cardSampleAces)).to.equal(2);
    });

    it('should return 0 if there are no aces in an array of cards', () => {
        expect(countOfAces(cardSample)).to.equal(0);
    });
});

describe('isAce', () => {
    it('should return true if a card is an ace', () => {
        expect(isAce(cardSampleAces[0])).to.equal(true);
    });

    it('should return false if a card sample is not an ace', () => {
        expect(isAce(cardSampleAces[1])).to.equal(false);
    });
});

describe('getCardScore', () => {
    it('should tally up all values in an array of cards', () => {
        expect(getCardScore(cardSample)).to.equal(12);
    });
});

describe('oneOrEleven', () => {
    it('should return the current score if there are no aces in an array of cards', () => {
        expect(oneOrEleven(cardSample, 0)).to.equal(12);
    });

    it('should shrink aces from 11 to 1 if the total current score is over 21', () => {
        expect(getCardScore(cardSampleAces)).to.equal(27);
        const aces = countOfAces(cardSampleAces);
        const shurunkenScore = oneOrEleven(cardSampleAces, aces);

        expect(shurunkenScore).to.equal(17);
    });
});

describe('isDraw', () => {
    it('should return true if both values are 21', () => {
        expect(isDraw(21, 21)).to.equal(true);
    });

    it('should return false if both values are the same but not 21', () => {
        expect(isDraw(10, 10)).to.equal(false);
    });

    it('should return false if one value is different from the other', () => {
        expect(isDraw(21, 12)).to.equal(false);
    });
});

describe('overLimit', () => {
    it('should return true if the value is over 21', () => {
        expect(overLimit(22)).to.equal(true);
    });

    it('should return false if the value is equal to 21', () => {
        expect(overLimit(21)).to.equal(false);
    });

    it('should return false if the value is less than 21', () => {
        expect(overLimit(10)).to.equal(false);
    });
});
