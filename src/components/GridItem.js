import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../css/Grid.css';
import useWindowDimensions from '../tools/WindowDimensions';
import { useDispatch } from 'react-redux'
import { changeAnimeId } from '../reducers/animeIdReducer'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
        '&:hover': {
            transform: 'scale(1.07)',
            zIndex: 1,
        },
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    title: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': '3', /* number of lines to show */
      '-webkit-box-orient': 'vertical',
   }
}));

export default function GridItem(props) {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const [fontSize, setFontSize] = useState(0.9);
    const dispatch = useDispatch()

    useEffect(() => {
        width > 1400 && setFontSize(1)
        width > 2000 && setFontSize(1.3)
    }, [width])

    function checkWidthForRating() {
        if (width < 1400) {
            return '1rem'
        }
    }

    function setAnimeId(id) {
        dispatch(changeAnimeId(id))
    }

    return (
        <Link
          onClick={() => setAnimeId(props.id)}
          to="/details"
          style={{ textDecoration: 'none' }}
        >
        <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={props.imgUrl} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" className={classes.title} style={{ cursor: 'pointer', fontSize: `${fontSize * 1.2 * props.fontSize}rem` }}>
                    {props.title.length < 70 ?
                        props.title
                    :
                        `${props.title.substring(0, 70)}...`
                    }
                </Typography>
              </Grid>
              <Grid item style={{ fontSize: `${fontSize}rem` }}>
                  <div style={{ float: 'right' }}>Score: {props.score}</div>
                <Link
                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', fontSize: `${fontSize}rem`, float: 'left' }}
                    onClick={() => setAnimeId(props.id)}
                    to="/details"
                >
                  Details
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <Rating
                    name="read-only"
                    value={props.stars}
                    style={{ fontSize: checkWidthForRating() }}
                    readOnly
                />  
                </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </Link>
)
    }