import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import EditProfilePage from './pages/EditProfilePage';
import ChatAuthProvider from './context/ChatAuthProvider'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'auth',
				element:<AuthPage/>
			},
		]
	},
	{
		path: '/home',
		element: 
			<ChatAuthProvider>
				<HomePage />
			</ChatAuthProvider>
	},
	{
		path: '/edit-profile',
		element: 
			<ChatAuthProvider>
				<EditProfilePage />
			</ChatAuthProvider>
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
