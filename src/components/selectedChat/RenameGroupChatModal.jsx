import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, ModalCloseButton, Box, Button, FormControl, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renameGroupChat } from '../../utils/APIcalls'
import { changeChatsUpdateFlagStatus } from '../../slices/chat-slice.js'
import toast from 'react-hot-toast'


const RenameGroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)
    const { chatName, users } = selectedChat
    const [newTitle, setNewTitle] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setNewTitle(chatName)
    }, [setNewTitle, users, chatName])

    const handleUpdate = async () => {
        
        if (chatName !== newTitle) {
            const payload = {
                chatId: selectedChat._id,
                newChatName: newTitle
            }
            try {
                setLoading(true)
                await renameGroupChat(payload)
                toast.success('Chat renamed successfully!')
                dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
                onClose()
            } catch (error) {
                console.log(error)
                toast.error('Error renaming chat!')
            } finally {
                setLoading(false)
            }
        }
        
    }

    return (
        <>
            <Box onClick={onOpen}>{children}</Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Rename Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDir={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        // bg={'#f4f4f4'}
                    >
                        <FormControl>
                            <Input
                                variant='filled'
                                placeholder='Chat Name'
                                mb={3}
                                w={'100%'}
                                value={newTitle}
                                onChange={(e) => { setNewTitle(e.target.value) }}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='teal'
                            w={'100%'}
                            onClick={handleUpdate}
                            isLoading={loading}
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RenameGroupChatModal
