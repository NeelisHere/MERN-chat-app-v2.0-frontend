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
import { AudioRecorder } from 'react-audio-voice-recorder';
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

const CaptureAudioModal = ({ onOpen, isOpen, onClose }) => {
    const [audioBlob, setAudioBlob] = useState(null)
    const [loading, setLoading] = useState(false)
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)
    const { socket } = useSocket()
    const dispatch = useDispatch()

    const handleSend = async () => {
        const audioId = v4()
        const fileStorageRef = ref(storage, `audio/audio-${audioId}`)
        try {
            setLoading(true)
            await uploadBytes(fileStorageRef, audioBlob)
            const url = await getDownloadURL(fileStorageRef)
            // console.log('*******', url)
            const { data } = await sendMessageAPI({
                content: url,
                type: "audio",
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
            toast.error('Error sending audio!')
        } finally {
            onClose()
            setLoading(false)
        }
    }

    return (
        <>
            {/* <Box onClick={onOpen}>{ children }</Box> */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Record Audio</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={'20px'} display={'flex'} justifyContent={'center'}>
                        <AudioRecorder
                            // onRecordingComplete={addAudioElement}
                            onRecordingComplete={(blob) => {
                                setAudioBlob(blob)
                            }}
                            audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                            }}
                            onNotAllowedOrFound={(err) => console.table(err)}
                            downloadOnSavePress={false}
                            downloadFileExtension="webm"
                            mediaRecorderOptions={{
                                audioBitsPerSecond: 128000,
                            }}
                        />
                    </ModalBody>

                    <ModalFooter>
                        {
                            audioBlob &&
                            <Button
                                w={'100%'}
                                onClick={handleSend}
                                colorScheme='teal'
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

export default CaptureAudioModal
