import React, {useState,useEffect} from 'react';
import {NativeSelect , FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';

import  {fetchCountries} from '../../api';

const CountryPicker = ({handleCountryChange}) => { //handleCountryChange is coming from app.js as a props.
    const [fetchedCountries, setFetchedCountries] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    },[setFetchedCountries]); //this will enable us only setFetchedCountries change

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue ="" onChange= {(e) => handleCountryChange(e.target.value)}> 
                <option value="">Global</option> {/* value should be empty string otherwise when shifting from other country to global it returns error*/}
                
                {fetchedCountries.map((country,i) => <option key={i} value={country}>{country}</option>) } 
            </NativeSelect>
        </FormControl>
    )
}
 
export default CountryPicker;