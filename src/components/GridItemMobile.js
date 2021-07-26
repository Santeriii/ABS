import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../css/Grid.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { changeAnimeId } from '../reducers/animeIdReducer'
import logo from '../images/MAL_logo.jpg'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
        '&:active': {
            transform: 'scale(1.07)',
            zIndex: 1,
        },
        minWidth: '90vw'
    },
    image: {
        width: 100,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    malLogo: {
      width: 20,
      height: 20,
      marginRight: '0.5rem',
    }
}));

export default function GridItem(props) {
    const classes = useStyles();
    const [fontSize] = useState(1);
    console.log(props.stars)
    const dispatch = useDispatch()
    const animeId = useSelector(state => state.animeId)
    const history = useHistory();

    function setAnimeId(id) {
        dispatch(changeAnimeId(id))
        console.log(animeId)
    }

    function handleEndpoint() {
        setAnimeId(props.id)
        setTimeout(() => {
            history.push("/details");
        }, 100);
    }

    return (
        <div
                    onClick={handleEndpoint}
                >
        <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs style={{ position: 'relative' }}>
                <ButtonBase className={classes.image} style={{ float: 'left' }}>
                    <img className={classes.img} alt="complex" src={props.imgUrl} />
                </ButtonBase>
                <div style={{ float: 'left', textAlign: 'left', maxWidth: '60%' }}>
                    <Typography gutterBottom variant="subtitle1" style={{ cursor: 'pointer', fontSize: `${fontSize * 1.2 * 0.85}rem` }}>
                        {props.title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" >
                    <Rating
                    name="simple-controlled"
                    value={props.stars}
                    style={{ fontSize: '1rem' }}
                />  
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: '0.7rem' }}><img src={logo} alt="MAL-logo" className={classes.malLogo} /> Score: {props.score}</div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </div>
)
    }