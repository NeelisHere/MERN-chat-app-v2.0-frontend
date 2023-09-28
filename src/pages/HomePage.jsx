import React, { useEffect, useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import MyChats from '../components/MyChats'
import SingleChat from '../components/SingleChat'
import { fetchMyChats } from '../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import { fillMyChats } from '../slices/chat-slice.js'
import toast from 'react-hot-toast'
import { useSocket } from '../context/SocketProvider'
import { useChatAuth } from '../context/ChatAuthProvider'
import { getSender } from '../utils'

const HomePage = () => {
    const dispatch = useDispatch()
    const { socket } = useSocket()
    const { loggedInUser } = useChatAuth()
    const { selectedChat } = useSelector((state) => state.chat)

    const handleJoinRoomSuccess = useCallback((payload) => {
        console.log(payload)
    }, [])

    useEffect(() => {
        if (loggedInUser) {
            socket.emit('JOIN_ROOM_REQ', loggedInUser)
        }
    }, [handleJoinRoomSuccess, loggedInUser, socket])

    const handleMessageReceived = ({ message, chat }) => {
        console.log('message received...')
        if (!selectedChat) {
            socket.emit('NOTIFY_REQ', { // sender and reciever of the original message
                sender: getSender(chat.users, loggedInUser),
                receiver: loggedInUser,
                chat
            })
        }
    }

    useEffect(() => {
        socket.on('NEW_MESSAGE_RES', handleMessageReceived)
        return () => {
            socket.off('NEW_MESSAGE_RES', handleMessageReceived)
        }
    })

    useEffect(() => {
        socket.on('JOIN_ROOM_RES', handleJoinRoomSuccess)

        return () => {
            socket.off('JOIN_ROOM_RES', handleJoinRoomSuccess)
        }
    })

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
