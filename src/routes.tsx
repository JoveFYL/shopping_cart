import { Navigate } from "react-router-dom";
import App from "./App";
import Home from './components/Home.tsx';
import Cart from './components/Cart.tsx';
import Shop, { loader as shopLoader } from './components/Shop.tsx';
import ErrorPage from "./components/ErrorPage";

const routes = [
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Navigate to="/shop" replace /> },
					{
						path: "/home",
						element: <Home />,
					},
					{
						path: "/shop",
						element: <Shop />,
						loader: shopLoader,
					},
					{
						path: "/cart",
						element: <Cart />,
					},
				]
			}
		],
	}
];

export default routes;