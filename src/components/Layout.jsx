import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
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
