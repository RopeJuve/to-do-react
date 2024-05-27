import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar"
import SideBar from "../components/SideBar/SideBar"
import ToDoBoard from "../components/ToDoBoard/ToDoBoard"
import { useBoard } from "../context/BoardContext"


const BoardPage = () => {
    const { id } = useParams();
    const { board , fetchBoard} = useBoard();

    useEffect(() => {
        fetchBoard(id);
    }, [id]);
    return (
        <>
            {!!board && <>
                <NavBar title={board.title} data={board} />
                <SideBar selected={board} />
                <ToDoBoard board={board} /></>}
        </>
    )
}

export default BoardPage