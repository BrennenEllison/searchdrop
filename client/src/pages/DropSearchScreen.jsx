import React from 'react';
import styles from './DropSearch.module.css';
import { useState } from 'react';
import { useFormStatus } from "react-dom";

import {fetchHandler} from '../services/api.js';

const initialState = {
    selection: 0,
    listData: [],
}


function DropSearchScreen() {
    const [select, setSelect] = useState(0);
    const [search, setSearch] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [searchResult, setSearchResult] = useState([]);
    
    //const [secondSearch, searchingIG] = useFormState(fromImage, initialState);

    function SubmitButton () {
        return(<button type="submit" >Search</button>);
    }

    async function submitHandler(e){
        e.preventDefault();
        const res = await fetchHandler(select, search);
        setSearchResult(res);
    }

    //action={clientAction}
    //onSubmit={(e) => {submitHandler(e)}}
    return (
        <div className={styles.main}>
            <div>
                <h1>Drop Search</h1>
                <p className={styles.introText}>The reverse product searching tool to find companies for competitor analysis and business intelligence.</p>
                <p className={styles.introText}>Please Search Responsibly</p>
            </div>
            <div className={styles.searchContainer}>
                <form onSubmit={(e) => submitHandler(e)} >
                <div className={styles.searchController}>
                    <div className={styles.searchSelector}>
                        <select name="select" id="select" onChange={(e)=>setSelect(e.target.value)}>
                            <option name="select" value="0">URL</option>
                            <option name="select" value="1">Name</option>
                        </select>
                    </div>
                    <div className={styles.searchInput}>
                        <input id="search" name="search" type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                    <div className={styles.searchBtn}>
                        <SubmitButton /> 
                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DropSearchScreen
