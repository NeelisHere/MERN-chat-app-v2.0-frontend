import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button, Stack,
	Box, Radio, RadioGroup
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useChatAuth } from '../../context/ChatAuthProvider'
import toast from 'react-hot-toast'
import { deleteMessageAPI } from '../../utils/APIcalls'
import { changeMessagesUpdateFlagStatus, changeChatsUpdateFlagStatus } from '../../slices/chat-slice.js'
import { useDispatch, useSelector } from 'react-redux'

const DeleteMessageModal = ({ children, message }) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('0')
	const { isOpen, onOpen, onClose } = useDisclosure()
    const { loggedInUser } = useChatAuth()
    const [loading, setLoading] = useState(false)
    const { chatsUpdateFlag } = useSelector((state) => state.chat)

    const handleDeleteMessage = async () => {
        setLoading(true)
        try {
            // toast(message._id)
            await deleteMessageAPI({
                messageId: message._id,
                deleteOption: value
            })
            dispatch(changeMessagesUpdateFlagStatus())
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
            const msg = `Message deleted for ${value === '0'? 'you' : 'everyone'}!`
            toast.success(msg)
            onClose()
        } catch (error) {
            console.log(error)
            toast.error('Error deleting message!')
        } finally {
            setLoading(false)
        }
    }

	return (
		<>
			<Box onClick={onOpen}>{ children }</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>Delete Message</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
                    <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='column' py={'20px'}>
                            <Radio value={'0'}>Delete for me.</Radio>
                            {
                                loggedInUser._id === message.sender._id &&
                                <Radio value={'1'}>Delete for everyone.</Radio>
                            }
                        </Stack>
                        </RadioGroup>
					</ModalBody>

					<ModalFooter>
						<Button isLoading={loading} colorScheme='teal' w={'100%'} onClick={handleDeleteMessage}>
							Delete Message
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default DeleteMessageModal


