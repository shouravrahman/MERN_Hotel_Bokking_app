import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Booking from './pages/Booking'
import Register from './pages/Register'
import Login from './pages/Login'
function App() {
	return (
		<div className='App'>
			<Navbar />

			<Router>
				<Switch>
					<Route exact path='/home' component={Home} />
					<Route exact path='/book/:roomid' component={Booking} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
