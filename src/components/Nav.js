import React, { useEffect, useState } from 'react'
import "../css/Nav.css";
import logo from '../images/abs_logo-removebg-preview.png'
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux'
import { changeSearchTerm } from '../reducers/animeReducer'
import {
    BrowserView,
    MobileView
  } from "react-device-detect";
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    searchField: {
          position: 'fixed',
          top: '0.5rem',
          left: '18rem',
    },
    searchFieldMobile: {
        position: 'fixed',
        top: '4rem',
        left: '0.5rem',
        right: '0.5rem',
        backgroundColor: 'rgb(255, 255, 255, 0.3)',
  },
    infoIcon_mobile: {
        position: 'fixed',
        fontSize: '2rem',
        right: '5vw',
        top: '1.35rem',
        objectFit: 'contain',
        color: 'white',
        '&:active': {
            transform: 'scale(1.4)',
            zIndex: 1,
        },
    },
    infoIcon: {
        position: 'fixed',
        top: '1rem',
        right: '2rem',
        fontSize: '2rem',
        objectFit: 'contain',
        color: 'white',
        cursor: 'pointer',
    },
    logoContainer: {
        cursor: 'pointer',
    },
    searchIconMobile: {
        color: 'white',
        '&:active': {
            transform: 'scale(1.4)',
            zIndex: 1,
        },
    },
    navLogoMobile: {
        position: 'fixed',
        top: 0,
        left: '-1rem',
        width: '17rem',
        objectFit: 'contain',
        '&:active': {
            transform: 'scale(1.2)',
            zIndex: 1,
        },
    }
}));

function Nav() {
    const [show, handleShow] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch()
    const [localSearchTerm, setLocalSearchTerm] = useState('')

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    const handleSearchValueChange = () => {
        dispatch(changeSearchTerm(localSearchTerm))
    }
    
    const handleLocalSearchTermChange = (event) => {
        setLocalSearchTerm(event.target.value)
    }

    return (
        <div>
            <BrowserView>
                <div className={`nav ${show && "nav__black"}`}>
                    <Link className={classes.logoContainer} to="/">
                        <img
                            className="nav__logo"
                            src={logo}
                            alt="AnimeBySeason Logo"
                        />
                    </Link>
                    <TextField 
                        className={classes.searchField}
                        id="outlined-search"
                        label="Search field"
                        type="search"
                        variant="outlined"
                        onChange={handleLocalSearchTermChange}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                handleSearchValueChange()
                            }
                          }}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon style={{ color: 'white' }}/>
                              </InputAdornment>
                            ),
                          }}
                    />
                    <Link to="/info">
                        <InfoIcon
                            className={classes.infoIcon}
                        />
                    </Link>
                </div>
            </BrowserView>
            <MobileView>
                <div className={`nav__mobile ${show && "nav__black"}`}>
                    <Link className={classes.logoContainer} to="/">
                        <img
                            className={classes.navLogoMobile}
                            src={logo}
                            alt="AnimeBySeason Logo"
                        />
                        </Link>
                     <TextField 
                        className={classes.searchFieldMobile}
                        id="outlined-search2"
                        label="Search field"
                        type="search"
                        variant="outlined"
                        onChange={handleLocalSearchTermChange}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon
                                    className={classes.searchIconMobile}
                                    onClick={handleSearchValueChange}
                                />
                              </InputAdornment>
                            ),
                          }}
                    />
                    <Link to="/info">
                        <InfoIcon
                            className={classes.infoIcon_mobile}
                        />
                    </Link>
                </div>
            </MobileView>
        </div>
    )
}

export default Nav