import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent } from '@chakra-ui/react';
import { Input, Button, useDisclosure, Tooltip, Text } from '@chakra-ui/react';  
import { useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import UserListItem from './UserListItem';
import ChatLoading from './ChatLoading'
import toast from 'react-hot-toast';
import { searchUser } from '../utils/APIcalls';

const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const buttonRef = useRef()
    const searchTextRef = useRef()
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearchInput = async (e) => {
        if (e.key === 'Enter') {
            const text = searchTextRef.current.value.trim()
            if (!text) return;
            try {
                setLoading(true)
                const { data } = await searchUser(text)
                if (data.users.length === 0) {
                    toast.error('No users found!')
                }
                setSearchResult(data.users)
                searchTextRef.current.value = ''
                // console.log(data)
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <>
            <Tooltip label={'Search Users'}>
                <Button ref={buttonRef} onClick={onOpen} leftIcon={<SearchIcon />}>
                    <Text display={{ base: 'none', md: 'flex' }}>Search User</Text>
                </Button>
            </Tooltip>

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={buttonRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader textAlign={'center'} bg={'#f4f4f4'}>
                        Search Users
                    </DrawerHeader>

                    <DrawerBody bg={'#f4f4f4'}>
                        <Input 
                            mb={'20px'} 
                            bg={'white'} 
                            placeholder='Search users' 
                            ref={searchTextRef}
                            onKeyDown={handleSearchInput}
                        />
                        {
                            loading? 
                            <ChatLoading />
                            :
                            searchResult.map((user, index) => {
                                return(
                                    <UserListItem 
                                        key={index}
                                        user={user}
                                        onClose={onClose}
                                    />
                                )
                            })
                            
                        }
                    </DrawerBody>
                </DrawerContent>

            </Drawer>
        </>
    )
}

export default SideDrawer
