import { Box, Button, Stack, Text } from '@chakra-ui/react'
// import { useChatAuth } from '../context/ChatAuthProvider'
import AddIcon from '@mui/icons-material/Add';
import ChatListItem from './ChatListItem'
// import ChatLoading from './ChatLoading'
import GroupChatModal from './GroupChatModal'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyChats } from '../utils/APIcalls'
import { fillMyChats } from '../slices/chat-slice'
import toast from 'react-hot-toast';

const MyChats = () => {
    const dispatch = useDispatch()
    const { chatsUpdateFlag, myChats } = useSelector((state) => state.chat)

    const fetchChats = useCallback(async () => {
        try {
            const { data } = await fetchMyChats()
            dispatch(fillMyChats(data.myChats))
            // console.log('>>', data.myChats)
        } catch (error) {
            console.log(error)
            toast.error('Error fetching chats!')
        }
    }, [dispatch])

    useEffect(() => {
        fetchChats()
    }, [fetchChats, chatsUpdateFlag])

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
                <GroupChatModal>
                    <Button colorScheme='teal' rightIcon={<AddIcon />}>
                        Create Group
                    </Button>
                </GroupChatModal>
            </Box>

            <Stack
                spacing={0}
                h={'100%'}
            >
                {
                    myChats?.map((chat, index) => <ChatListItem key={index} chat={chat} />)
                }
            </Stack>

        </Box>
    )
}

export default MyChats
