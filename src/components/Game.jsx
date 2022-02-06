import React from 'react';
import BoardContainer from './BoardContainer';

const Game = (props) => {
    return (
        <div className="game-container">
            <BoardContainer {...props} />
        </div>
    );
}

export default Game;
