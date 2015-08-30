import express from "express";
import React from 'react';
import {Router} from 'react-router';
import Location from 'react-router/lib/Location';
import routes from 'routes';
import { createStore, combineReducers }  from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';

const app = express();

app.use((req, res) => {
	const location = new Location(req.path, req.query);
	const reducer = combineReducers(reducers);
	const store = createStore(reducer);
	
	Router.run(routes, location, (err, routeState) => {
		if( err ){
			return console.error(err);
		}
		if( !routeState ){
			return res.status(404).end('404');
		}

		const InitialComponent = (
			<Provider store={store}>
				{() =>
					<Router {...routeState} />
				}
			</Provider>
		);
		const initialState = store.getState();
		const componentHTML = React.renderToString(InitialComponent);
		const HTML = `
			<!doctype html>
			<html>
				<head>
					<meta charset="utf-8" />
					<title>Isomorphic redux demo</title>
					<script type="application/javascript">
						window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
					</script>
				</head>
				<body>
					<div id = "react-view">${componentHTML}</div>
					<script type = "application/javascript" src = "/bundle.js"></script>
				</body>
			</html>
		`;

		res.end(HTML)

	});

});

export default app;