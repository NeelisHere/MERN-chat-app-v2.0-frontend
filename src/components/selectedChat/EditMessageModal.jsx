import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Box,
	Textarea 
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { editMessageAPI } from '../../utils/APIcalls'
import { changeMessagesUpdateFlagStatus, changeChatsUpdateFlagStatus } from '../../slices/chat-slice.js'
import { useDispatch, useSelector } from 'react-redux'

const EditMessageModal = ({ children, message }) => {
	const dispatch = useDispatch()
	const [currentMessage, setCurrentMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const { chatsUpdateFlag } = useSelector((state) => state.chat)

	useEffect(() => {
		setCurrentMessage(message.content)
	}, [])

	const handleUpdateMessage = async () => {
		setLoading(true)
		try {
			await editMessageAPI({
				messageId: message._id,
				updatedContent: currentMessage
			})
			dispatch(changeMessagesUpdateFlagStatus())
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
			toast.success('Message updated successfully!')
			onClose()
		} catch (error) {
			toast.error('Error updating message!')
		} finally {
			setLoading(false)
		}
	}

	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Box onClick={onOpen}>{ children }</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>Edit Message</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Textarea 
							value={currentMessage}
							onChange={(e) => setCurrentMessage(e.target.value)}
						/>
					</ModalBody>

					<ModalFooter>
						<Button isLoading={loading} colorScheme='teal' w={'100%'} onClick={handleUpdateMessage}>
							Edit Message
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default EditMessageModal

