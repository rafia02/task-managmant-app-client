import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Components/Home/Home";
import { Login } from "../Components/Shared/Login";
import { Signup } from "../Components/Shared/Signup";
import { Layout } from "../Layout/Layout";

export const router = createBrowserRouter([
    {path: "/", element: <Layout></Layout>, children: [
        {path: "/", element: <Home></Home>},
        {path: "/signup", element: <Signup></Signup>},
        {path: "/login", element: <Login></Login>},

    ]}
])