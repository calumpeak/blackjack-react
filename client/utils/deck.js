'use strict';

import { shuffle, times } from 'lodash';

/**
 * Builds a 'deck' of 52 cards
 * The Deck consists of an array of 52 card objects each given
 * a suit, rank and value. Deck is shuffled based on the fisher-yates algo
 *
 * @class Deck
 */
class Deck {
    constructor () {
        this.deck = (() => {
            const stack = [];

            suits.forEach(suit => {
                ranks.forEach(rank => {
                    stack.push(card(suit, rank));
                });
            });

            return shuffle(stack);
        })();
    }

    /**
     * 'draws' cards from the deck
     * mutates deck
     *
     * @for Deck
     * @method draw
     * @param {Integer} count count of cards to draw
     * @return {Array} drawn cards
     */
    draw (count) {
        const cards = [];

        times(count, () => {
            cards.push(this.deck.pop());
        });

        return cards;
    }
}

const card = (suit, rank) => ({
    suit,
    rank,
    value: assignRankValue(rank)
});

/**
 * Assigns a value to a ranked card
 * Handles Jack, King, Queen & Ace and Numbered ranks
 *
 * @function assignRankValue
 * @param {String | Integer } rank
 * @return {Integer}
 */
const assignRankValue = (rank) => {
    switch (rank) {
        case 'Jack':
        case 'Queen':
        case 'King':
            return 10;
        case 'Ace':
            return 11;
        default:
            return parseInt(rank, 10);
    }
};

const suits = [
    'C', // Clubs
    'H', // Hearts
    'D', // Diamonds
    'S'  // Spades
];

const ranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
    'Ace'
];

export {
    Deck
};
