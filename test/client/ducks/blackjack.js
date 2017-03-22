import { expect } from 'chai';
import blackjack from 'ducks/blackjack';
import * as actions from 'ducks/blackjack';
import { STATUS } from 'constants/blackjack';

describe('blackjack', () => {
    describe('New Game', () => {
        it('the player is given two cards', () => {
            const game = blackjack({}, actions.newGame());

            expect(game.playerHand.length).to.equal(2);
        });

        it('the dealer is given one card', () => {
            const game = blackjack({}, actions.newGame());

            expect(game.dealerHand.length).to.equal(1);
        });
    });

    describe('Hit', () => {
        it('should give the player another card, totalling 3', () => {
            const game = blackjack({}, actions.newGame());
            const hit1 = blackjack(game, actions.hit());

            expect(hit1.playerHand.length).to.equal(3);
        });

        it('should shrink the game deck by 1', () => {
            const game = blackjack({}, actions.newGame());
            const deck1 = game.deck.deck.length;
            const hit1 = blackjack(game, actions.hit());
            const deck2 = hit1.deck.deck.length;

            expect(deck1 - deck2).to.equal(1);
        });
    });

    describe('Stick', () => {
        it('should give the dealer another card, totalling 2', () => {
            const game = blackjack({}, actions.newGame());
            const stick1 = blackjack(game, actions.stick());

            expect(stick1.dealerHand.length).to.equal(2);
        });

        it('should shrink the game deck by 1', () => {
            const game = blackjack({}, actions.newGame());
            const deck1 = game.deck.deck.length;
            const stick1 = blackjack(game, actions.stick());
            const deck2 = stick1.deck.deck.length;

            expect(deck1 - deck2).to.equal(1);
        });
    });

    /**
     * TODO: Out of time
     * To continue tests would pass in an inital state with
     * stubbed (sinon) deck to force states on each action
     */
    describe.skip('End Game', () => {
        describe('When Dealer Wins', () => {

        });

        describe('When Player Wins', () => {

        });

        describe('When the Dealer and Player Draw', () => {
            describe('On Hit', () => {

            });

            describe('On Stick', () => {

            });
        });
    });
});
