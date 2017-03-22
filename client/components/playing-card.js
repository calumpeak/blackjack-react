'use strict';

import 'styles/playing-card.css';

import React from 'react';
import Paper from 'material-ui/Paper';

const suitMap = {
    'C': 'Clubs',
    'H': 'Hearts',
    'D': 'Diamonds',
    'S': 'Spades'
};


const PlayingCard = ({ suit, rank }) => (
    <Paper className = 'playingCardContainer' zDepth = {2}>
        <div>{rank}</div>
        <div>{'of'}</div>
        <div>{suitMap[suit]}</div>
    </Paper>

);

export default PlayingCard;
