import { createStore } from 'redux'

import chatReducer from 'reducers/chat-reducer'

const store = createStore(chatReducer)

export default store
