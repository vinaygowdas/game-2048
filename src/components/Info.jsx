import React from "react";
import Arrows from '../assets/icons//arrows.svg';

const Info = () => {
    return (
        <div className="info-container">
            <div className="title">Controls</div>
            <div className="desc">Use arrows to merge the tiles and try to reach <b>2048</b></div>
            <div className="arrows-container">
                <div
                    className="arrow-image"
                    style={{
                        backgroundImage: `url("${Arrows}")`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Info;
