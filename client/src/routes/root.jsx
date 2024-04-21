import { Outlet } from "react-router-dom"

import DropSearchScreen from "../pages/DropSearchScreen"

function Root() {
    return (
        <div>
            <DropSearchScreen />
            <Outlet />
        </div>
    )
}

export default Root
