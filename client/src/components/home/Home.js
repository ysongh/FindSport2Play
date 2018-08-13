import React, {Component} from 'react';

import sportImage from '../../img/sport.png';
import sportsImage from '../../img/sports.gif';

class Home extends Component{
  render(){
      return(
          <div>
            <header className="jumbotron bg-primary">
          		<div className="container">
          			<h1 className="text-center">Welcome to FindSport2Play</h1>
          			<img className="img-fluid" id="imageSize" src={sportImage} alt="Sport" />
          		</div>
          	</header>
            <div className="jumbotron bg-light">
        		  <div className="container">
        			  <div className="row">
        				  <div className="col-md-5">
        					  <img className="img-fluid rounded-circle float-right" src={sportsImage} alt="Sports"/>
        				  </div>
        				  <div className="col-md-7">
        					  <h1 className="text-center">Start Finding Your Match!</h1>
        				  </div>
        			  </div>
        		  </div>
        	  </div>
        	</div>
      );
  }
}

export default Home;