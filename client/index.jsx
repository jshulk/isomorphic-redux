import React       from 'react';
import { Router }  from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import routes      from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import { fromJS } from "immutable";
import promiseMiddleware from 'lib/promiseMiddleware';
import { applyMiddleware } from 'redux';

let initialState = window.__INITIAL_STATE__;

Object.keys(initialState)
.forEach( key => {
	initialState[key] = fromJS(initialState[key]);
}); 

const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);


React.render(
   <Provider store={store}>
   	{() =>
   		<Router children = {routes} history={history} />
   	}
   </Provider>, 
   document.getElementById('react-view')
);