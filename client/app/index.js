'use strict';

// Styles
import 'styles/blackjack.css';

// Modules
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'ducks/blackjack'
import { STATUS } from 'constants/blackjack';

import RaisedButton from 'material-ui/RaisedButton';
import Field from 'components/field';

class BlackJack extends Component {
    constructor (props) {
        super(props);

        this.onNewGame = this.onNewGame.bind(this);
        this.onHit = this.onHit.bind(this);
        this.onStick = this.onStick.bind(this);
    }

    onNewGame () {
        const { newGame } = this.props;
        newGame();
    }

    onHit () {
        const { hit } = this.props;
        hit();
    }

    onStick () {
        const { stick } = this.props;
        stick();
    }

    isPlaying () {
        const { status } = this.props;
        return status !== STATUS.PLAYING;
    }

    winLose () {
        const { status } = this.props;

        switch (status) {
            case STATUS.PLAYING:
                return {
                    dealer: false,
                    player: false
                }
            case STATUS.WIN:
                return {
                    dealer: 'Lose',
                    player: 'Win'
                }
            case STATUS.LOST:
                return {
                    dealer: 'Win',
                    player: 'Lose'
                };
            case STATUS.DRAW:
                return {
                    dealer: 'Draw',
                    player: 'Draw'
                };
            default:
                break;
        }
    }

    render () {
        const { playerHand, dealerHand, playerScore, dealerScore } = this.props;
        const playing = this.isPlaying();
        const { dealer, player } = this.winLose();

        return (
            <div className = 'blackJackContainer'>
                <div className = 'dealerHand'>
                    <Field
                        user = 'Dealer'
                        score = {dealerScore}
                        hand = {dealerHand}
                        endgame = {dealer}
                    />
                </div>
                <div className = 'buttonContainer'>
                    <RaisedButton
                        label = 'Hit'
                        onTouchTap = {this.onHit}
                        disabled = {playing}
                        fullWidth = {true}
                        primary = {true}
                    />
                    <RaisedButton
                        label = 'Stick'
                        onTouchTap = {this.onStick}
                        disabled = {playing}
                        fullWidth = {true}
                        secondary = {true}
                    />
                    <RaisedButton
                        label = 'New Game'
                        onTouchTap = {this.onNewGame}
                        disabled = {!playing}
                        fullWidth = {true}
                    />
                </div>
                <div className = 'playerHand'>
                    <Field
                        user = 'Player'
                        score = {playerScore}
                        hand = {playerHand}
                        endgame = {player}
                    />

                </div>
            </div>
        );
    }
}

BlackJack.propTypes = {
    playerHand: PropTypes.array,
    dealerHand: PropTypes.array,
    playerScore: PropTypes.number,
    dealerScore: PropTypes.number,
    status: PropTypes.number,
    deck: PropTypes.object,
    hit: PropTypes.func,
    stick: PropTypes.func,
    newGame: PropTypes.func
};

const mapStateToProps = ({ blackjack }) => ({
    ...blackjack
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlackJack);
