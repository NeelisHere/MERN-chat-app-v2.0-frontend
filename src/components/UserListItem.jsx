import { Box, Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import toast from 'react-hot-toast'
import { accessChat } from '../utils/APIcalls'
import { changeChatsUpdateFlagStatus } from '../slices/chat-slice'
import { useDispatch, useSelector } from 'react-redux'

const UserListItem = ({ user, onClose }) => {
    const dispatch = useDispatch()
    const { chatsUpdateFlag } = useSelector((state) => state.chat)

    const handleClick = async (userId) => {
        if (!userId) return;
        try {
            // const { data } = await accessChat(userId)
            // console.log('Chat selected: ', data.chat)
            await accessChat(userId)
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
            onClose()
        } catch (error) {
            console.log(error)
            toast.error('Error accessing chat!')
        }
    }
    
    return (
        <Box
            onClick={() => { 
                handleClick(user?._id) 
            }}
            cursor={'pointer'}
            bg={'white'}
            shadow={'base'}
            _hover={{
                shadow: 'md'
            }}
            w={'100%'}
            display={'flex'}
            alignItems={'center'}
            color={'black'}
            px={3}
            py={3}
            mb={3}
            borderRadius={'lg'}
        >
            <Avatar
                mr={2}
                size={'md'}
                cursor={'pointer'}
                name={user?.username}
                src={user?.avatar}
            />
            <Box>
                <Text>{user?.username}</Text>
                <Text fontSize={'xs'}>{user?.email}</Text>
            </Box>
            
        </Box>
    )
}

export default UserListItem
