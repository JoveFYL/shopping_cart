import App from "./App";
import Shop from './components/Shop.tsx';
import Home from './components/Home.tsx';
import Cart from './components/Cart.tsx';
// import ErrorPage from "./ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/shop",
                element: <Shop />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ],
    }
];

export default routes;