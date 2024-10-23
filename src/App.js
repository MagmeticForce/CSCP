import logo from './logo.svg'; //notice how there is a "logo.svg" file in this "src" directory 
                               //so we imported the logo into this script so it can be used
import './App.css'; //notice how there is an "App.css" file in this "src" directory\
                    //so we are using stuff from "App.css"

//TO RUN THIS APP: open the Terminal and type in 'npm start'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Semester 1
        </p>
        <p>
          Semester 2
        </p>
        <p>
          Semester 3
        </p>
      </header>
    </div>
  );
}

/*
Template code in case it is needed:

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

*/

export default App;
