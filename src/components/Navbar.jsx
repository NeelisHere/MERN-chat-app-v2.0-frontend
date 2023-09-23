import { Box, Image, Text, Avatar, Button, IconButton  } from '@chakra-ui/react'
import { Menu, MenuButton, MenuDivider, MenuList, MenuItem } from '@chakra-ui/react'
import { useChatAuth } from '../context/ChatAuthProvider'
import SideDrawer from './SideDrawer'
import ProfileModal from './ProfileModal'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { loggedInUser } = useChatAuth()
    const navigate = useNavigate()

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
            <Box>
                <IconButton 
                    mx={'10px'} 
                    color={'#333'} 
                    variant={'ghost'} 
                    icon={<NotificationsIcon />} 
                />
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
                        <MenuItem
                            onClick={() => {
                                localStorage.removeItem('userInfo')
                                navigate('/home')
                            }}
                        >
                            Logout
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                            onClick={() => {
                                navigate('/edit-profile')
                            }}
                        >
                            Edit Profile
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Box>
    )
}

export default Navbar
