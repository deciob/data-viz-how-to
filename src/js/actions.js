
const SET_HEADER = 'SET_HEADER';

function addTodo (header) {
  return {
    type: SET_HEADER,
    header,
  };
}

export {SET_HEADER, addTodo};
