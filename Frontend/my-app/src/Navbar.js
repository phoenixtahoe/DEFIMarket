import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

import UserContext from "./UserContext";

import "./Navbar.css";

function NavBar({ logout }) {
	const { currentUser } = useContext(UserContext);
	return (
		<div>
			<Navbar className='' expand=''>
				<NavLink to='/' className='navbar-brand'>
					TokenTab
				</NavLink>
				{currentUser ? (
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink to='/coins'>Coins</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to='/favorites'>Favorties</NavLink>
						</NavItem>
						<NavItem className='mt-2'>
							<NavLink to='/' onClick={logout}>
								Log out {currentUser.username}
							</NavLink>
						</NavItem>
					</Nav>
				) : (
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink to='/coins'>Coins</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to='/login'>Login</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to='/signup'>Signup</NavLink>
						</NavItem>
					</Nav>
				)}
			</Navbar>
		</div>
	);
}

export default NavBar;
