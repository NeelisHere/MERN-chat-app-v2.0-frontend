import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    MenuDivider,
} from '@chakra-ui/react'

import React from 'react'
import EditMessageModal from './EditMessageModal'
import DeleteMessageModal from './DeleteMessageModal'
import { useChatAuth } from '../../context/ChatAuthProvider'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const MessageOptions = ({ children, message }) => {
    const { loggedInUser } = useChatAuth()

    return (
        <Box>
            <Menu>
                <MenuButton>{ children }</MenuButton>
                <MenuList color={'black'}>
                    {
                        loggedInUser._id === message.sender._id &&
                        <>
                            <EditMessageModal message={message}>
                                <MenuItem>Edit</MenuItem>
                            </EditMessageModal>
                            <MenuDivider />
                        </>
                    }
                    <DeleteMessageModal message={message}>
                        <MenuItem>Delete</MenuItem>
                    </DeleteMessageModal>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default MessageOptions
