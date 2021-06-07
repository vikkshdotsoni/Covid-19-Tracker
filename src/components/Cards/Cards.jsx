import React from 'react';
import {Card , CardContent , Typography , Grid} from '@material-ui/core';
import CountUp from 'react-countup'; // for counting up the data of infected,recovered and deaths
import styles from './Cards.module.css';
import cx from 'classnames'; //to handle multiple style sheets.
const Cards = ({data:{confirmed, recovered,deaths,lastUpdate}}) => { //destructing the api data
    if(!confirmed){
        return 'Loading...';
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs= {12} md={3} className={cx(styles.card,styles.infected)}> 
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={confirmed.value}
                            duration={2.5}
                            separator="," //(,) between data numbers
                        />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases in COVID-19</Typography>
                    </CardContent>
                </Grid>
            
                <Grid item component={Card} xs= {12} md={3} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={recovered.value}
                            duration={2.5}
                            separator="," //(,) between data numbers
                        />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of recoveries in COVID-19</Typography>
                    </CardContent>
                </Grid>
            
                <Grid item component={Card} xs= {12} md={3} className={cx(styles.card,styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={deaths.value}
                            duration={2.5}
                            separator="," //(,) between data numbers
                        />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;