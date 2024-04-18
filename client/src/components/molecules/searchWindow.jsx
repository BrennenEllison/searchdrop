import { useState, useEffect } from 'react';
import SearchBar from '../atoms/searchBar.jsx';
import Button from '../atoms/button.jsx';


function SearchWindow({returnQuery}) {
    const [searchVal, setSearchVal] = useState('');
    const [selection, setSelection] = useState(1);

    const buttonVal = "Search";
    function handleInputChange(e){
        setSearchVal(e.target.value);
    }

    function handleBtnClick(){
        setSearchVal('');
        if(!searchVal){
            //write errors
            console.log("no input detected")
            return
        }
        //don't forget to handle xss and other injection attacks
        returnQuery({selection: selection, search: searchVal})

    }

    return (
        <div>
            <select onChange={(e)=>setSelection(e.target.value)} value={selection}>
                <option value={1}>URL</option>
                <option value={2}>Name</option>
            </select>
            <SearchBar onChange={handleInputChange} value={searchVal}/>
            <Button returnQuery={returnQuery} type="submit" onClick={handleBtnClick}>{buttonVal}</Button>
        </div>
    )
}

export default SearchWindow
