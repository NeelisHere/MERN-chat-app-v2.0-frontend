import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, useDisclosure, Input, Avatar, Stack, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useChatAuth } from '../context/ChatAuthProvider'
import toast from 'react-hot-toast'
import { getImageURL } from '../utils/index.js'
import { updateMyProfileAPI } from '../utils/APIcalls.js'
import { changeMessagesUpdateFlagStatus, changeChatsUpdateFlagStatus } from '../slices/chat-slice.js'
import { useDispatch, useSelector } from 'react-redux'


const UpdateGroupPhoto = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { loggedInUser } = useChatAuth()
    const dispatch = useDispatch()
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [file, setFile] = useState(null)

    useEffect(() => {
        setAvatar(selectedChat?.photo)
    }, [selectedChat?.photo])

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

    const handleUpdateGroupPhoto = async () => {
        // console.log(username, email, file)
        if (file.length === 0) return;
        const allowedImageTypes = ['jpeg', 'jpg', 'png']
        if (!allowedImageTypes.includes(file.name.split('.')[1])) return;
        try {
            setLoading(true)
            const { secure_url } = await getImageURL(file)
            const payload = { chatId: selectedChat._id, photo: secure_url }
            await updateMyProfileAPI(loggedInUser?._id, payload)
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
            dispatch(changeMessagesUpdateFlagStatus())
            toast.success('Group Photo updated successfully!')
            onClose()
        } catch (error) {
            console.log(error)
            toast.error('Error updating Group Photo!')
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
                    <ModalHeader textAlign={'center'}>Update Group Photo</ModalHeader>
                    <ModalCloseButton />
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
                            // name={username}
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
                    <ModalFooter>
                        <Button
                            colorScheme='teal'
                            w={'100%'}
                            onClick={handleUpdateGroupPhoto}
                            isLoading={loading}
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupPhoto

