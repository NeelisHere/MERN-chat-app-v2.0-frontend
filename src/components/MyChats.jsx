import { Box, Button, Stack, Text } from '@chakra-ui/react'
// import { useChatAuth } from '../context/ChatAuthProvider'
import ChatListItem from './ChatListItem'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyChats } from '../utils/APIcalls'
import { fillMyChats } from '../slices/chat-slice'

const MyChats = () => {
    const dispatch = useDispatch()
    // const { loggedInUser } = useChatAuth()
    const { isNewChatCreated, myChats } = useSelector((state) => state.chat)

    const fetchChats = useCallback(async () => {
        const { data } = await fetchMyChats()
        // console.log('>>', data.myChats)
        dispatch(fillMyChats(data.myChats))
    }, [dispatch])

    useEffect(() => {
        fetchChats()
    }, [fetchChats, isNewChatCreated])

    return (
        <Box
            // border={'2px solid red'}
            border={'1px solid #dedede'}
            width={'25%'}
            overflowY={'scroll'}
            bg={'#f4f4f4'}
            sx={
                {
                    '::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            }
        >
            <Box
                // border={'2px solid blue'}
                borderBottom={'1px solid #dedede'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={'20px'}
                position={'sticky'}
                top={'0'}
                zIndex={'100'}
                bg={'#f4f4f4'}
                h={'70px'}
            >
                <Text fontSize={'xl'} fontWeight={'semibold'} >Heading</Text>
                <Button colorScheme='teal'>Create Group</Button>
            </Box>

            <Stack
                spacing={0}
                h={'100%'}
            >
                {
                    myChats.map((chat, index) => <ChatListItem key={index} chat={chat} />)
                }
            </Stack>

        </Box>
    )
}

export default MyChats
