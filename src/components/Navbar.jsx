import { Box, Image, Text, Avatar, Button } from '@chakra-ui/react'
import { Menu, MenuButton, MenuDivider, MenuList, MenuItem } from '@chakra-ui/react'
import { useChatAuth } from '../context/ChatAuthProvider'
import SideDrawer from './SideDrawer'
import ProfileModal from './ProfileModal'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import UpdateMyProfileModal from './UpdateMyProfileModal.jsx'
import { useState, useEffect } from 'react'
import { useSocket } from '../context/SocketProvider'
// import NotificationBadge from 'react-notification-badge';
import NotificationList from './selectedChat/NotificationList'

const Navbar = () => {
    const { loggedInUser } = useChatAuth()
    const navigate = useNavigate()
    const { socket } = useSocket()

    const [notificationCount, setNotificationCount] = useState(0)
    const [notifications, setNotifications] = useState({})

    // useEffect(() => {
    //     const initialNotifications = JSON.parse(localStorage.getItem('notifications'))
    //     setNotifications(initialNotifications)
    //     return () => {
    //         localStorage.setItem('notifications', JSON.stringify(notifications))
    //     }
    // }, [notifications])

    const handleNotifyResponse = ({ sender, receiver, chat }) => {
        if (sender._id !== receiver._id) {
            setNotificationCount((prev) => {
                const prevCount = notifications[chat._id]? notifications[chat._id].count : 0
                setNotifications({ 
                    ...notifications, 
                    [chat._id]: { sender, chat, count: prevCount + 1 }
                })
                return prev + 1
            })
        }
    }

    useEffect(() => {
        socket.on('NOTIFY_RES', handleNotifyResponse)
        return () => {
            socket.off('NOTIFY_RES', handleNotifyResponse)
        }
    })

    return (
        <Box
            // border={'2px solid blue'}
            py={'10px'}
            px={'50px'}
            w={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Box>
                <SideDrawer />
            </Box>
            <Box
                // border={'2px solid blue'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Image src="logo192.png" borderRadius='full' objectFit={'cover'} boxSize={'40px'} />
                <Text fontSize={'2xl'} fontWeight={'semibold'} mx={'10px'}>Logo</Text>
            </Box>
            <Box display={'flex'}>
                <Box 
                    // border={'2px solid red'}
                    mx={'10px'}
                >
                    <NotificationList 
                        notifications={notifications} 
                        setNotifications={setNotifications}
                        setNotificationCount={setNotificationCount}
                        // count={count}
                    >
                        <NotificationsIcon 
                            sx={{ fontSize: 36 }}
                        />
                    </NotificationList>
                    {/* <NotificationBadge 
                        count={notificationCount} 
                        style={{ 
                            top: '-48px', 
                            right: '-10px' 
                        }} 
                    /> */}
                </Box>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ExpandMoreIcon />}>
                        <Avatar
                            src={loggedInUser?.avatar}
                            size={'sm'}
                            cursor={'pointer'}
                            name={loggedInUser?.username}
                        />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={loggedInUser}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider />
                        <UpdateMyProfileModal>
                            <MenuItem> Edit Profile </MenuItem>
                        </UpdateMyProfileModal>
                        <MenuDivider />
                        <MenuItem
                            onClick={() => {
                                localStorage.removeItem('userInfo')
                                navigate('/')
                            }}
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Box>
    )
}

export default Navbar
