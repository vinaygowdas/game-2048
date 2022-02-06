import React, { useState } from 'react';
import "./app.scss";
import Layout from './components/Layout';
import Header from './components/Header';
import Game from './components/Game';
import Info from './components/Info';

function App() {
    const [gridSize, setGridSize] = useState(4);
    const [winScore, setWinScore] = useState(512);

    const startNewGame = ({size, score}) => {
        setGridSize(size);
        setWinScore(score);
    }

    return (
        <Layout gridSize={gridSize}>
            <Header />
            <Game gridSize={gridSize} winScore={winScore} startNewGame={startNewGame} />
            <Info />
        </Layout>
    )
}

export default App;
