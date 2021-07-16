const animeIdReducer = (state = '', action) => {
    switch(action.type) {
      case 'CHANGE_ID':
        return action.data
      default:
        return state
    }
  }
  
  export const changeAnimeId = (id) => {
    return {
      type: 'CHANGE_ID',
      data: id,
    }
  }
  
  export default animeIdReducer