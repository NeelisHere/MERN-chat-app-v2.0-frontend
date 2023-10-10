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

const MessageOptions = ({ children, message }) => {
    return (
        <Box>
            <Menu>
                <MenuButton>{ children }</MenuButton>
                <MenuList color={'black'}>
                    <EditMessageModal message={message}>
                        <MenuItem>Edit</MenuItem>
                    </EditMessageModal>
                    <MenuDivider />
                    <DeleteMessageModal message={message}>
                        <MenuItem>Delete</MenuItem>
                    </DeleteMessageModal>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default MessageOptions
