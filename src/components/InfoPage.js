
// src/components/InfoPage.js
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";


function InfoPage(){
  const navigate = useNavigate();

  return (
    <>
    <div className="top-bar"></div>
      <div className="top-bar"></div>
      <div className="top-bar"></div>
      <div className="top-bar"></div>
      <h2 className="top-bar-text">Oakland University CSDP</h2>
      <button className='return-home-button' onClick={() => navigate('/')}>Return Home</button>

      <div className='space'></div>
      <div className='space'></div>
      <div className='space'></div>
      <div className='space'></div>
      <div className='space'></div>

      <p className="subtitle">Resources:</p>

      <p className="big-link">
      <a href="https://bstreg.oakland.edu/StudentRegistrationSsb/ssb/registration/registration">Oakland University Schedule Input Page (bstreg)</a>
      </p>

      <p className="big-link">
      <a href="https://catalog.oakland.edu/preview_program.php?catoid=64&poid=12585">Computer Science Major Requirements</a>
      </p>


      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeAxXu5TVECCTP9W_cH8quslKDv0XNBjuqbUaHVrHVu__ytjg/viewform?embedded=true" width="640" height="325" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

      <br></br>
      <br></br>
      
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfwMDJAqIQHdoNhnZa2FF-V1KvHmQJ8ZXwcNBP2zlAvKY8xIg/viewform?embedded=true" width="640" height="232" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <p className="subtitle">
        Created by:
      </p>
      <p className="name-title">
        Brandon Randall
      </p>
      <p className="name-title">
        Nicholas Sakowski
      </p>
      <p className="name-title">
        Jacob Stachecki
      </p>
      <p className="name-title">
        Austin Wright
      </p>
      

      <br></br>
      <br></br>


    </>
  )
}

export default InfoPage;
