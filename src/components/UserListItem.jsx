import { Box, Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import toast from 'react-hot-toast'
import { accessChat } from '../utils/APIcalls'
import { updateIsNewChatCreatedStatus } from '../slices/chat-slice'
import { useDispatch } from 'react-redux'

const UserListItem = ({ user, onClose }) => {
    const dispatch = useDispatch()
    const handleClick = async (userId) => {
        dispatch(updateIsNewChatCreatedStatus(false))
        try {
            const { data } = await accessChat(userId)
            // console.log(data.chat)
            dispatch(updateIsNewChatCreatedStatus(true))
            onClose()
        } catch (error) {
            
        }
    }
    
    return (
        <Box
            onClick={() => { 
                handleClick(user._id) 
            }}
            cursor={'pointer'}
            // bg={isInGroupChatModal?'#f4f4f4':'white'}
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
            {/* {user.username} */}
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
