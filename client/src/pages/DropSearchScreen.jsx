import React from 'react';
import styles from './DropSearch.module.css';
import { useState, useEffect } from 'react';

import {searchByUrl, searchByName, selectionSearch } from '../services/api.js';

import ResultContainer from '../components/organisms/ResultContainer.jsx';
import Spinner from '../components/atoms/Spinner.jsx';
import LoadingIcon from '../components/atoms/LoadingIcon.jsx';


function DropSearchScreen() {
    const [select, setSelect] = useState(0);
    const [search, setSearch] = useState('');
    const [display, setDisplay] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [displayBackBtn, setBackBtn] = useState(false);
    const [displayResultBox, setResultBox] = useState(false);


    const [searchResult, setSearchResult] = useState([]);
    const [productList, setProductList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    function SubmitButton () {
        return(<button type="submit" >Search</button>);
    }

    async function submitHandler(e){
        e.preventDefault();
        //set original state for components
        setErrorMessage(prev => prev = "");
        setResultBox(false);
        setIsLoading(true);
        setBackBtn(false);
        setDisplay(select);

        let result;
        const isValid = validateSearch(search, select);

        if (select == 0 && isValid){
            result = await searchByUrl(search);
            if (result){
            setSearchResult(result);
            setResultBox(true);
            }
        }
        if(select == 1 && isValid){
            result = await searchByName(search);
            if (result){
            setProductList(result);
            setResultBox(true);
            }
        }
        setTimeout(() => {setIsLoading(false)}, 500);
    }

    function validateSearch(search, select){
        const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const acceptPattern = /^(?!\s+$)[\w\s\-]+$/;
        if(select == 1){
            if (xssPattern.test(search)) {
                setErrorMessage(prev => prev = "Unacceptable Code lol");
                return false;
            }
            if (acceptPattern.test(search)) {
                return true;
            }
            setErrorMessage(prev => prev ="Invalid Input");
            return false;
        }   
        if(select == 0){
            const matches = search.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/);
            const hostname = matches ? matches[1] : null;
            switch(hostname){
                case 'cjdropshipping.com':
                    return true;
                default:
                    setErrorMessage(prev => prev = "URL is not accepted. \n *Acceptable URL www.cjdropshipping.com/product/*");
                    return false;
            }
        }
    }

    async function listSelectionItems(name, sku){
        setIsLoading(true);        
        const res = await selectionSearch(name, sku);
        setSearchResult(res);
        setBackBtn(true);
        setDisplay(0);
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

console.log(errorMessage);

    return (
        <div className={styles.main}>
            <div className={styles.headerContainer}>
                <h1 className={styles.headerTitle}>Drop Search</h1>
                <p className={styles.headerSubText}>The reverse product searching tool to find companies for competitor analysis and business intelligence.</p>
                <p className={styles.headerSubText}>Please Search Responsibly</p>
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
                    {isLoading == true ? <></> : errorMessage != false  ? <h5 className={styles.errorMessage}>{errorMessage}</h5> : <></>}
                </form>
            </div>
            {isLoading == true ? <><LoadingIcon /></> :
            displayResultBox === true ? 
            <div>
                <div className={styles.resContainer}>
                <div className={styles.resResult}>
                    <div className={styles.resBtnContainer}>
                        <h1 className={styles.resTitle}>Results:</h1>
                        {displayBackBtn == true ? <button onClick={displayProductList} className={styles.backBtn}>Back</button> : <></>}
                    </div>
                    <ResultContainer select={display} searchResult={searchResult} productList={productList} selectionList={listSelectionItems} />
                </div>
                </div>
            </div> : <></>}
        </div>
        
    )
}

export default DropSearchScreen
