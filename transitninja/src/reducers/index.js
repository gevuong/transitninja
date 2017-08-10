import { combineReducers } from 'redux';
import MapReducer from './map_reducer';

export default combineReducers({
  map: MapReducer,
});
