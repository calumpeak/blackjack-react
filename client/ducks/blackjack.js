'use strict';

import { Deck } from 'utils/deck';
import { getBestScore, isDraw, overLimit } from 'utils/score';
import {
    SCORE_LIMIT,
    STATUS,
    PLAYER_START_COUNT,
    DEALER_START_COUNT,
    DEFAULT_DRAW_COUNT
} from 'constants/blackjack';

// Action Namespace
const ns    = 'BLACKJACK_';

// Actions
const NEW   = `${ns}NEW_GAME`;
const HIT   = `${ns}HIT`;
const STICK = `${ns}STICK`;

// Initial State
const initialState = () => {
    const deck = new Deck();
    const playerHand = deck.draw(PLAYER_START_COUNT);
    const dealerHand = deck.draw(DEALER_START_COUNT);

    return {
        deck,
        playerHand,
        dealerHand,
        playerScore: getBestScore(playerHand),
        dealerScore: getBestScore(dealerHand),
        status: STATUS.PLAYING
    };
};

// Reducer
const reducer = (state = initialState(), action) => {
    let newHand, newScore, newStatus;
    const { playerHand, dealerHand, playerScore, dealerScore, deck } = state;

    switch (action.type) {
        case NEW:
            return initialState();
        case HIT:
            newHand = [...playerHand, ...deck.draw(DEFAULT_DRAW_COUNT)];
            newScore = getBestScore(newHand);
            newStatus = overLimit(newScore) ? STATUS.LOST : state.status;
            newStatus = isDraw(newScore, dealerScore) ? STATUS.DRAW : newStatus;

            return {
                ...state,
                playerHand: newHand,
                playerScore: newScore,
                status: newStatus
            }
        case STICK:
            newHand = [...dealerHand, ...deck.draw(DEFAULT_DRAW_COUNT)];
            newScore = getBestScore(newHand);
            newStatus = overLimit(newScore) ? STATUS.WIN : state.status;
            newStatus = isDraw(newScore, playerScore) ? STATUS.DRAW : newStatus;

            return {
                ...state,
                dealerHand: newHand,
                dealerScore: newScore,
                status: newStatus
            }
        default:
            return state;
    }
};

// Action Creators
export const newGame = () => ({ type: NEW });

export const hit = () => ({ type: HIT });

export const stick = () => ({ type: STICK });

// Export reducer as default
export default reducer;
