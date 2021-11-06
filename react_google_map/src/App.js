import React from "react";
import "./App.css";
import GoogleMap from "./Components/Map"


class App extends React.Component{
  render(){
    return(
     <div >
       <h1>Google Map Places</h1>
      <GoogleMap/>
     </div>
    )
  }
}

export default App