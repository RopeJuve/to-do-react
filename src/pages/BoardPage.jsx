import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar"
import SideBar from "../components/SideBar/SideBar"
import ToDoBoard from "../components/ToDoBoard/ToDoBoard"


const BoardPage = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [title, setTitle] = useState('');


    useEffect(() => {

        const getBoards = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/boards/`);
                const data = await response.json();
                setBoard(data[0]);

                setTitle(data[0].title);
            } catch (error) {
                console.error(error);
                setStatus('error');
            }
        }
        getBoards();
    }, []);


    useEffect(() => {

        const getBoards = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/boards/${id}`);
                const data = await response.json();
                setBoard(data);
                setTitle(data.title);
            } catch (error) {
                console.error(error);
                setStatus('error');
            }
        }
        getBoards();
    }, [id, title]);
    return (
        <>
            {!!board && <>
                <NavBar title={title} data={board} />
                <SideBar selected={board} />
                <ToDoBoard board={board} /></>}
        </>
    )
}

export default BoardPage