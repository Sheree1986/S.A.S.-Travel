import React from 'react'
import VideoBackground from '../components/VideoBackground'
import CTA from '../components/CTA'
function Home() {
  return (
    <div className='parent' style={{display: 'block'}}>
       <div
        className="cta"
        style={{
          background: "black",
          opacity: ".7",
          position: "absolute",
         
          zIndex: "3",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <CTA />
      </div>
        <VideoBackground/>
        {/* <div className="loginForm" style={{zIndex: '5',position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '50%', width: '70%' }}>

        <LoginForm/>
        </div> */}

    </div>
  )
}

export default Home