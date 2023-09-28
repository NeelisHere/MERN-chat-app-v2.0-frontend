import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ChatAuthProvider from './context/ChatAuthProvider'
import SocketProvider from './context/SocketProvider'

const router = createBrowserRouter([
	{
		path: '/',
		element: 
			<ChatAuthProvider>
				<Layout />
			</ChatAuthProvider>,
		children: [
			{
				path: 'auth',
				element: 
					
				<AuthPage />
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
