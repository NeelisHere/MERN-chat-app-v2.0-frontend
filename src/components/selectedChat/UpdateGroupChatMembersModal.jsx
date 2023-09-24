import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, ModalCloseButton, Box, Button, Text, Avatar, Spinner, FormControl, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import { addUserToGroup, removeUserFromGroup, searchUser, fetchMyChats } from '../../utils/APIcalls'
import { changeChatsUpdateFlagStatus, fillMyChats } from '../../slices/chat-slice.js'
import toast from 'react-hot-toast'


const UpdateGroupChatMembersModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)
    const { users } = selectedChat
    const [loading, setLoading] = useState(false)
    const [newSelectedUsers, setNewSelectedUsers] = useState([])
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        setNewSelectedUsers(users)
    }, [setNewSelectedUsers, users])

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
                (obj1) => !newSelectedUsers.some((obj2) => obj1._id === obj2._id)
            );
            setSearchResult(filteredArray)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveUser = async (user) => {
        try {
            setLoading(true)
            const payload = {
                chatId: selectedChat._id,
                userId: user._id
            }
            await removeUserFromGroup(payload)
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
        } catch (error) {
            console.log(error)
            toast.error('Error removing user!')
        } finally {
            setLoading(false)
        }
    }

    const handleAddNewUser = async (user) => {
        try {
            setLoading(true)
            const payload = {
                chatId: selectedChat._id,
                userId: user._id
            }
            await addUserToGroup(payload)
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
        } catch (error) {
            console.log(error)
            toast.error('Error adding user!')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            const { data } = await fetchMyChats()
            dispatch(fillMyChats(data.myChats))
            toast.success('Saved Successfully!')
            onClose()
        } catch (error) {
            console.log(error)
            toast.error('Error fetching chats!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Box onClick={onOpen}>{children}</Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Update Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDir={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <FormControl>
                            <Input
                                placeholder='Add users'
                                mb={3}
                                w={'100%'}
                                variant={'filled'}
                                onChange={handleSearch}
                            />
                        </FormControl>

                        <Box w={'100%'} display={'flex'} gap={2} flexWrap={'wrap'}>
                        {
                            newSelectedUsers.map((user, index) => {
                                return (
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            handleRemoveUser(user)
                                        }}
                                        rightIcon={<ClearIcon fontSize='xs'/>}
                                        colorScheme='teal'
                                        size={'xs'}
                                    >
                                        {user?.username}
                                    </Button>
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
                                            handleAddNewUser(user)
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
                            onClick={handleSave}
                            isLoading={loading}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatMembersModal

