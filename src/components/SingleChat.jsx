import { Box, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import SelectedChat from './selectedChat/SelectedChat'
import { useEffect } from 'react'
import { useSocket } from '../context/SocketProvider'
// import { useChatAuth } from '../context/ChatAuthProvider'

const NoSelectedChat = () => {
    return(
        <Box 
            w={'100%'} 
            h={'100%'} 
            display={'flex'} 
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Text fontSize={'5xl'} fontWeight={'bold'} color={'#dedede'}>
                No Chat Selected
            </Text>
        </Box>
    )
}

const SingleChat = () => {
    const { socket } = useSocket()
    // const { loggedInUser } = useChatAuth()

    const handleMessageReceived = ({ chatId, senderId, message }) => {
        console.log('message received...')
        // if (selectedChat) {
        //     socket.emit('NOTIFY_REQ', { // sender and reciever of the original message
        //         senderId,
        //         receiverId:loggedInUser?._id 
        //     })
        // }
    }

    useEffect(() => {
        socket.on('NEW_MESSAGE_RES', handleMessageReceived)
        return () => {
            socket.off('NEW_MESSAGE_RES', handleMessageReceived)
        }
    })

    const { selectedChat } = useSelector((state) => state.chat)
    return (
        <Box
            border={'1px solid #dedede'}
            width={'75%'}
        >
            { selectedChat? <SelectedChat/> : <NoSelectedChat /> }
        </Box>
    )
}

export default SingleChat
