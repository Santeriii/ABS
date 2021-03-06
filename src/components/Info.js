import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    BrowserView,
    MobileView
} from "react-device-detect";
import useWindowDimensions from '../tools/WindowDimensions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import logo from '../images/abs_logo-removebg-preview.png';
import "../css/Nav.css";

const useStyles = makeStyles((theme) => ({
    details: {
        flexGrow: 1,
        paddingTop: '5.5rem',
    },
    infoMobile: {
        flexGrow: 1,
        paddingTop: '5.25rem',
        paddingBottom: '0.5rem',
    },
    title: {
        fontSize: '1.5rem',
        color: 'red',
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    image: {
      width: 160,
      height: 160,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    malLogo: {
        width: 30,
        height: 30,
    },
    summary: {
        fontSize: '1rem',
    },
    arrowBack: {
        verticalAlign: 'top',
        color: 'black',
        position: 'absolute',
        '&:active': {
            transform: 'scale(1.6)',
            zIndex: 1,
        },
    },
    arrowBack_desktop: {
        marginTop: '1rem',
        marginLeft: '1rem',
        verticalAlign: 'top',
        color: 'black',
        position: 'absolute',
        '&:active': {
            transform: 'scale(1.9)',
            zIndex: 1,
        },
        transform: 'scale(1.3)',
        cursor: 'pointer',
    },
}));

export default function Info() {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const history = useHistory();

    function checkWidthForWidth() {
        if (width > 2000) {
            return '70vw'
        }
        if (width > 1400) {
            return '80vw'
        }
        return '90vw'
    }

    function handleEnpoint() {
        setTimeout(() => {
            history.push("/");
        }, 100);
    }

    return (
        <div>
            <BrowserView className={classes.details}>
                <Paper className={classes.paper} style={{ width: checkWidthForWidth() }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <ArrowBackIcon className={classes.arrowBack_desktop} onClick={handleEnpoint}/>
                            <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '13%', fontSize: '1.4rem' }} >
                                <img src={logo} alt="ABS-logo" style={{ width: '17rem', marginBottom: '-1rem', marginTop: '2rem'}} />
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '15%', fontSize: '1.4rem' }} >
                                About
                            </Typography>
                            <div style={{ width: '70%', marginLeft: '15%' }}>
                            <Typography gutterBottom variant="subtitle1" className={classes.summary} style={{ color: 'grey'}}>
                                    Welcome to AnimeBySeason, a quick and easy-to-use rating app for a vast anime collection provided by MyAnimeList. No signing, nothing futile.
                                </Typography><br />
                                <Typography gutterBottom variant="subtitle1" style={{ fontSize: '1.1rem' }} >
                                    Review System:
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" className={classes.summary} style={{ color: 'grey'}}>
                                    The site's aim is to provide an anime reviewing system as simple as possible, which means it's not based on user registration or
                                     complicated scoring system; each series/movie has its' own 1-5 star rating and each season a thumbs-up/-down voting, nothing else.
                                     Anonymous user may rate each series/movie once, same goes for rating seasons.
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.1rem' }} >
                                    <GitHubIcon style={{ marginRight: '1.3rem', transform: 'scale(1.3)' }}/>Santeriii
                                </Typography>
                            </div>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
            </BrowserView>
            <MobileView className={classes.infoMobile}>
                <Paper className={classes.paper} style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <ArrowBackIcon className={classes.arrowBack} onClick={handleEnpoint}/>
                            <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '3%', marginTop: '1rem', marginBottom: '-0.5rem' }} >
                                <img src={logo} alt="ABS-logo" style={{ width: '17rem' }}/>
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '5%', fontSize: '1.4rem', marginBottom: '0.5rem' }} >
                                About
                            </Typography>
                            <div style={{ width: '95%', marginLeft: '5%' }}>
                                <Typography gutterBottom variant="subtitle1" className={classes.summary} style={{ color: 'grey', marginBottom: '0.7rem' }}>
                                    Welcome to AnimeBySeason, a quick and easy-to-use rating app for a vast anime collection provided by MyAnimeList. No signing, nothing futile.
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" style={{ fontSize: '1.1rem' }} >
                                    Review System:
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" className={classes.summary} style={{ color: 'grey'}}>
                                    The site's aim is to provide an anime reviewing system as simple as possible, which means it's not based on user registration or
                                     complicated scoring system; each series/movie has its' own 1-5 star rating and each season a thumbs-up/-down voting, nothing else.
                                     Anonymous user may rate each series/movie once, same goes for rating seasons.
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" style={{ marginTop: '1.7rem', marginBottom: '1rem', fontSize: '1.1rem' }} >
                                    <GitHubIcon style={{ marginRight: '1rem', transform: 'scale(1.3)' }}/>Santeriii
                                </Typography>
                            </div>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
            </MobileView>
        </div>
    );
}