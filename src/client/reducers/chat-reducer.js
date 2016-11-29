import * as actions from 'actions'

const defaultState = {
  logged: false,
  messages: [],
  typing: false,
  users: []
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case actions.ADD_MESSAGE:
      return {...state, messages: [...state.messages, action.message]}
    case actions.INITIAL_MESSAGES:
      return {...state, messages: action.messages}
    case actions.LOGIN:
      return {...state, logged: true}
    case actions.IS_TYPING:
      return {...state, typing: action.typing}
    case actions.USER_LIST_UPDATE:
      return {...state, users: action.users}
    default:
      return state
  }
}
