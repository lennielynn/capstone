import React from "react"

const Home = () => {
    return(
        <div id="hero-img">
            {/* <img id="hero-img" src={require("../Cars/ch5.jpg")} alt="car"/>   */}
            <video id="car-vid" src={"/Cars/capstone.m4v"} autoPlay loop muted></video>
        </div>
        
    )
}
export {
    Home
}