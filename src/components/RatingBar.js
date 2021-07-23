import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import animeService from '../services/animes'

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  thumbUpIcon: {
    marginLeft: '1rem',
    cursor: 'pointer',
    '&:active': {
        transform: 'scale(1.4)',
        zIndex: 1,
        color: 'green',
    },
  },
  thumbDownIcon: {
    marginLeft: '1rem',
    marginRight: '1rem',
    cursor: 'pointer',
    '&:active': {
        transform: 'scale(1.4)',
        zIndex: 1,
        color: 'red',
    },
  }
});

export default function RatingBar({ ratings, index, mal_id }) {
  const classes = useStyles();
  const [rating, setRating] = useState(50);
  const [thisRatings, setThisRatings] = useState(ratings)

  useEffect(() => {
    let sum = 0
    thisRatings.map(rating => {
      return sum = sum + rating.rating
    })
    setRating(sum / 2 / thisRatings.length * 100)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let sum = 0
    thisRatings.map(rating => {
      return sum = sum + rating.rating
    })
    setRating(sum / 2 / thisRatings.length * 100)
  }, [rate]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleThumbUp() {
      rate(2)
  }

  function rate(rating) {
    const toBeRated = {
      mal_id: mal_id,
      season: index,
      rating: rating
    }

    setThisRatings(thisRatings.concat(toBeRated))

    animeService.postSeasonRating(toBeRated)
      .then(response => {
        console.log(response)
      })
  }

  function handleThumbDown() {
        rate(0)
    }

  return (
    <div>S{index}<ThumbUpIcon onClick={handleThumbUp} className={classes.thumbUpIcon}/><ThumbDownIcon onClick={handleThumbDown} className={classes.thumbDownIcon}/>({thisRatings.length})<LinearProgressWithLabel value={rating || 50} /></div>
  );
}