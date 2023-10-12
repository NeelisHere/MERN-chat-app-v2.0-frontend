import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box
} from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { useRef } from 'react'
import Webcam from 'react-webcam'
import { v4 } from 'uuid'
import { storage } from '../../utils/firebase'
import { useSocket } from '../../context/SocketProvider'
import { sendMessageAPI } from '../../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import { 
    changeMessagesUpdateFlagStatus, 
    changeChatsUpdateFlagStatus 
} from '../../slices/chat-slice.js'
import toast from 'react-hot-toast'

const CapturePhotoModal = ({ onOpen, isOpen, onClose }) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const webcamRef = useRef(null)
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)
    const { socket } = useSocket()
    const [loading, setLoading] = useState(false)

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
    }
    const handleSend = async () => {
        if (image) {
            setLoading(true)
            const imageId = v4()
            const fileStorageRef = ref(storage, `image/image-${imageId}`)
            try {
                const blob = await fetch(image).then((res) => res.blob());
                await uploadBytes(fileStorageRef, blob)
                const url = await getDownloadURL(fileStorageRef)
                const { data } = await sendMessageAPI({
                    content: url,
                    type: "image",
                    chatId: selectedChat?._id
                })
                dispatch(changeMessagesUpdateFlagStatus())
                dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
                socket.emit('NEW_MESSAGE_REQ', {
                    message: data.message,
                    chat: selectedChat
                })
            } catch (error) {
                console.log(error)
                toast.error('Error sending image!')
            } finally {
                onClose()
                setLoading(false)
            }
        }
    }

    return (
        <>
            {/* <Box onClick={onOpen}>{ children }</Box> */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={'20px'}>
                        {
                            image?
                            <img src={image} alt='x' />:
                            <Webcam ref={webcamRef} />
                        }
                    </ModalBody>

                    <ModalFooter>
                        {
                            !image?
                            <Button colorScheme='teal' w={'100%'} onClick={capture}>
                                Capture
                            </Button>
                            :
                            <Box display={'flex'} gap={'5px'}>
                                <Button colorScheme='teal' w={'100%'} onClick={() => setImage(null)}>
                                    Remove
                                </Button>
                                <Button isLoading={loading} colorScheme='teal' w={'100%'} onClick={handleSend}>
                                    Send
                                </Button>
                            </Box>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CapturePhotoModal
