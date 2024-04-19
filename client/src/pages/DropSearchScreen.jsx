import React from 'react';
import styles from './DropSearch.module.css';
import { useState } from 'react';

import {searchByUrl, searchByName, selectionSearch } from '../services/api.js';

import ResultContainer from '../components/organisms/ResultContainer.jsx';


function DropSearchScreen() {
    const [select, setSelect] = useState(0);
    const [search, setSearch] = useState('');
    const [display, setDisplay] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [displayBackBtn, setBackBtn] = useState(false);
    const [displayResultBox, setResultBox] = useState(false);


    const [searchResult, setSearchResult] = useState([]);
    const [productList, setProductList] = useState([]);

    function SubmitButton () {
        return(<button type="submit" >Search</button>);
    }

    async function submitHandler(e){
        e.preventDefault();
        setResultBox(true);
        setIsLoading(true);
        let result;
        setDisplay(select);

        if (select == 0){
            result = await searchByUrl(search);
            if (result){
            setSearchResult(result);
            }
        }
        if(select == 1){
            result = await searchByName(search);
            if (result){
            setProductList(result);
            }
        }
        setSearch(' ');
        setIsLoading(false);
    }

    async function listSelectionItems(name, sku){
        setIsLoading(true);        
        const res = await selectionSearch(name, sku);
        setSearchResult(res);
        setBackBtn(true);
        setDisplay(0);
        console.log(searchResult);
        setIsLoading(false);
    }

    function displayProductList(){
        setIsLoading(true); 
        setBackBtn(false);
        setDisplay(1);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }



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
            {displayResultBox === true ?
            isLoading == true ? <h1>LOADING</h1> : 
            <div>
                <div className={styles.resContainer}>
                <h1 className={styles.resTitle}>Results:</h1>
                {displayBackBtn == true ? <button onClick={displayProductList}>Product List</button> : <></>}
                <div className={styles.resResult}>
                    <ResultContainer select={display} searchResult={searchResult} productList={productList} selectionList={listSelectionItems} />
                </div>
                </div>
            </div> : <></>}
        </div>
        
    )
}

export default DropSearchScreen
