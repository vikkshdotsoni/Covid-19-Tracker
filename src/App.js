import React from 'react';
import {Cards, Chart , CountryPicker} from './components'; //one file index.js which holds all exports of components
import styles from './App.module.css'; //onefile which holds all exports of css in components
import {fetchData} from './api'; //we dont need to specify index it is default
import coronaImage from './images/image.png';




class App extends React.Component{


    //we will use old style state in place of useState
    state={
        data: {},
        country : '', //coming from CountryPicker Component after fetching names from API
    }
    //fetch the data with async componentDidMount
    async componentDidMount(){ //Life-cycle method 
        const fetchedData = await fetchData(); //await for asyn data and its need to be under async function so we made it async function.

        this.setState({data : fetchedData}); //it will works same like useState
    }

    handleCountryChange = async (country) => { //value will be fetched here whatever user choose in <NativeSelect>

        const fetchedData = await fetchData(country); //passing the country data
        //fetch the data
        //then set the state
        // so we got the data in fetchedData so we can now set state
        this.setState({data: fetchedData,  country : country}); //by passing the country :country data also cards data will be updated A/Q to their Country preference

    }
    render(){
        const {data,country} = this.state; //distructuring
        return (
        <div className={styles.container}>
            <img className= {styles.image} src={coronaImage} alt="Covid-19" />
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>  
            </div>
        )
        
    }
}
export default App;