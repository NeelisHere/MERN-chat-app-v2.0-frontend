import { Box, Avatar } from "@chakra-ui/react"
import { useChatAuth } from "../../context/ChatAuthProvider"

const Message = ({ message }) => {
    const { loggedInUser } = useChatAuth()

    return (
        <Box 
            // border={'2px solid red'}
            display={"flex"}
            alignItems={'center'}
            justifyContent={
                loggedInUser._id === message.sender._id ? 
                'flex-end' : 'flex-start'
            }
        >
            <Box
                // border={'2px solid blue'}
                display={"flex"}
                // alignItems={'center'}
                justifyContent={'center'}
                gap={1}
                p={'8px 20px'}
                flexDir={
                    loggedInUser._id === message.sender._id ? 
                    '' : 'row-reverse'
                }
            >
                <Box
                    // border={'2px solid green'}
                    borderRadius={'5px'}
                    borderTopRightRadius={
                        loggedInUser._id === message.sender._id ? 
                        '0' : '5px'
                    }
                    borderTopLeftRadius={
                        loggedInUser._id !== message.sender._id ? 
                        '0' : '5px'
                    }
                    bg={'#f4f4f4'}
                    py={'8px'} px={'12px'}
                    // h={'50px'}
                >
                    {message.content}
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
