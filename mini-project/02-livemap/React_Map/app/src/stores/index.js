import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import markers from '../reducers/markerReducer';

const Reducers = combineReducers({
    markers
});

export default applyMiddleware(thunk)(createStore)(Reducers, window.devToolsExtension ? window.devToolsExtension() : undefined);
