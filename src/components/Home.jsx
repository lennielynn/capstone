import React from "react"

const Home = () => {
    return(
        <div id="home-pg">
            <video id="car-vid" src={"/Cars/capstone.m4v"} autoPlay loop muted></video>
            <h1 className="home-title">WELCOME</h1>
            <h2>BEGIN YOUR SEARCH IN THE CARS PAGE</h2>
        </div>
        
    )
}
export {
    Home
}