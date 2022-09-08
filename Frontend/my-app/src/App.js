import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwt from "jsonwebtoken";

import CoinList from "./CoinList";
import CoinDetail from "./CoinDetail";
import FavoriteList from "./Favorties";
import NavBar from "./Navbar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import LoadingSpinner from "./LoadingSpinner";

import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";
import TokenApi from "./Api";

import "./App.css";

function App() {
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [favorites, setFavorites] = useState(new Set([]));

	const [token, setToken] = useLocalStorage("tokentab-token");

	useEffect(() => {
		async function getUser() {
			if (token) {
				try {
					let { username } = jwt.decode(token);

					TokenApi.token = token;
					let currentUser = await TokenApi.getUser(username);
					currentUser.favorites = await TokenApi.getFavorites(
						username
					);

					setFavorites(new Set(currentUser.favorites));
					setCurrentUser(currentUser);
				} catch (err) {
					setCurrentUser(null);
				}
			}
			setLoading(true);
		}
		setLoading(false);
		getUser();
	}, [token]);

	async function getFavorites(username) {
		return await TokenApi.getFavorites(username);
	}

	function hasFavorites(id) {
		return favorites.has(id);
	}

	async function applyToFavorites(id) {
		if (hasFavorites(id)) {
			await TokenApi.delFromFavorites(currentUser.username, id);
			favorites.delete(id);
			setFavorites(new Set([...favorites]));
		} else {
			await TokenApi.applyToFavorites(currentUser.username, id);
			setFavorites(new Set([...favorites, id]));
		}
	}

	function logout() {
		setCurrentUser(null);
		setToken(null);
	}

	async function login(data) {
		try {
			let token = await TokenApi.login(data);
			setToken(token);
			return { success: true };
		} catch (err) {
			return { success: false, errors: err };
		}
	}

	async function signup(data) {
		try {
			let token = await TokenApi.signup(data);
			setToken(token);
			return { success: true };
		} catch (err) {
			return { success: false, errors: err };
		}
	}

	if (!loading) return <LoadingSpinner />;

	return (
		<BrowserRouter>
			<UserContext.Provider
				value={{
					currentUser,
					setCurrentUser,
					hasFavorites,
					applyToFavorites,
					getFavorites,
				}}
			>
				<NavBar logout={logout} />
				<main>
					<Routes>
						<Route exact path='/' element={<Home />} />

						<Route exact path='/coins' element={<CoinList />} />

						<Route
							exact
							path='/coins/:symbol'
							element={<CoinDetail />}
						/>

						<Route
							exact
							path='/favorites/'
							element={<FavoriteList favorites={favorites} />}
						/>

						<Route
							exact
							path='/login'
							element={<LoginForm login={login} />}
						/>

						<Route
							exact
							path='/signup'
							element={<SignupForm signup={signup} />}
						/>
					</Routes>
				</main>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
