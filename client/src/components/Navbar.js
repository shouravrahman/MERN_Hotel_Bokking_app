import React from 'react'
import { MenuIcon, UserIcon } from '@heroicons/react/outline'
const Navbar = () => {
	const user = JSON.parse(localStorage.getItem('currentUser'))
	const logout = () => {
		const user = localStorage.removeItem('currentUser')
		window.location.href = '/login'
	}
	return (
		<div>
			<nav className='navbar navbar-expand-lg'>
				{/* <div className='container-fluid'> */}
				<a className='navbar-brand' href='/'>
					<span className='text-primary'>MERN</span>rooms
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'>
						<MenuIcon style={{ color: 'white' }} />
					</span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ml-auto'>
						{user ? (
							<>
								{/* <h2 style={{ color: 'white' }}>{user.name}</h2> */}
								<div class='dropdown'>
									<button
										class='btn btn-secondary dropdown-toggle  text-primary'
										type='button'
										id='dropdownMenuButton'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'>
										<UserIcon
											style={{
												color: 'white',
												width: '20px',
												height: '20px',
												marginRight: '5px',
											}}
										/>
										{user.name}
									</button>
									<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
										<a
											class='dropdown-item'
											href='/bookings'
											style={{ width: '60px' }}>
											Bookings
										</a>
										<a class='dropdown-item' href='#' onClick={logout}>
											Logout
										</a>
									</div>
								</div>
							</>
						) : (
							<>
								<li className='nav-item'>
									<a
										className='nav-link active'
										aria-current='page'
										href='/register'>
										Register
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='/login'>
										Login
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
				{/* </div> */}
			</nav>
		</div>
	)
}

export default Navbar
