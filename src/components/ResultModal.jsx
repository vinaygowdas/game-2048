import React from "react";
import GameWon from "../assets/icons/Won-Star.svg";
import GameOver from "../assets/icons/Game-Over.svg";

const ResultModal = ({ grid, clickHandler }) => {
    if (grid.hasWon()) {
        return (
            <div className="modal-wrapper">
                <div className="modal-container f-d f-vt f-h-c f-v-c">
                    <div className="title">You Won!</div>
                    <div
                        className="modal-image"
                        style={{
                            backgroundImage: `url("${GameWon}")`,
                        }}
                    ></div>
                    <div className="modal-btn f-d f-v-c f-h-c" onClick={() => clickHandler(1)}>Play Again!</div>
                </div>
            </div>
        );
    } else if (grid.hasLost()) {
        return (
            <div className="modal-wrapper">
                <div className="modal-container f-d f-vt f-h-c f-v-c">
                    <div className="title">Game Over!</div>
                    <div
                        className="modal-image"
                        style={{
                            backgroundImage: `url("${GameOver}")`,
                        }}
                    ></div>
                    <div className="modal-btn f-d f-v-c f-h-c" onClick={() => clickHandler(2)}>Restart</div>
                </div>
            </div>
        );
    }
    return null;
};

export default ResultModal;
