export const deleteBoard = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/boards/${id}`, {
            method: 'DELETE',
        });
        if (response.status === 200) {
            const messages = await response.json();
            return messages.messages;
        }
    } catch (error) {
        console.error(error);
    }
}