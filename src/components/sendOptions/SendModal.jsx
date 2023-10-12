import React from 'react'
import CapturePhotoModal from './CapturePhotoModal'
import { Box, useDisclosure } from '@chakra-ui/react'
import CaptureVideoModal from './CaptureVideoModal'

const SendModal = ({ children, type }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sendOptions = [
        <CapturePhotoModal 
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
        />,
        <CaptureVideoModal 
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
        />,
    ]
    return (
        <>
            <Box onClick={onOpen}>{ children }</Box>
            {
                sendOptions[type]
            }
        </>
    )
}

export default SendModal
