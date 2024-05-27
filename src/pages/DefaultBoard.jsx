import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const DefaultBoard = () => {
    const [defaultBoardId, setDefaultBoardId] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const getFirstId = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/boards');
                const data = await response.json();
                console.log(data)
                if(data.length === 0){
                    return 'new'
                }
                    return data[0]._id;
            } catch (error) {
            
                console.error(error);
            }
        }
        const fetchDefaultBoardId = async () => {
            const boardId = await getFirstId();
            setDefaultBoardId(boardId);
            navigate(`/boards/${boardId}`);
        };
        fetchDefaultBoardId();
        console.log(defaultBoardId)
    }, []);

    return null;
}

export default DefaultBoard