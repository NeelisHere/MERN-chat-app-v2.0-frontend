import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => {
        const socketURL = process.env.REACT_APP_API_BASE_URL
        return io(socketURL)
    }, [])
    
    return(
        <SocketContext.Provider value={{ socket }}>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvider
