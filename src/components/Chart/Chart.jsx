import React, {useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data,country}) => {
    const [dailyData, setDailyData] = useState([]); //initialised as an empty array

    //useEffect is used for displaying something after render just like button and alert example
    useEffect( () => { //in useEffect hooks we cannot simply use async in this line
        const fetchAPI = async () => { //async function is used here
            setDailyData(await fetchDailyData());
        }
  
        fetchAPI(); //calling the function
    },[]); //[] single array is for display the graph after refreshing only once. If not it will show the line graph infinite time

    const lineChart = ( //lineChart is for global
        //condition for dailyData if it is available then show line graph orelse null
        dailyData.length ? ( //if it is 0 then it will show null (false) or else show the line(true)
        <Line
            data={{ //single { will make it dynamic} but {{ will make it an object}}

                labels: dailyData.map(({date}) => date), //returns the array of date in downward lables

                datasets: [{ //datasets is for that mouse hover where we are getting the data,lable,colur,fill
                    data: dailyData.map(({confirmed}) => confirmed), //map will loop through the array of datas
                    label : 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label : 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                    
                }], //array of objects
            }}
            />) : null
    );

    console.log(data.confirmed, data.recovered, data.deaths);

    const barChart = (
        data.confirmed? (
            <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)', 
                        'rgba(255,0,0,0.5)',
                        ],
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value] //from props
                }]
            }}
            options={{
                legend: {display : false} ,//we dont want to display a map
                title: { display: true, text: `Current state in ${country}`}
            }}
             />

        ): null
    )

    return (
       <div className={styles.container}>
      {country ? barChart : lineChart} {/* false means Globally data i.e Line Chart true means barChart */}
       </div>
    )
}

export default Chart;