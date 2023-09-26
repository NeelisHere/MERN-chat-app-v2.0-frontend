import { Box, Avatar, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useChatAuth } from '../context/ChatAuthProvider'
import { updateSelectedChat } from '../slices/chat-slice.js'
import { useDispatch, useSelector } from 'react-redux';
import { getSender } from '../utils';
import { useSocket } from '../context/SocketProvider';

const UserListItem = ({ chat }) => {
    const { loggedInUser } = useChatAuth()
    const { socket } = useSocket()
    const dispatch = useDispatch()
    const { selectedChat } = useSelector((state) => state.chat)
    const [sender, setSender] = useState(null)

    useEffect(() => {
        if (!chat?.isGroupChat) {
            setSender((prevSender) => {
                return getSender(chat.users, loggedInUser)
            })
        }
    }, [chat?.isGroupChat, chat.users, loggedInUser])

    const handleClick = async () => {
        dispatch(updateSelectedChat(chat)) //dispatch is synchronous
        socket.emit('JOIN_CHAT_REQ', { roomId: chat._id })
    }

    return (
        <Box
            // border={'2px solid red'}
            onClick={handleClick}
            bg={selectedChat?._id === chat?._id? '#d3d3d3' : ''}
            cursor={'pointer'}
            _hover={{
                bg: selectedChat?._id === chat?._id? '#d3d3d3' : '#dedede'
            }}
            w={'100%'}
            display={'flex'}
            alignItems={'center'}
            color={'black'}
            px={'20px'}
            py={3}
        >
            {
                chat.isGroupChat ?
                <>
                    <Avatar
                        mr={3}
                        size={'md'}
                        cursor={'pointer'}
                        name={chat?.chatName}
                        src={chat?.photo}
                        bg='teal.500'
                        color={'white'}
                    />
                    <Box>
                        <Text>{chat?.chatName}</Text>
                        <Text fontSize={'xs'}> Latest message would be displayed.</Text>
                    </Box>
                </>
                :
                <>
                    <Avatar
                        mr={3}
                        size={'md'}
                        cursor={'pointer'}
                        name={sender?.username}
                        src={sender?.avatar}
                    />
                    <Box>
                        <Text>{sender?.username}</Text>
                        <Text fontSize={'xs'}> Latest message would be displayed. </Text>
                    </Box>
                </>
            }
        </Box>
    )
}

export default UserListItem
