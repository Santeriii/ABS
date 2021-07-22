import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import RatingBar from './RatingBar'

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
  root: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
    width: '100%',
  },
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

export default function RatingBars({ seasons }) {
  const classes = useStyles();
  const [showSeasonRating, setShowSeasonRating] = useState(false)

  function handleShowSeasonRating() {
      setShowSeasonRating(!showSeasonRating)
  }

  return (
    <div className={classes.root}>
        {showSeasonRating ?
            <div>
                {seasons.map((season, index) => {
                    return <RatingBar index={index + 1} />
                })}
                <Button variant="contained" onClick={handleShowSeasonRating} style={{ transform: 'scale(0.8)' }}>Hide seasons</Button>
            </div>
            :
            <Button variant="contained" onClick={handleShowSeasonRating} style={{ transform: 'scale(0.8)' }}>Show seasons</Button>
        }
    </div>
  );
}