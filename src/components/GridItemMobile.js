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

    function checkFontSize(anime) {
        if (anime.title.length > 50) {
            return 0.70
        }
        if (anime.title.length > 20) {
            return 0.85
        }
        return 1.1
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
              <Grid item xs>
                <ButtonBase className={classes.image} style={{ float: 'left' }}>
                    <img className={classes.img} alt="complex" src={props.imgUrl} />
                </ButtonBase>
                <div style={{ float: 'left', textAlign: 'left', maxWidth: '60%' }}>
                    <Typography gutterBottom variant="subtitle1" style={{ cursor: 'pointer', fontSize: `${fontSize * 1.2 * checkFontSize(props)}rem` }}>
                        {props.title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" >
                    <Rating
                    name="simple-controlled"
                    value={props.stars}
                    style={{ fontSize: '1rem' }}
                />  
                </Typography>
                <Typography gutterBottom variant="subtitle1" >
                <div >Score: {props.score}</div>
                </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </div>
)
    }