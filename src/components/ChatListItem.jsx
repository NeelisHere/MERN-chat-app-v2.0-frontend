import { Box, Avatar, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { accessChat } from '../utils/APIcalls'
import { useChatAuth } from '../context/ChatAuthProvider'

const UserListItem = ({ chat }) => {
    const { loggedInUser } = useChatAuth()

    const handleClick = async (userId) => {
        // try {
        //     const { data } = await accessChat(userId)
        //     console.log(data.chat)
        // } catch (error) {

        // }
    }

    // console.log(user)
    return (
        <Box
            // border={'2px solid red'}
            onClick={() => {
                // handleClick(user._id) 
            }}
            cursor={'pointer'}
            _hover={{
                bg: '#dedede'
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
                            // name={user?.username}
                            src={chat.isGroupChat?.avatar}
                        />
                        <Box>
                            <Text>{chat?.chatName}</Text>
                            <Text fontSize={'xs'}> Lorem ipsum dolor sit amet. </Text>
                        </Box>
                    </>
                    :
                    <>
                        <Avatar
                            mr={3}
                            size={'md'}
                            cursor={'pointer'}
                            name={
                                // sender.current?.username
                                chat.users[0]._id === loggedInUser._id? 
                                chat.users[1].username : chat.users[0].username
                            }
                            src={
                                // chat.isGroupChat?.avatar
                                chat.users[0]._id === loggedInUser._id? 
                                chat.users[1].avatar : chat.users[0].avatar
                            }
                        />
                        <Box>
                            <Text>
                                {
                                    // {sender.current?.username}
                                    chat.users[0]._id === loggedInUser._id? 
                                    chat.users[1].username : chat.users[0].username
                                }
                            </Text>
                            <Text fontSize={'xs'}> Lorem ipsum dolor sit amet. </Text>
                        </Box>
                    </>
            }


        </Box>
    )
}

export default UserListItem
