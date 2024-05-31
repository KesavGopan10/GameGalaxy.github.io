import React from "react";
import { Parallax } from "react-parallax";
// import ThreeScene from './three';
import Gamecard from "./Gamecard";
const GParallax = () => {
    return (
        <Parallax
            bgImage="assets/bg3.jpg"
            strength={500}
            style={{ height: "100%", imagesize: "cover" }}
        >
            <div style={{ height: "100%", width: "100%" }}>
                <h1 style={{ color: "white", textAlign: "center" }}>
                Welcome to the Epic Gaming Odyssey!                </h1>

                <p style={{ color: "white", textAlign: "center" }}>
                
Embark on thrilling quests, gather powerful artifacts, and challenge formidable foes.



Embark on epic journeys, traverse fantastical realms, and unravel the secrets of enchanted worlds."
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "2px solid white",
                            color: "white",
                            padding: "10px 20px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Play Now
                    </button>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "20px",
                    }}
                >
                    <p
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: "18px",
                        }}
                    >
                        Join the gaming adventure now and forge your legend in the virtual realms.
                    </p>
                    <p
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: "18px",
                        }}
                    >
                        Travel through the cosmos, explore strange galaxies, and
                        uncover the mysteries of the unknown.
                    </p>
                </div>

                {/* <ThreeScene /> */}
                <Gamecard />
            </div>
        </Parallax>
    );
};

export default GParallax;
