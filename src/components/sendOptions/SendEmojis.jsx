import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import toast from 'react-hot-toast';
import { useSocket } from '../../context/SocketProvider'
import { sendMessageAPI } from '../../utils/APIcalls'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeMessagesUpdateFlagStatus,
    changeChatsUpdateFlagStatus
} from '../../slices/chat-slice.js'

const SendEmojis = ({ onOpen, isOpen, onClose }) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [loading, setLoading] = useState(false)
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)
    const { socket } = useSocket()
    const dispatch = useDispatch()
    const handleSend = async () => {
        try {
            setLoading(true)
            // console.log('#####', chosenEmoji)
            const { data } = await sendMessageAPI({
                content: chosenEmoji?.unified,
                type: "emoji",
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
            toast.error('Error sending emoji!')
        } finally {
            setChosenEmoji(null)
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
                    <ModalHeader textAlign={'center'}>Send Emoji</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EmojiPicker 
                            width={'100%'} 
                            onEmojiClick={(emojiObject) => setChosenEmoji(emojiObject)} 
                        />
                        
                    </ModalBody>

                    <ModalFooter>
                        {
                            chosenEmoji ?
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
    );
}

export default SendEmojis
