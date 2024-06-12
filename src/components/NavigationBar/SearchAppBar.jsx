import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: alpha(theme.palette.primary.dark, 0.23),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function SearchAppBar() {
    // navigate to search results upon key press for search bar
    let navigate = useNavigate();
    
    const [ searchParams ] = useSearchParams();
    const query = searchParams.get('query');
    
    const setQuery = (query) => {
        searchParams.set('query', query);
        navigate(`/SearchResults?query=${query}`);
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                // on enter key press, navigate to search results
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setQuery(e.target.value);
                    }
                }}
            />
        </Search>
    );
}