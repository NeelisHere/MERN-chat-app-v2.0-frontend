import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useChatAuth } from '../context/ChatAuthProvider'
import { useEffect } from 'react'

const Layout = () => {
    const navigate = useNavigate()
    const { loggedInUser } = useChatAuth()
    
    useEffect(() => {
        if (!loggedInUser) {
            navigate('/auth')
        } else {
            navigate('/home')
        }
    }, [loggedInUser, navigate])

    return (
        <Box
            // border={'2px solid red'}
            w={'100vw'}
            h={'100vh'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bg={'#f4f4f4'}
        >
            <Outlet />
        </Box>
    )
}

export default Layout
