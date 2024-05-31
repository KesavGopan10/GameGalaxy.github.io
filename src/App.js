import React from 'react';
import Navbar from './nav';
import GParallax from './Parallax';
import Footer from './Footer';
const App = () => {
  return (
    <>
      <div style={{ 
        // backgroundImage: `url("https://public-media.interaction-design.org/images/uploads/1c5e2422ae5d6a812e2fed642b7b19c8.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
      }} />
      <Navbar />  
      <GParallax /> 
      <Footer/>
    </>

  );
}

export default App;
