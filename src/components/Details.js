import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {
    BrowserView,
    MobileView
} from "react-device-detect";
import useWindowDimensions from '../tools/WindowDimensions';
import { useSelector } from 'react-redux'
import animeService from '../services/animes';
import MAL_logo from '../images/MAL_logo.jpg'
import YoutubeEmbed from './YoutubeEmbed';
import Rating from '@material-ui/lab/Rating';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    details: {
        flexGrow: 1,
        paddingTop: '5.5rem',
    },
    detailsMobile: {
        flexGrow: 1,
        paddingTop: '5.25rem',
        paddingBottom: '0.5rem',
    },
    title: {
        cursor: 'pointer',
        color: 'blue',
        textDecoration: 'underline',
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
    arrowBack: {
        verticalAlign: 'top',
        color: 'black',
        paddingRight: '0.2rem',
        '&:active': {
            transform: 'scale(1.6)',
            zIndex: 1,
        },
    }
}));

export default function Details() {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const animeId = useSelector(state => state.animeId)
    const [anime, setAnime] = useState('')
    const history = useHistory();

    useEffect(() => {
        animeService
          .getById(animeId)
          .then(response => {
              setAnime(response)
              console.log(anime)
          })
    }, [anime, animeId])

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
            <Grid item>
                <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={anime.image_url} />
                </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" className={classes.title}>
                        <a href={anime.url}>
                            {anime.title}
                        </a>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                    {anime.synopsis}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    <img
                        className={classes.malLogo}
                        src={MAL_logo}
                        alt="AnimeBySeason Logo"
                    />
                    Rank: {anime.rank}<br/>
                    Premiered: {anime.premiered}<br/>
                    Rating: {anime.rating}<br/>
                    Episodes: {anime.episodes}<br/>
                    Status: {anime.status}
                    </Typography>
                </Grid>
                </Grid>
                <Grid item>
                <Typography variant="subtitle1">
                    <Rating
                        name="simple-controlled"
                        value={Math.round(anime.score / 2)}
                    />  
                </Typography>
                </Grid>
                {anime.trailer_url !== undefined ?
                    <YoutubeEmbed url={anime.trailer_url} />
                    :
                    null
                }
            </Grid>
            </Grid>
        </Paper>
        </BrowserView>
        <MobileView className={classes.detailsMobile}>
            <Paper className={classes.paper} style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography variant="subtitle1">
                        <ArrowBackIcon className={classes.arrowBack} onClick={handleEnpoint} />
                        <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={anime.image_url} />
                        </ButtonBase>
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" className={classes.title}>
                        <a href={anime.url}>
                            {anime.title}
                        </a>
                    </Typography>
                    <Typography variant="subtitle1">
                    <Rating
                        name="simple-controlled"
                        value={Math.round(anime.score / 2)}
                    />  
                </Typography>
                    <Typography variant="body2" gutterBottom>
                    {anime.synopsis}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    <img
                        className={classes.malLogo}
                        src={MAL_logo}
                        alt="AnimeBySeason Logo"
                    />
                    Rank: {anime.rank}<br/>
                    Premiered: {anime.premiered}<br/>
                    Rating: {anime.rating}<br/>
                    Episodes: {anime.episodes}<br/>
                    Status: {anime.status}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {anime.trailer_url !== undefined ?
                        <YoutubeEmbed url={anime.trailer_url} />
                        :
                        null
                        }
                    </Typography>
                </Grid>
                </Grid>
            </Grid>
            </Grid>
        </Paper>
        </MobileView>
        </div>
    );
}