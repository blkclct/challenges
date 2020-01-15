const initialState = {
  donate: 0,
  message: '',
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOTAL_DONATE':
      return Object.assign({}, state, {
        donate: state.donate + action.amount,
      });
    case 'UPDATE_MESSAGE':
      return Object.assign({}, state, {
        message: action.message,
      });

    default: return state;
  }
}

export default rootReducer;
