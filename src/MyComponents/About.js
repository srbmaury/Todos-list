import React from 'react'

const About = () => {
  let myStyle = {
    minHeight: "72vh",
    margin: "40px auto"
  }
  let linkStyle = {
    textDecoration:"none"
  }
  return (
    <div className='container' style={myStyle}>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="https://tse3.mm.bing.net/th?id=OIP.zc3XRPZxUt4Xt7zDZYLa_wHaHa&pid=Api&P=0" className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Saurabh Maurya</h5>
              <p className="card-text"><strong>Saurabh Maurya</strong> is a student of 2024 batch of <em>Electronics Engineering</em>. He is interested in Web development and Problem Solving. He is currently learning MERN stack and this project is a part of his learning. This project was initiated with the help of a <a style={linkStyle} href="https://youtu.be/RGKi6LSPDLU" target="_new">video</a> on <a style={linkStyle} href='https://www.youtube.com/@CodeWithHarry' target="_new">CodeWithHarry channel</a>.</p>
              <p className="card-text"><small className="text-muted">Last updated 14 Dec 2022 19:17</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
