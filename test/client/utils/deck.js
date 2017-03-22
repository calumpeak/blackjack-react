'use strict';

import { expect } from 'chai';
import { Deck } from 'utils/deck';

describe('Deck', () => {
    describe('Deck Constructor', () => {
        it('should generate an array of 52 cards', () => {
            const deck = new Deck();
            expect(deck.deck.length).to.equal(52);
        });

        // Note: This test may fail as is the nature of random
        it('the deck of cards should be shuffled', () => {
            const deck1 = new Deck();
            const deck2 = new Deck();

            expect(deck1.deck).to.not.deep.equal(deck2.deck);
        });
    });

    describe('draw', () => {
        it('should return an array equal in length to the draw count', () => {
            const drawCount = 3;
            const deck = new Deck();
            const drawnCards = deck.draw(drawCount);

            expect(drawnCards.length).to.equal(drawCount);
        });

        it('should shrink the deck by the amount drawn', () => {
            const drawCount = 2;
            const deck = new Deck();

            expect(deck.deck.length).to.equal(52);
            deck.draw(drawCount);
            expect(deck.deck.length).to.equal(50);
        });
    });
});
