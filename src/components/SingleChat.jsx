import { Box, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import SelectedChat from './selectedChat/SelectedChat'

const NoSelectedChat = () => {
    return(
        <Box 
            w={'100%'} 
            h={'100%'} 
            display={'flex'} 
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Text fontSize={'5xl'} fontWeight={'bold'} color={'#dedede'}>
                No Chat Selected
            </Text>
        </Box>
    )
}

const SingleChat = () => {
    const { selectedChat } = useSelector((state) => state.chat)
    return (
        <Box
            border={'1px solid #dedede'}
            width={'75%'}
        >
            { selectedChat? <SelectedChat/> : <NoSelectedChat /> }
        </Box>
    )
}

export default SingleChat
