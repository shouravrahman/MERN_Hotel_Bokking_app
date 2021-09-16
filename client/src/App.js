import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
function App() {
	return (
		<div className='App'>
			<Navbar />
			<Router>
				<Route exact path='/home' component={Home} />
			</Router>
		</div>
	)
}

export default App
