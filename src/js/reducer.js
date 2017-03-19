
export default function todoApp (state = {}, action) {
  switch (action.type) {
    case 'SET_HEADER':
      return { ...state, header: action.header };
    default:
      return state;
  }
}
