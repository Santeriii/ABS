import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridItem from './GridItem';
import animeService from '../services/animes'
import {
    BrowserView,
    MobileView
  } from "react-device-detect";
  import useWindowDimensions from '../tools/WindowDimensions';
  import GridItemMobile from './GridItemMobile';
  import { useSelector } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    paddingTop: '4.5rem'
  },
  gridMobile: {
      flexGrow: 1,
      paddingTop: '9.25rem',
  }
}));

export default function NestedGrid() {
  const classes = useStyles();
  const [oneAnime, setOneAnime] = useState([])
  const { width } = useWindowDimensions();
  const searchTerm = useSelector(state => state.searchTerm)

  useEffect(() => {
      animeService
        .getTopByPages(1)
        .then(response => {
            setOneAnime(response.top)
        })
    console.log(oneAnime)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
      if (searchTerm.length === 0) {
        animeService
        .getTopByPages(1)
        .then(response => {
            setOneAnime(response.top)
        })
      }
      if (searchTerm.length > 0) {
        animeService
        .searchByName(searchTerm)
        .then(response => {
            setOneAnime(response.results)
        })
      }
  }, [searchTerm])

  function checkFontSize(anime) {
        if (anime.title.length > 50) {
            return 0.70
        }
      if (anime.title.length > 20) {
          return 0.85
      }
      return 1.1
  }

  function checkWidthForPadding() {
      if (width > 2000) {
          return '21rem'
      }
      if (width > 1400) {
          return '17.5rem'
      }
      return '6.5rem'
  }

  function FormGrid() {
        return <div>
            {
                oneAnime.length > 0 ?
                oneAnime.map((anime, i) => (
                    oneAnime.length > 2 + i * 3 ?
                                <Grid container item xs={12} spacing={3}>
                                    <React.Fragment>
                                        <Grid item xs={4}>
                                        <GridItem
                                            imgUrl={oneAnime[i * 3].image_url}
                                            title={
                                              oneAnime[i * 3].title.length < 35 ?
                                                oneAnime[i * 3].title
                                              :
                                                `${oneAnime[i * 3].title.substring(0, 35)}...`
                                            }
                                            score={oneAnime[i * 3].score}
                                            seasons={oneAnime[i * 3].episodes}
                                            stars={Math.round(oneAnime[i * 3].score / 2)}
                                            fontSize={0.85}
                                            id={oneAnime[i * 3].mal_id}
                                        />
                                        </Grid>
                                        <Grid item xs={4}>
                                        <GridItem
                                            imgUrl={oneAnime[1 + i * 3].image_url}
                                            title={
                                              oneAnime[1 + i * 3].title.length < 35 ?
                                                oneAnime[1 + i * 3].title
                                              :
                                                `${oneAnime[1 + i * 3].title.substring(0, 35)}...`
                                            }
                                            score={oneAnime[1 + i * 3].score}
                                            seasons={oneAnime[1 + i * 3].episodes}
                                            stars={Math.round(oneAnime[1 + i * 3].score / 2)}
                                            fontSize={0.85}
                                            id={oneAnime[1 + i * 3].mal_id}
                                        />
                                        </Grid>
                                        <Grid item xs={4}>
                                        <GridItem
                                            imgUrl={oneAnime[2 + i * 3].image_url}
                                            title={
                                              oneAnime[2 + i * 3].title.length < 35 ?
                                                oneAnime[2 + i * 3].title
                                              :
                                                `${oneAnime[2 + i * 3].title.substring(0, 35)}...`
                                            }
                                            score={oneAnime[2 + i * 3].score}
                                            seasons={oneAnime[2 + i * 3].episodes}
                                            stars={Math.round(oneAnime[2 + i * 3].score / 2)}
                                            fontSize={0.85}
                                            id={oneAnime[2 + i * 3].mal_id}
                                        />
                                        </Grid>
                                    </React.Fragment>
                                </Grid>
                                :
                                null
                ))
                :
                null
            }
      </div>
  }

  function FormMobile() {
      return <div>
        {
            oneAnime.length > 0 ?
            oneAnime.slice(0, 20).map(anime => (
          <React.Fragment>
            <Grid item xs={12} style={{ paddingBottom: '0.5rem' }}>
                <GridItemMobile
                    imgUrl={anime.image_url}
                    title={
                      anime.title.length < 45 ?
                        anime.title
                      :
                        `${anime.title.substring(0,30)}...`
                      }
                    seasons={anime.episodes}
                    stars={Math.round(anime.score / 2)}
                    fontSize={checkFontSize(anime)}
                    score={anime.score}
                    id={anime.mal_id}
                />
            </Grid>
          </React.Fragment>
            ))
            :
            null
      }
      </div>
  }

  return (
    <div >
      <Grid container spacing={0}>
          <BrowserView className={classes.grid} style={{paddingLeft: checkWidthForPadding(), paddingRight: checkWidthForPadding() }}>
        <FormGrid animes={oneAnime} />
        </BrowserView>
        <MobileView className={classes.gridMobile} style={{marginLeft: "0.5rem", marginRight: "0.5rem" }}>
        <Grid container item xs={12} spacing={0}>
            <FormMobile />
            </Grid>
        </MobileView>
      </Grid>
    </div>
  );
}