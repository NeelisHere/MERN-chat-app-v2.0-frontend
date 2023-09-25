import { Box, Stack, Spinner } from "@chakra-ui/react"
import SelectedChatNav from "./SelectedChatNav"
import SelectedChatInput from "./SelectedChatInput"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMessagesAPI } from '../../utils/APIcalls'
import { fillMessages } from "../../slices/chat-slice.js"
import toast from "react-hot-toast"
import Message from "./Message"

const SelectedChat = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { selectedChat, messages } = useSelector((state) => state.chat)
    const messageEl = useRef(null);

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await fetchMessagesAPI(selectedChat._id)
            // console.log(data)
            dispatch(fillMessages([...data.messages]))
            // window.scrollTo(0, ref.current.scrollHeight);
        } catch (error) {
            console.log(error)
            toast.error('Error while fetching messages!')
        } finally {
            setLoading(false)
        }
    }, [dispatch, selectedChat?._id])

    useEffect(() => {
        fetchMessages()
    }, [fetchMessages])

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', (event) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

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
                                messages?.map((message, index) => 
                                    <Message key={index} message={message} />
                                )
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