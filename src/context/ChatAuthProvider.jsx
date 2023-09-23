import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatAuthContext = createContext()
export const useChatAuth = () => useContext(ChatAuthContext)

const ChatAuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        setLoggedInUser(user)
        if (!user) {
            navigate('/auth')
        }
    }, [navigate])

    return (
        <ChatAuthContext.Provider value={{ loggedInUser }}>
            { children }
        </ChatAuthContext.Provider>
    )
}

export default ChatAuthProvider
