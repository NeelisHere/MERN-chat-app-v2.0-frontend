import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import EditProfilePage from './pages/EditProfilePage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'auth',
				element:<AuthPage/>
			},
			{
				path: '/home',
				element: <HomePage />
			},
			{
				path: '/edit-profile',
				element: <EditProfilePage />
			}
		]
	}
])

const App = () => {
	return (
		<div>
			<RouterProvider router={router} />
			<Toaster />
		</div>
	);
}

export default App;
