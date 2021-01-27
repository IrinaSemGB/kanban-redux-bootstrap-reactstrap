import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import kanban from './reduser';


const store = createStore(
    kanban, composeWithDevTools(applyMiddleware())
)

export default store;