import { Box, Input, IconButton, Avatar, Tooltip } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, Text, Grid } from '@chakra-ui/react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import DescriptionIcon from '@mui/icons-material/Description';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import MicIcon from '@mui/icons-material/Mic';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { useState } from "react";
import { sendMessageAPI } from "../../utils/APIcalls";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useSocket } from "../../context/SocketProvider";
import SendModal from "../sendOptions/SendModal";

const SelectedChatInput = () => {
    // const dispatch = useDispatch()
    const { socket } = useSocket()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { selectedChat } = useSelector((state) => state.chat)

    const handleSend = async () => {
        try {
            setLoading(true)
            const payload = {
                content: message,
                chatId: selectedChat?._id
            }
            const { data } = await sendMessageAPI(payload)
            socket.emit('NEW_MESSAGE_REQ', {
                message: data.message,
                chat: selectedChat
            })
            setMessage('')

        } catch (error) {
            console.log(error)
            toast.error('Error sending message!')
        } finally {
            setLoading(false)
        }
    }

    const sendOptions = [
        { type: 'Capture Image', icon: <CameraAltIcon /> },
        { type: 'Capture Video', icon: <VideoCameraBackIcon /> },
        { type: 'Capture Audio', icon: <MicIcon /> },
        { type: 'Text File', icon: <DescriptionIcon /> },
        { type: 'Video File', icon: <VideoFileIcon /> },
        { type: 'Audio File', icon: <AudioFileIcon /> },
        { type: 'Image File', icon: <ImageIcon /> },
        { type: 'Emojis', icon: <EmojiEmotionsIcon /> },
    ]

    return (
        <Box
            // border={'2px solid black'}
            h={'10%'}
            display={'flex'}
            px={'20px'}
        >
            <Box
                // border={'2px solid red'}
                w={'90%'} h={'100%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                px={'5px'}
            >
                <Input
                    variant='filled'
                    placeholder='Type message here...'
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                />
            </Box>
            <Box
                // border={'2px solid red'}
                w={'5%'} h={'100%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Menu>
                    <MenuButton as={IconButton} icon={<MoreVertIcon />} />
                    <MenuList>
                        <Text textAlign={'center'} fontWeight={'semibold'}>Send Options</Text>
                        <Grid
                            // border={'2px solid red'}
                            templateRows='repeat(3, 1fr)'
                            templateColumns='repeat(3, 1fr)'
                            gap={3} p={'15px'} pr={'5px'}
                        >
                            {
                                sendOptions.map((option, index) => {
                                    return (
                                        <SendModal key={index} type={index}>
                                            <Tooltip key={index} label={option.type}>
                                                <Avatar
                                                    cursor={'pointer'}
                                                    bg={'#606060'}
                                                    icon={option.icon}
                                                />
                                            </Tooltip>
                                        </SendModal>
                                    )
                                })
                            }
                        </Grid>
                    </MenuList>
                </Menu>
            </Box>
            <Box
                // border={'2px solid red'}
                w={'5%'}
                h={'100%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <IconButton
                    onClick={handleSend}
                    icon={<SendIcon />}
                    isLoading={loading}
                />
            </Box>
        </Box>
    )
}

export default SelectedChatInput
