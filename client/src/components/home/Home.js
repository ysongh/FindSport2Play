import React, {Component} from 'react';

import sportImage from '../../img/sport.png';

class Home extends Component{
  render(){
      return(
          <div>
              <h1 className="text-center">Welcome to FindSport2Play</h1>
              <img className="mx-auto d-block" src={sportImage} alt="Sport" />
          </div>
      );
  }
}

export default Home;