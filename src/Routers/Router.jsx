import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Components/Home/Home";
import { Login } from "../Components/Shared/Login";
import { Signup } from "../Components/Shared/Signup";
import { Layout } from "../Layout/Layout";
import { HomeLayout } from "../Layout/HomeLayout";
import { AddTask } from "../Components/Task/AddTask";
import { AllTask } from "../Components/Task/AllTask";

export const router = createBrowserRouter([
    {path: "/", element: <Layout></Layout>, children: [
        {path: "/", element: <Home/>},
        {path: "/signup", element: <Signup/>},
        {path: "/login", element: <Login/>},
        {
            path: "/home", element: <HomeLayout/>, children: [
                {path: "/home/addtask", element: <AddTask/>},
                {path: "/home/alltask", element: <AllTask/>}
            ]
        }

    ]}
])