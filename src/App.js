import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import EditProfilePage from './pages/EditProfilePage';
import ChatAuthProvider from './context/ChatAuthProvider'
import SocketProvider from './context/SocketProvider'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'auth',
				element: <AuthPage />
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
			<SocketProvider>
				<RouterProvider router={router} />
				<Toaster />
			</SocketProvider>
		</div>
	);
}

export default App;
