import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

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
    cursor: 'pointer',
    '&:active': {
        transform: 'scale(1.4)',
        zIndex: 1,
        color: 'red',
    },
  }
});

export default function RatingBar({ ratings, index }) {
  const classes = useStyles();
  const [rating, setRating] = useState(50);

  function handleThumbUp() {
      if (rating <= 90) {
          setRating(rating + 10)
      }
  }

  function handleThumbDown() {
        if (rating >= 10) {
            setRating(rating - 10)
        }
    }

  return (
    <div>S{index}<ThumbUpIcon onClick={handleThumbUp} className={classes.thumbUpIcon}/><ThumbDownIcon onClick={handleThumbDown} className={classes.thumbDownIcon}/> <LinearProgressWithLabel value={rating} /></div>
  );
}