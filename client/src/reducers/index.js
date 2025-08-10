import { combineReducers } from "redux";

import authReducer from './authReducer'
import postReducer from "./postReducer";
import storyReducer from "./storyReducer";

export const reducers = combineReducers({authReducer, postReducer, storyReducer})