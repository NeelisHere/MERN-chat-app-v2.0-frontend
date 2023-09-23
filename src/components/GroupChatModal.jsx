import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Badge } from '@chakra-ui/react'
import { Button, FormControl, Input, Box, Spinner, Avatar, Text } from '@chakra-ui/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { createGroupChat, searchUser } from '../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatsUpdateFlagStatus } from '../slices/chat-slice.js'


function GroupChatModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const { chatsUpdateFlag } = useSelector((state) => state.chat)
    const dispatch = useDispatch()

    const handleSearch = async (e) => {
        const text = e.target.value.trim()
        if (!text) return;
        try {
            setLoading(true)
            const { data } = await searchUser(text)
            if (data.users.length === 0) {
                toast.error('No users found!')
            }
            // include only those users in the result who are not already among the selected users
            const filteredArray = data.users.filter(
                (obj1) => !selectedUsers.some((obj2) => obj1._id === obj2._id)
            );
            setSearchResult(filteredArray)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (user) => {
        // setSearchResult([...searchResult, user])
        setSelectedUsers(selectedUsers.filter(
            (selectedUser) => selectedUser._id !== user._id)
        )
    }

    const handleSelect = async (user) => {
        setSelectedUsers([...selectedUsers, user])
        setSearchResult(searchResult.filter(
            (searchedUSer) => searchedUSer._id !== user._id)
        )
    }

    const handleCreate = async () => {
        if (!title || selectedUsers.length === 0) {
            toast.error('Enter all details!')
            return;
        }
        try {
            setButtonLoading(true)
            const userData = {
                chatName: title,
                users: JSON.stringify(selectedUsers.map((user) => user._id))
            }
            const { data } = await createGroupChat(userData)
            // console.log(data)
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
            onClose()
            setSelectedUsers([])
            setSearchResult([])
            setTitle('')
            
        } catch (error) {
            console.log(error)
            toast.error('Error creating group-chat!')
        } finally {
            setButtonLoading(false)
        }
    }

    return (
        <>
            <Box onClick={onOpen}>{children}</Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDir={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        bg={'#f4f4f4'}
                    >
                        <FormControl>
                            <Input
                                placeholder='Chat Name'
                                mb={3}
                                w={'100%'}
                                bg={'white'}
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add users'
                                mb={3}
                                w={'100%'}
                                bg={'white'}
                                onChange={handleSearch}
                            />
                        </FormControl>

                        <Box w={'100%'} display={'flex'} gap={2} flexWrap={'wrap'}>
                            {
                                selectedUsers.map((user, index) => {
                                    return (
                                        <Badge
                                            key={index}
                                            colorScheme={'teal'}
                                            cursor={'pointer'}
                                            onClick={() => {
                                                handleDelete(user)
                                            }}
                                        >
                                            {user.username}
                                        </Badge>
                                    )
                                })
                            }
                        </Box>
                        <br />
                        {
                            loading ?
                                <Spinner /> :
                                searchResult?.map((user, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            onClick={() => {
                                                handleSelect(user)
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
                                })
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='teal'
                            w={'100%'}
                            onClick={handleCreate}
                            isLoading={buttonLoading}
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal
