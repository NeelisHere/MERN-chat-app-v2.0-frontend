import React, { useEffect, useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import MyChats from '../components/MyChats'
import SingleChat from '../components/SingleChat'
import { fetchMyChats } from '../utils/APIcalls'
import { useDispatch } from 'react-redux'
import { fillMyChats } from '../slices/chat-slice.js'
import toast from 'react-hot-toast'

const HomePage = () => {
    const dispatch = useDispatch()
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
    }, [fetchChats])

    return (
        <Box
            // border={'2px solid black'}
            w={'100%'}
            h={'100vh'}
        >
            <Box 
                h={'10%'} 
                // border={'2px solid red'}
                borderBottom={'1px solid #dedede'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Navbar />
            </Box>
            <Box
                // border={'2px solid red'}
                w={'100%'}
                display={'flex'}
                h={'90%'}
            >
                <MyChats />
                <SingleChat />
            </Box>
        </Box>
    )
}

export default HomePage
