import React, { useEffect, useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import MyChats from '../components/MyChats'
import SingleChat from '../components/SingleChat'
import { fetchMyChats } from '../utils/APIcalls'
import { useDispatch } from 'react-redux'
import { fillMyChats } from '../slices/chat-slice.js'
import toast from 'react-hot-toast'
import { useSocket } from '../context/SocketProvider'
import { useChatAuth } from '../context/ChatAuthProvider'

const HomePage = () => {
    const dispatch = useDispatch()
    const { socket } = useSocket()
    const { loggedInUser } = useChatAuth()
    const fetchChats = useCallback(async () => {
        try {
            const { data } = await fetchMyChats()
            dispatch(fillMyChats(data.myChats))
            // console.log('>>', data.myChats)
        } catch (error) {
            console.log(error)
            toast.error('Error fetching chats!')
        }
    }, [dispatch])

    useEffect(() => {
        /*
        because getting the logged-in-user info takes time.
        so in the very first request, it is not able to send the user info with the header.
        that is why this check is necessary
        */
        if (loggedInUser) {
            fetchChats()
        }
    }, [fetchChats, loggedInUser])

    const handleJoinRoomSuccess = useCallback((payload) => {
        console.log(payload)
    }, [])

    useEffect(() => {
        if (loggedInUser) {
            socket.emit('JOIN_ROOM_REQ', loggedInUser)
        }
        socket.on('JOIN_ROOM_RES', handleJoinRoomSuccess)

        return () => {
            socket.off('JOIN_ROOM_RES', handleJoinRoomSuccess)
        }
    }, [handleJoinRoomSuccess, loggedInUser, socket])

    return (
        <Box
            // border={'2px solid black'}
            w={'100%'}
            h={'100vh'}
        >
            <Box 
                h={'10%'} 
                // border={'2px solid red'}
                borderBottom={'1px solid #dedede'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Navbar />
            </Box>
            <Box
                // border={'2px solid red'}
                w={'100%'}
                display={'flex'}
                h={'90%'}
            >
                <MyChats />
                <SingleChat />
            </Box>
        </Box>
    )
}

export default HomePage
