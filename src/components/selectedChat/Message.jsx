import { Box, Avatar, Text, Image } from "@chakra-ui/react"
import { useChatAuth } from "../../context/ChatAuthProvider"
import { useState, useEffect } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MessageOptions from "./MessageOptions";
import { v4 } from 'uuid'

const Message = ({ message }) => {
    const { loggedInUser } = useChatAuth()
    const [date, setDate] = useState({ hours:'', minutes:'', year:'', month:'', day:'' })

    useEffect(() => {
        const date = new Date('2023-09-28T07:07:43.798+00:00')
        const month = date.toLocaleString('default', { month: 'long' });
        setDate({
            hours: date.getHours(),
            minutes: date.getMinutes(),
            year: date.getFullYear(),
            month: month.slice(0, 3),
            day: date.getDay()
        })
    }, [message])

    return (
        <Box 
            // border={'2px solid red'}
            display={"flex"}
            alignItems={'center'}
            justifyContent={
                loggedInUser?._id === message.sender._id ? 
                'flex-end' : 'flex-start'
            }
        >
            <Box
                // border={'2px solid blue'}
                display={"flex"}
                // alignItems={'center'}
                justifyContent={'center'}
                maxW={'70%'}
                minW={'25%'}
                gap={2}
                p={'12px 20px'}
                flexDir={
                    loggedInUser?._id === message.sender._id ? 
                    '' : 'row-reverse'
                }
            >
                <Box
                    // border={'2px solid green'}
                    w={'100%'}
                    borderRadius={'5px'}
                    borderTopRightRadius={
                        loggedInUser?._id === message.sender._id ? 
                        '0' : '5px'
                    }
                    borderTopLeftRadius={
                        loggedInUser?._id !== message.sender._id ? 
                        '0' : '5px'
                    }
                    bg={
                        loggedInUser?._id === message.sender._id ? 
                        'teal.500' : '#f4f4f4'
                    }
                    color={
                        loggedInUser?._id === message.sender._id ? 
                        'white' : '#333'
                    }
                    shadow={'md'}
                    py={'12px'} px={'12px'}
                    display={'flex'}
                    flexDir={'column'}
                    gap={'2'}
                    // h={'50px'}
                >
                    {
                        message.type === 'video' &&
                        <video width="320" height="240" controls>
                            <source src={message?.content} />
                        </video>
                    }
                    {
                        message.type === 'audio' &&
                        <audio src={message?.content} controls={true} />
                    }
                    {
                        message.type === 'image' &&
                        <img src={message?.content} width="320" height="240" alt="x" />
                    }
                    {
                        message.type === 'file' &&
                        JSON.parse(message.content).map((url, index) => {
                            return (
                                <Box 
                                    key={v4()}
                                    bg={'teal.600'}
                                    display={'flex'}
                                    justifyContent={'flex-start'}
                                    gap={'10px'}
                                    alignItems={'center'}
                                    p={'10px 10px'}
                                    borderRadius={'md'}
                                >
                                    <Image 
                                        src='/document.png' 
                                        boxSize='30px'
                                        objectFit='cover'
                                        alt='x' 
                                    />
                                    <Text>
                                        <a href={ url }>File-{index + 1}</a>
                                    </Text>
                                </Box>
                            )
                        })
                    }
                    {
                        message.type === ('text' || null || undefined) &&
                        message.content
                    }
                    <Box
                        // border={'2px solid red'}
                        fontSize={'xs'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        // py={'4px'}
                    >
                        <Box>
                            {`${date.month} ${date.day}, ${date.year} - ${date.hours}:${date.minutes}`}
                        </Box>
                        <Box 
                            cursor={'pointer'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <MessageOptions message={message}>
                                <MoreHorizIcon />
                            </MessageOptions>
                        </Box>
                    </Box>
                </Box>
                <Box
                    // border={'2px solid green'}
                    // h={'50px'}
                >
                    <Avatar
                        size={'sm'}
                        name={message.sender.username}
                        src={message.sender.avatar}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Message
