import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, useDisclosure, Input, Avatar, Stack, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useChatAuth } from '../context/ChatAuthProvider'
import toast from 'react-hot-toast'
import { getImageURL } from '../utils/index.js'
import { updateMyProfileAPI } from '../utils/APIcalls.js'
import { changeMessagesUpdateFlagStatus, changeChatsUpdateFlagStatus } from '../slices/chat-slice.js'
import { useDispatch, useSelector } from 'react-redux'

const UpdateMyProfileModal = ({ children }) => {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { loggedInUser, setLoggedInUser } = useChatAuth()
    const { chatsUpdateFlag } = useSelector((state) => state.chat)

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [file, setFile] = useState(null)

    const handleUpdateProfile = async (e) => {
        // console.log(username, email, file)
        if (file.length === 0) return;
        const allowedImageTypes = ['jpeg', 'jpg', 'png']
        if (!allowedImageTypes.includes(file.name.split('.')[1])) return;
        try {
            setLoading(true)
            const { secure_url } = await getImageURL(file)
            const payload = { username, email, avatar: secure_url }
            const { data } = await updateMyProfileAPI(loggedInUser?._id, payload)
            setLoggedInUser((p) => {
                const prevUserInfo = JSON.parse(localStorage.getItem('userInfo'))
                localStorage.removeItem('userInfo')
                const updatedUserInfo = {
                    ...data.updatedProfile, 
                    token: prevUserInfo.token
                }
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))
                return data.updatedProfile
            })
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
            dispatch(changeMessagesUpdateFlagStatus())
            toast.success('Profile updated successfully!')
            onClose()
        } catch (error) {
            console.log(error)
            toast.error('Error updating profile!')
        } finally {
            setLoading(false)
        }
    }

    const previewAvatar = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            // console.log('->', e.target.files[0])
            setFile(e.target.files[0])
            setAvatar(reader.result)
        }
    }

    useEffect(() => {
        setUsername(loggedInUser?.username)
        setEmail(loggedInUser?.email)
        setAvatar(loggedInUser?.avatar)
    }, [loggedInUser?.avatar, loggedInUser?.email, loggedInUser?.username])

    return (
        <Box>
            <Box onClick={onOpen}>{children}</Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Update Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <InputGroup>
                                <InputLeftAddon children='Username' />
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon children='Email' />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputGroup>
                            <Box
                                // border={'2px solid red'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                flexDir={'column'}
                                py={'10px'}
                            >
                                <Avatar
                                    size={'2xl'}
                                    name={username}
                                    src={avatar}
                                    border={'6px solid #dedede'}
                                    my={'20px'}
                                />

                                <Box
                                    // border={'2px solid red'}
                                    display={'flex'}
                                    gap={2}
                                >
                                    <Button colorScheme='gray'>
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            id="pfp"
                                            onChange={previewAvatar}
                                        />
                                        <label htmlFor="pfp">Choose Photo</label>
                                    </Button>
                                    <Button
                                        colorScheme='gray'
                                        onClick={() => setAvatar('')}
                                    >
                                        Remove Photo
                                    </Button>
                                </Box>

                            </Box>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            isLoading={loading}
                            colorScheme='teal'
                            w={'100%'}
                            onClick={handleUpdateProfile}
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default UpdateMyProfileModal
