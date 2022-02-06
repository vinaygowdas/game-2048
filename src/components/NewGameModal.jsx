import React, { useState } from "react";

const NewGameModal = ({ gridSize, winScore, clickHandler }) => {
    const [gameConfig, setGameConfig] = useState({
        size: gridSize,
        score: winScore,
    });

    return (
        <div className="modal-wrapper">
            <div className="modal-container f-d f-vt f-h-c f-v-c">
                <div className="title">New Game</div>
                <div className="size-block">
                    <div className="sub-title">Board Size</div>
                    <div className="size-container block-container">
                        {[4, 8].map((i, idx) => (
                            <div
                                key={idx}
                                className={`g-size ${gameConfig.size === i ? "active" : ""}`}
                                onClick={() => setGameConfig({ ...gameConfig, size: i })}
                            >
                                {`${i}x${i}`}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="score-block">
                    <div className="sub-title">Win Score</div>
                    <div className="score-container block-container">
                        {[512, 1024, 2048, 4096].map((i, idx) => (
                            <div
                                key={idx}
                                className={`w-score ${gameConfig.score === i ? "active" : ""}`}
                                onClick={() => setGameConfig({ ...gameConfig, score: i })}
                            >
                                {i}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-btn f-d f-v-c f-h-c" onClick={() => clickHandler(1, gameConfig)}>
                    Play Again!
                </div>
            </div>
        </div>
    );
};

export default NewGameModal;
