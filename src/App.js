import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'auth',
				element:<AuthPage/>
			}
		]
	}
])

const App = () => {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
