import axios from 'axios';

const url ='https://covid19.mathdro.id/api';

//country data will be fetched from App.js then will fetched from CountryPicker
export const fetchData = async (country) => { //async functions deals with both read and write it means multiple function at a time

    let changeableURL = url; //for CountryPicker data

    if(country){ //if there is country then only change its URL
        changeableURL = `${url}/countries/${country}`;
    }

    try{
        // distructuring data and taking only those data which are imp in the data.

        //phle url pass hoga then country data from CountryPicker toh changeableURL ho jayega  

        const {data : {confirmed,recovered,deaths,lastUpdate}} = await axios.get(changeableURL); //await is for async data which tells wait till this task is over 
        //Now fetching some data in modifiedData bcz we dont need all the data. It holds the objects
        //In JS if key:value name is same then we can write it only once like in confirmed....
        return {confirmed,recovered,deaths,lastUpdate};
    }catch(error){
        console.log(error);
    } 
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`); // second url to get daily data records for chart
        
        const modifiedData = data.map((dailyData)=> ({ //instant return of object
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;
    }catch(error){
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try{
        const {data:{countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name); //we just need country name from API through map() not ISO2 or ISO3 name.

    }catch(error){
        console.log(error);
    }
}
