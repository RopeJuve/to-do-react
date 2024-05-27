import NavBar from "../components/NavBar/NavBar"
import SideBar from "../components/SideBar/SideBar"
import ToDoBoard from "../components/ToDoBoard/ToDoBoard"

const EmptyBoardPage = () => {
    return (
        <>
            <NavBar title={''} data={null} />
            <SideBar />
            <ToDoBoard />
        </>
    )
}

export default EmptyBoardPage