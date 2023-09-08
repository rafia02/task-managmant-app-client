import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Components/Home/Home";
import { Login } from "../Components/Shared/Login";
import { Signup } from "../Components/Shared/Signup";
import { Layout } from "../Layout/Layout";
import { HomeLayout } from "../Layout/HomeLayout";
import { AddTask } from "../Components/Task/AddTask";
import { AllTask } from "../Components/Task/AllTask";
import { Addteam } from "../Components/TeamCollaboration/Addteam";
import { useContext } from "react";
import { authContext } from "../Context/Authprovider";
import { DashbordLayout } from "../Components/Dashbord/DashbordLayout";
import { Complited } from "../Components/Dashbord/Complited";
import { Pending } from "../Components/Dashbord/Pending";


export const router = createBrowserRouter([
    {path: "/", element: <Layout></Layout>, children: [
        {path: "/signup", element: <Signup/>},
         {path: "/", element: <Login/>},
        {
            path: "/home", element: <HomeLayout/>, children: [
                {path: "/home/addtask", element: <AddTask/>},
                {path: "/home/alltask", element: <AllTask/>},
                {path: "/home/addteam", element: <Addteam/>},
                {path: "/home/dashbord/", element: <DashbordLayout/>, children: [
                    {path: "/home/dashbord/complited", element: <Complited/>},
                    {path: "/home/dashbord/pending", element: <Pending/>},
                ]}
            ]
        }

    ]}
])