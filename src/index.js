import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'; 
import Spinner from './Spinner';

class App extends React.Component{

    // This constructor is replaced entirely by componentDidMount() method and state initialization beneath it.
    // constructor(props){
    //     super(props);

    //     this.state={lat:null, longs:null, errorMessage:''};        
    // }

    state={lat:null, longs:null, errorMessage:''};

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({lat:position.coords.latitude});
                this.setState({longs:position.coords.longitude});
            },
            (err) =>{this.setState({errorMessage:err.message});
            }
        );
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return(
                <div>Error: {this.state.errorMessage}</div>
            );
        }

        if(!this.state.errorMessage && this.state.lat){
            return(
                // <div>Lat: {this.state.lat} <br/> Long: {this.state.longs}</div>
                <SeasonDisplay lat={this.state.lat} />
                
            );
        }

        return <Spinner message="Please accept location request"/>;
    }
    
    render(){
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        );        
    }
}
ReactDOM.render(
    <App />, document.querySelector('#root')
)