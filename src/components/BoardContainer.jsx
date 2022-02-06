import React, { useState, useEffect } from 'react';
import { Grid } from '../utils/index';
import useEvent from '../utils/useEvent';
import NewGameModal from './NewGameModal';
import ResultModal from './ResultModal';
import Tile from './Tile';
import TileBlock from './TileBlock';

const BoardContainer = ({ gridSize, winScore, startNewGame }) => {
    const [grid, setGrid] = useState(new Grid(gridSize, winScore));
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setGrid(new Grid(gridSize, winScore));
    }, [gridSize, winScore])

    const handleKeyDown = (e) => {
        if (grid.hasWon()) {
            return;
        }
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            e.preventDefault();
            let dir = e.keyCode - 37;
            let gridClone = Object.assign(Object.create(Object.getPrototypeOf(grid)), grid);
            let newGrid = gridClone.move(dir);
            setGrid(newGrid);
        }
    }

    // Keydown events hook
    useEvent('keydown', handleKeyDown);

    // Blocks
    const tileBlocks = grid.tileBlocks.map((row, ri) => {
        return (
            <div key={ri} className="tile-row">
                {row.map((col, ci) => <TileBlock key={ri * grid.size + ci} />)}
            </div>
        )
    });

    // Tiles
    const tiles = grid.tiles.filter(t => t.value !== 0).map((t, idx) => <Tile key={idx} tile={t} />);

    const modalClickHandler = (mode, config) => {
        if (mode === 1) {
            // New Game
            if (config) {
                startNewGame(config);
                setShowModal(false);
            } else {
                // Reset
                setGrid(new Grid(gridSize, winScore));
            }
        } else {
            // Restart
            setGrid(new Grid(gridSize, winScore));
        }
    }

    return (
        <div>
            <div className="game-header f-d f-h-sb">
                <div className="new-game-btn f-d f-v-c f-h-c" onClick={() => setShowModal(!showModal)}>New Game</div>
                <div className="score-container f-d f-v-e f-h-c">
                    <div className="title">Score</div>
                    <div className="score">{grid.score}</div>
                </div>
            </div>
            <div className="grid-container">
                {tileBlocks}
                {tiles}
            </div>
            <ResultModal grid={grid} clickHandler={modalClickHandler} />
            {showModal && <NewGameModal gridSize={gridSize} winScore={winScore} clickHandler={modalClickHandler} />}
        </div>
    );
}

export default BoardContainer;
