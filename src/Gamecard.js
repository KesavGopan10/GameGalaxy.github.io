import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from "mdb-react-ui-kit";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import './gamecard.css';
import Hangman from "./Hangman";
import SnakeGame from "./snake";
import Spaces from "./Space";

function Gamecard() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <MDBContainer fluid className="my-5">
            <MDBRow>
              {/* Card 1 */}
              <MDBCol xs="12" sm="6" lg="4" className="mb-4">
                <MDBCard className="glassmorphism-card h-100">
                  <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0"></p>
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong" style={{ width: "35px", height: "35px" }}>
                      <p className="text-white mb-0 small">FREE</p>
                    </div>
                  </div>
                  <MDBCardImage src="assets/hangit.jpg" position="top" alt="Hangman" className="img-fluid" />
                  <MDBCardBody className="d-flex flex-column">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">Hangman</h5>
                    </div>
                    <div className="d-flex justify-content-between mb-2 mt-auto">
                      <Link to="/Hangman"><button className="play">Play Now</button></Link>
                      <div className="ms-auto text-warning">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              {/* Card 2 */}
              <MDBCol xs="12" sm="6" lg="4" className="mb-4">
                <MDBCard className="glassmorphism-card h-100">
                  <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0"></p>
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong" style={{ width: "35px", height: "35px" }}>
                      <p className="text-white mb-0 small">FREE</p>
                    </div>
                  </div>
                  <MDBCardImage src="assets/snake.jpg" position="top" alt="Snake Game" className="img-fluid" />
                  <MDBCardBody className="d-flex flex-column">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">Snake Game</h5>
                    </div>
                    <div className="d-flex justify-content-between mb-2 mt-auto">
                      <Link to="/SnakeGame"><button className="play">Play Now</button></Link>
                      <div className="ms-auto text-warning">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star-half-alt" />
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              {/* Card 3 */}
              <MDBCol xs="12" sm="6" lg="4" className="mb-4">
                <MDBCard className="glassmorphism-card h-100">
                  <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0"></p>
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong" style={{ width: "35px", height: "35px" }}>
                      <p className="text-white mb-0 small">FREE</p>
                    </div>
                  </div>
                  <MDBCardImage src="https://tse4.mm.bing.net/th?id=OIP.0umEsI5We9_Ipqy5akmifwHaEb&pid=Api&P=0&h=180" position="top" alt="Space Game" className="img-fluid" />
                  <MDBCardBody className="d-flex flex-column">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">Space Game</h5>
                    </div>
                    <div className="d-flex justify-content-between mb-2 mt-auto">
                      <Link to="/Spaces"><button className="play">Play Now</button></Link>
                      <div className="ms-auto text-warning">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

            {/* Duplicate Cards in a New Row */}
            <MDBRow>
              {/* Card 1 Duplicate */}
              <MDBCol xs="12" sm="6" lg="4" className="mb-4">
                <MDBCard className="glassmorphism-card h-100">
                  <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0"></p>
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong" style={{ width: "50px", height: "50px" }}>
                      <p className="text-white mb-0 small">LOGIN</p>
                    </div>
                  </div>
                  <MDBCardImage src="assets/hangit.jpg" position="top" alt="Hangman" className="img-fluid" />
                  <MDBCardBody className="d-flex flex-column">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">Hangman</h5>
                    </div>
                    <div className="d-flex justify-content-between mb-2 mt-auto">
                      <Link to="/Hangman"><button className="play">Play Now</button></Link>
                      <div className="ms-auto text-warning">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              {/* Card 2 Duplicate */}
              <MDBCol xs="12" sm="6" lg="4" className="mb-4">
                <MDBCard className="glassmorphism-card h-100">
                  <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0"></p>
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong" style={{ width: "50px", height: "50px" }}>
                      <p className="text-white mb-0 small">LOGIN</p>
                    </div>
                  </div>
                  <MDBCardImage src="assets/snake.jpg" position="top" alt="Snake Game" className="img-fluid" />
                  <MDBCardBody className="d-flex flex-column">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">Snake Game</h5>
                    </div>
                    <div className="d-flex justify-content-between mb-2 mt-auto">
                      <Link to="/SnakeGame"><button className="play">Play Now</button></Link>
                      <div className="ms-auto text-warning">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star-half-alt" />
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              {/* Card 3 Duplicate */}
              <MDBCol xs="12" sm="6" lg="4" className="mb-4">
                <MDBCard className="glassmorphism-card h-100">
                  <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0"></p>
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong" style={{ width: "50px", height: "50px" }}>
                      <p className="text-white mb-0 small">LOGIN</p>
                    </div>
                  </div>
                  <MDBCardImage src="https://tse4.mm.bing.net/th?id=OIP.0umEsI5We9_Ipqy5akmifwHaEb&pid=Api&P=0&h=180" position="top" alt="Space Game" className="img-fluid" />
                  <MDBCardBody className="d-flex flex-column">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">Space Game</h5>
                    </div>
                    <div className="d-flex justify-content-between mb-2 mt-auto">
                      <Link to="/Spaces"><button className="play">Play Now</button></Link>
                      <div className="ms-auto text-warning">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        } />

        <Route path="/Hangman" element={<Hangman />} />
        <Route path="/SnakeGame" element={<SnakeGame />} />
        <Route path="/Spaces" element={<Spaces />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Gamecard;
