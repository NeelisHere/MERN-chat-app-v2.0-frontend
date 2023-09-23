import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import MyChats from '../components/MyChats'
import SingleChat from '../components/SingleChat'

const HomePage = () => {
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
