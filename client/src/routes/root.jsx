import Navbar from "../components/organisms/navbar"
import { Outlet } from "react-router-dom"

import DropSearchScreen from "../pages/DropSearchScreen"

function Root() {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet />
        </div>
    )
}

export default Root
