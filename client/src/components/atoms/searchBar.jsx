
function SearchBar({onChange, children}) {

    return (
            <input type="text"  onChange={onChange} value={children}/>
    )
}

export default SearchBar
