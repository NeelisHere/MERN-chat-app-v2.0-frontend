import { Box, Stack, Spinner } from "@chakra-ui/react"
import SelectedChatNav from "./SelectedChatNav"
import SelectedChatInput from "./SelectedChatInput"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMessagesAPI } from '../../utils/APIcalls'
import { fillMessages } from "../../slices/chat-slice.js"
import toast from "react-hot-toast"
import Message from "./Message"
import { useSocket } from "../../context/SocketProvider"
import { useChatAuth } from "../../context/ChatAuthProvider"
import { getSender } from "../../utils"

const SelectedChat = () => {
    const dispatch = useDispatch()
    const { socket } = useSocket()
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const { loggedInUser } = useChatAuth()
    // const { selectedChat, messages } = useSelector((state) => state.chat)
    const { selectedChat, messages: storeMessages, messagesUpdateFlag } = useSelector((state) => state.chat)
    const messageEl = useRef(null);

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await fetchMessagesAPI(selectedChat?._id)
            // console.log(data)
            dispatch(fillMessages([...data.messages]))
        } catch (error) {
            console.log(error)
            toast.error('Error while fetching messages!')
        } finally {
            setLoading(false)
        }
    }, [dispatch, selectedChat?._id])
    
    useEffect(() => {
        fetchMessages()
    }, [messagesUpdateFlag, fetchMessages])
    
    useEffect(() => {
        setMessages(storeMessages)
    }, [storeMessages])

    const handleMessageReceived = ({ message, chat }) => {
        // console.log('message received...')
        if (selectedChat && chat._id === selectedChat?._id) {
            // fetchMessages()
            setMessages([...messages, message])
        } else {
            socket.emit('NOTIFY_REQ', { // sender and reciever of the original message
                sender: getSender(chat.users, loggedInUser),
                receiver:loggedInUser,
                chat 
            })
        }
    }

    useEffect(() => {
        socket.on('NEW_MESSAGE_RES', handleMessageReceived)
        socket.on('JOIN_CHAT_RES', handleJoinChatResponse)
        return () => {
            socket.off('NEW_MESSAGE_RES', handleMessageReceived)
            socket.off('JOIN_CHAT_RES', handleJoinChatResponse)
        }
    })



    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', (event) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    const handleJoinChatResponse = (res) => {
        // console.log(res)
    }

    return (
        <Stack spacing={0} h={'100%'}>

            <SelectedChatNav />
            
            <Box
                // border={'2px solid black'}
                borderBottom={'2px solid #d3d3d3'}
                borderTop={'2px solid #d3d3d3'}
                // backgroundImage={'bg-image.jpg'}
                h={'80%'}
            >
                <Box 
                    // border={'2px solid black'}
                    h={'100%'} 
                    w={'100%'} 
                    display={'flex'}
                    py={'20px'}
                    flexDirection={'column'}
                    overflowY={'scroll'}
                    ref={messageEl}
                >
                    {
                        loading ? 
                        <Spinner size={'lg'}/>
                        :
                        <>  
                            {
                                messages?.map((message, index) => {
                                    if (message.deleteFor.includes(loggedInUser._id)) {
                                        return null
                                    } else {
                                        return(
                                            <Message key={index} message={message} />
                                        )
                                    }
                                })
                            }
                        </>
                    }
                </Box>
            </Box>

            <SelectedChatInput />

        </Stack>
    )
}

export default SelectedChat