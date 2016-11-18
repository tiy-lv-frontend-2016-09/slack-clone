import * as actions from 'actions'

const defaultState = {
  logged: false,
  messages: []
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.ADD_MESSAGE:
      return {...state, messages: [...state.messages, action.message]}
    case actions.LOGIN:
      return {...state, logged: true}
    default:
      return state
  }
}
