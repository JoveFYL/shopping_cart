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
					{ index: true, element: <Shop /> },
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