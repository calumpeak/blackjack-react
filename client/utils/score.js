'use strict';

import { findIndex, cloneDeep } from 'lodash';
import { SCORE_LIMIT, ACE_HIGH, ACE_LOW } from 'constants/blackjack';

/**
 * Attempts to get best score under score limit based upon aces
 * in current card stack
 *
 * @function getBestScore
 * @param {Array} cards
 * @return {Integer}
 */
export const getBestScore = (cards) => {
    const currentScore = getCardScore(cards);
    const aces = countOfAces(cards);

    if (overLimit(currentScore) && aces) {
        return oneOrEleven(cloneDeep(cards), aces);
    } else {
        return currentScore;
    }
};

/**
 * Counts how many aces are in an array of cards
 *
 * @function countOfAces
 * @param {Array} cards
 * @return {Integer}
 */
export const countOfAces = (cards) => cards.reduce((acc, card) => {
    return isAce(card) ? ++acc : acc;
}, 0);

/**
 * Checks if a card is an Ace or not
 *
 * @function isAce
 * @param {Object} card
 * @return {Boolean}
 */
export const isAce = (card) => card.rank === 'Ace';

/**
 * Gets total score for cards in an array
 *
 * @function getCardScore
 * @param {Array} cards
 * @return {Integer}
 */
export const getCardScore = (cards) => cards.reduce((acc, card) => {
    return acc += card.value;
}, 0);

/**
 * 1 or 11?...Aces Charles...Aces.
 *
 * Recursively shrinks Aces to 1 (from 11) until under the score limit
 * If we can't get under score limit when we're out of aces then we return
 * the last value
 * This function mutates.
 * e.g if [Ace, Ace, 4] then we will shrink 1 ace to equal 16
 *
 * @function oneOrEleven
 * @param {Array} cards
 * @param {Integer} aces total amount of aces
 * @return {Integer}
 */
export const oneOrEleven = (cards, aces) => {
    let currentScore;
    const aceToShrink = findIndex(cards, card => isAce(card) && card.value === ACE_HIGH);

    if (aceToShrink > -1) {
        cards[aceToShrink].value = ACE_LOW;
    }

    --aces;
    currentScore = getCardScore(cards);

    return overLimit(currentScore) && aces ? oneOrEleven(cards, aces) : currentScore;
};

/**
 * Checks whether we have a draw of two values matching the score limit
 * This will also mean that both numbers are the same value (21)
 *
 * @function isDraw
 * @param {Integer} score
 * @param {Integer} comparison
 * @return {Boolean}
 */
export const isDraw = (score, comparison) => score === SCORE_LIMIT && comparison === SCORE_LIMIT;

/**
 * Checks whether a value is over the score limit. Returns truthy if so
 *
 * @function overLimit
 * @param {Integer} score
 * @return {Boolean}
 */
export const overLimit = (score) => score > SCORE_LIMIT;
