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
import { useCallback, useState } from 'react'
import { useRef } from 'react'
import Webcam from 'react-webcam'
import { storage } from '../../utils/firebase'
import { v4 } from 'uuid'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSocket } from '../../context/SocketProvider'
import { sendMessageAPI } from '../../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import { 
    changeMessagesUpdateFlagStatus, 
    changeChatsUpdateFlagStatus 
} from '../../slices/chat-slice.js'

const CaptureVideoModal = ({ onOpen, isOpen, onClose }) => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const { socket } = useSocket()
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true)
        mediaRecorderRef.current = new MediaRecorder(
            webcamRef.current.stream,
            { mimeType: 'video/webm' }
        )
        mediaRecorderRef.current.addEventListener('dataavailable', ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data))
            }
        })
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, setRecordedChunks])

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing])


    const handleSend = useCallback(async () => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            const videoId = v4()
            const storageRef = ref(storage, `video/video-${videoId}`)
            try {
                setLoading(true)
                await uploadBytes(storageRef, blob)
                const url = await getDownloadURL(storageRef)
                // setVideoURL(url)
                const payload = {
                    content: url,
                    type: "video",
                    chatId: selectedChat?._id
                }
                const { data } = await sendMessageAPI(payload)
                dispatch(changeMessagesUpdateFlagStatus())
                dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
                socket.emit('NEW_MESSAGE_REQ', {
                    message: data.message,
                    chat: selectedChat
                })
            } catch (error) {
                console.log(error)
                toast.error('Error sending video!')
            } finally {
                setLoading(false)
            }
            setRecordedChunks([]);
        }
    }, [chatsUpdateFlag, dispatch, recordedChunks, selectedChat, socket])

    return (
        <>
            {/* <Box onClick={onOpen}>{ children }</Box> */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={'20px'}>
                        <Webcam
                            height={400}
                            width={400}
                            audio={true}
                            mirrored={true}
                            ref={webcamRef}
                            videoConstraints={{
                                width: 420,
                                height: 420,
                                facingMode: "user",
                            }}
                        />
                    </ModalBody>

                    <ModalFooter display={'flex'} gap={'5px'}>
                        {
                            capturing ?
                                <Button
                                    onClick={handleStopCaptureClick}
                                    colorScheme='red'
                                    w={'100%'}
                                >
                                    Stop Capture
                                </Button>
                                :
                                <Button
                                    onClick={handleStartCaptureClick}
                                    colorScheme='teal'
                                    w={'100%'}
                                >
                                    Start Capture
                                </Button>
                        }
                        {
                            (recordedChunks.length > 0) &&
                            <Button
                                onClick={handleSend}
                                colorScheme='teal'
                                w={'100%'}
                                isLoading={loading}
                            >
                                Send
                            </Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CaptureVideoModal
