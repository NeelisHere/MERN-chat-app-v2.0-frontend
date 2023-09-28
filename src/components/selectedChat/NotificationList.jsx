import { Menu, MenuList, MenuItem, MenuDivider, MenuButton, Button, Box, Badge } from '@chakra-ui/react'
// import { useSocket } from '../../context/SocketProvider'
import { useDispatch } from 'react-redux'
import { updateSelectedChat } from '../../slices/chat-slice.js'
// import { useState } from 'react'
// import toast from 'react-hot-toast'
// import { useEffect, useMemo } from 'react'
// import { useCallback, useEffect, useState } from 'react'
// import { getUserProfileAPI } from '../../utils/APIcalls'

const NotificationList = ({ children, notifications, setNotifications, setNotificationCount }) => {
    // const [currentSender, setCurrentSender] = useState(null)
    // const [currentChat, setCurrentChat] = useState(null)
    const dispatch = useDispatch()
    // const { socket } = useSocket()

    const handleNotificationSeen = (targetChat, count) => {
        // toast(targetChat._id)
        dispatch(updateSelectedChat(targetChat))
        // delete count[targetChat._id]
        setNotifications((current) => {
            const newState = { ...current }
            setNotificationCount((prevCount) => prevCount - count)
            delete newState[targetChat._id]
            return newState
        })
        // socket.emit('NOTIFICATION_SEEN_REQ', {})
    }

    return (
        <>
            <Menu>
                <MenuButton as={Button}>{ children }</MenuButton>
                <MenuList>

                    {
                        Object.keys(notifications).map((key, index) => {
                            return(
                                <Box key={index}>
                                    <MenuItem 
                                        display={'flex'}
                                        onClick={() => handleNotificationSeen(
                                            notifications[key]?.chat, notifications[key].count
                                        )}
                                    >
                                        <Badge colorScheme='teal' mr={'10px'}>
                                            {notifications[key].count}
                                        </Badge>
                                        {
                                            notifications[key]?.chat.chatName === 'sender'? 
                                            notifications[key]?.sender?.username : 
                                            notifications[key]?.chat.chatName
                                        }
                                    </MenuItem>
                                </Box>
                            )
                        })
                    }
                </MenuList>
            </Menu>
        </>
    )
}

export default NotificationList
