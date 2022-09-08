import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "./UserContext";

function Home() {
	const { currentUser } = useContext(UserContext);
	return (
		<section>
			<div className='text-center'>
				<h1 className='font-weight-bold'>
					<strong>TokenTab</strong>
				</h1>
				<p className='lead'>All the coins in one, convenient place.</p>
				{currentUser ? (
					<div>
						<h2>Welcome Back, {currentUser.username}!</h2>
						<Link
							className='m-2 btn btn-primary font-weight-bold'
							to='/coins/'
						>
							Check it out!
						</Link>
					</div>
				) : (
					<p>
						<Link
							className='m-2 btn btn-primary font-weight-bold'
							to='/coins/'
						>
							Check it out!
						</Link>
					</p>
				)}
			</div>
		</section>
	);
}

export default Home;
