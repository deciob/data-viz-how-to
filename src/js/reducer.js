
export default function todoApp (state = {}, action) {
  switch (action.type) {
    case 'SET_HEADER':
      console.log(action);
      return { ...state, header: action.header };
    default:
      return state;
  }
}
