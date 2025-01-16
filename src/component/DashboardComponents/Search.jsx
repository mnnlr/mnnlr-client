import SearchIcon from '@mui/icons-material/Search';

const SearchSomething = ({setValue,placeholder,Value,Style,iconColor}) => {
    return (
        <div style={{position:'relative'}} >
            <input type='text' placeholder={placeholder} value={Value} onChange={(e)=>{setValue&&setValue(e.target.value)}} style={{...Style,textIndent: '35px'}} />
            <SearchIcon
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    color: iconColor?iconColor:'#888', 
                    pointerEvents: 'none', 
                }}
            />
        </div>
    )
}

export default SearchSomething