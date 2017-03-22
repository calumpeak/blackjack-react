'use strict';

import 'styles/field.css';

import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import PlayingCard from 'components/playing-card';

const Field = ({ user, score, hand, endgame }) => (
    <Card className = 'fieldContainer'>
        <CardHeader
            title = {user.toUpperCase()}
            subtitle = {`Current Card Score is ${score}`}
        />
        <CardText className = 'fieldContainer'>
            <div>
                {hand.map((card) =>
                    <PlayingCard
                        key = {`${card.suit}:${card.rank}`}
                        {...card}
                    />
                )}
                {endgame ? <div className = 'winLose'>{endgame}</div> : null}
            </div>
        </CardText>
    </Card>
);

export default Field;
