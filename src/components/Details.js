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
import ABS_logo_small from '../images/abs_logo-removebg-preview_small-removebg-preview (2).png'
import YoutubeEmbed from './YoutubeEmbed';
import Rating from '@material-ui/lab/Rating';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

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
        width: 25,
        height: 25,
    },
    arrowBack: {
        verticalAlign: 'top',
        color: 'black',
        paddingRight: '0.2rem',
        '&:active': {
            transform: 'scale(1.6)',
            zIndex: 1,
        },
    },
    ratingFeedback: {
        position: 'fixed',
        color: 'green',
        height: '4rem',
        width: '60%',
        marginLeft: '20%',
        textAlign: 'center',
        marginTop: '1rem',
        zIndex: 10,
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.4rem',
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius: '1rem',
        alignItems: 'center',
    },
    ratingFeedback_mobile: {
        position: 'fixed',
        color: 'green',
        width: '90%',
        height: '3rem',
        marginLeft: '5%',
        textAlign: 'center',
        marginTop: '1rem',
        zIndex: 10,
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.4rem',
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius: '1rem',
        alignItems: 'center',
    },
}));

export default function Details() {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const animeId = useSelector(state => state.animeId)
    const [anime, setAnime] = useState('')
    const history = useHistory();
    const [showRatingFeedback, setShowRatingFeedback] = useState(false)
    const [sum, setSum] = useState(0)
    const [ratingCount, setRatingCount] = useState(0)
    const [ratingsFetched, setRatingsFetched] = useState(false)

    useEffect(() => {
        animeService
          .getById(animeId)
          .then(response => {
              setAnime(response)
              console.log(anime)
          })
    }, [animeId]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        animeService
          .getAllRatings()
          .then(response => {
              let res = response
              let sum = 0
              let ratCount = 0
              res.map(rating => {
                if (rating.mal_id === anime.mal_id) {
                    sum = sum + rating.rating
                    ratCount = ratCount + 1
                }
                return console.log('map return')
              })
              setSum(sum)
              setRatingCount(ratCount)
              setRatingsFetched(true)
          })
    }, [anime])

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

    function rate(event) {
        const toBeRated = {
            mal_id: anime.mal_id,
            rating: parseInt(event.target.value)
        }

        if (!isNaN(toBeRated.rating))
            animeService
                .postRating(toBeRated)
                .then(response => {
                    console.log(response)
                })
            animeService
            .getAllRatings()
            .then(response => {
                let res = response
                let sum = 0
                let ratCount = 0
                res.map(rating => {
                    if (rating.mal_id === anime.mal_id) {
                        sum = sum + rating.rating
                        ratCount = ratCount + 1
                    }
                    return console.log('map return')
                })
                setSum(sum)
                setRatingCount(ratCount)
            })

        setShowRatingFeedback(true)
        setTimeout(() => {
            setShowRatingFeedback(false)
        }, 5000)
    }

    return (
        <div>
        <BrowserView className={classes.details}>
        {showRatingFeedback ?
            <div className={classes.ratingFeedback} >
                <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '1rem', fontSize: '1.5rem', transform: 'scale(1.4)' }} />
                Feedback registered
            </div>
            :
            null
        }
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
                    <Typography variant="subtitle1">
                        <img
                            className={classes.malLogo}
                            src={MAL_logo}
                            alt="MyAnimeList Logo"
                        />{' '}
                        <Rating
                            name="simple-controlled"
                            value={Math.round(anime.score / 2)}
                        />  
                        {' '}
                        ({anime.scored_by})
                        <br />
                        <img
                            className={classes.malLogo}
                            src={ABS_logo_small}
                            alt="ABS Logo"
                        />{' '}
                        {ratingsFetched ?
                            <Rating
                                name="desktop-simple-controlled"
                                value={
                                    ratingCount > 0 ?
                                        sum / ratingCount
                                        :
                                        0
                                    }
                                onClick={rate}
                                style={{ borderStyle: 'inset' }}
                            />
                                :
                            `loading...`
                                }
                        ({ratingCount})
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
            {showRatingFeedback ?
                <div className={classes.ratingFeedback_mobile}>
                    <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '1rem', fontSize: '1.5rem', transform: 'scale(1.4)' }} />
                    Feedback registered
                </div>
                :
                null
            }
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
                    <img
                        className={classes.malLogo}
                        src={MAL_logo}
                        alt="MyAnimeList Logo"
                    />{' '}
                    <Rating
                        name="simple-controlled"
                        value={Math.round(anime.score / 2)}
                    />{' '}
                    ({anime.scored_by})
                    <br />
                    <img
                        className={classes.malLogo}
                        src={ABS_logo_small}
                        alt="ABS Logo"
                    />{' '}
                    {ratingsFetched === true ?
                        <Rating
                            name="mobile-simple-controlled"
                            value={
                                ratingCount > 0 ?
                                    sum / ratingCount
                                    :
                                    0
                                }
                            onClick={rate}
                            style={{ borderStyle: 'inset' }}
                        />
                            :
                        `loading...`
                            }
                    ({ratingCount})
                </Typography>
                    <Typography variant="body2" gutterBottom>
                    {anime.synopsis}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    <img
                        className={classes.malLogo}
                        src={MAL_logo}
                        alt="MyAnimeList Logo"
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