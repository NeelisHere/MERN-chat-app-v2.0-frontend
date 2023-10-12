import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Input
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { v4 } from 'uuid'
import CancelIcon from '@mui/icons-material/Cancel';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { useSocket } from '../../context/SocketProvider'
import { sendMessageAPI } from '../../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeMessagesUpdateFlagStatus,
    changeChatsUpdateFlagStatus
} from '../../slices/chat-slice.js'

const SendFileModal = ({ onOpen, isOpen, onClose }) => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const fileRef = useRef(null)
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)
    const { socket } = useSocket()
    const dispatch = useDispatch()

    const uploadFiles = async () => {
        const uploadPromises = files.map(async ({ id, file }) => {
            const fileStorageRef = ref(storage, `files/file-${id}`)
            await uploadBytes(fileStorageRef, file)
            return await getDownloadURL(fileStorageRef);
        })
        return await Promise.all(uploadPromises);
    }

    const handleSend = async () => {
        try {
            setLoading(true)
            // console.log(files)
            const downloadURLs = await uploadFiles()
            const { data } = await sendMessageAPI({
                content: JSON.stringify(downloadURLs),
                type: "file",
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
            setFiles([])
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
                    <ModalHeader textAlign={'center'}>Send File</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        py={'20px'}
                        display={'flex'}
                        flexDir={'column'}
                        justifyContent={'center'}
                    >
                        <Box
                            // border={'2px'}
                            maxH={'300px'}
                            overflowY={'scroll'}
                        >
                            {
                                files.length ?
                                    files.map(({ id, file }) => (
                                        // file.name
                                        <Box
                                            key={id}
                                            bg={'#f4f4f4'}
                                            display={'flex'}
                                            justifyContent={'space-between'}
                                            alignItems={'center'}
                                            p={'5px 10px'}
                                            m={'5px 10px'}
                                            borderRadius={'lg'}
                                        >
                                            {file.name}
                                            <Box
                                                // border={'2px'}
                                                cursor={'pointer'}
                                                display={'flex'}
                                                alignItems={'center'}
                                                size={'sm'}
                                                onClick={() => {
                                                    setFiles(
                                                        files.filter(({ id: _id }) => _id !== id)
                                                    )
                                                }}
                                            >
                                                <CancelIcon />
                                            </Box>
                                        </Box>
                                    ))
                                    :
                                    null
                            }
                        </Box>

                        <Box
                            // border={'2px solid red'} 
                            display={'flex'}
                            justifyContent={'center'}
                            w={'100%'}
                            h={'100%'}
                            py={'20px'}
                            mb={'10px'}
                        >
                            <Input
                                type='file'
                                ref={fileRef}
                                onChange={(e) => setFiles([
                                    ...files,
                                    {
                                        id: v4(),
                                        file: e.target.files[0]
                                    }
                                ])}
                                display={'none'}
                            />

                            <Button
                                colorScheme='teal'
                                onClick={() => {
                                    fileRef.current.click()
                                }}
                            >
                                Browse
                            </Button>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        {
                            files.length ?
                                <Button
                                    w={'100%'}
                                    onClick={handleSend}
                                    colorScheme='teal'
                                    isLoading={loading}
                                >
                                    Send
                                </Button>
                                :
                                null
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SendFileModal
