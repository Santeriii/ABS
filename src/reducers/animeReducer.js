  const animeReducer = (state = '', action) => {
    switch(action.type) {
      case 'CHANGE_SEARCH_TAG':
        return action.data
      default:
        return state
    }
  }
  
  export const changeSearchTerm = (searchTerm) => {
    return {
      type: 'CHANGE_SEARCH_TAG',
      data: searchTerm
    }
  }
  
  export default animeReducer