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
	Box
} from '@chakra-ui/react'

const DeleteMessageModal = ({ children }) => {

	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Box onClick={onOpen}>{ children }</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>Delete Message</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						asdfasdf
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='teal' w={'100%'} onClick={onClose}>
							Delete Message
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default DeleteMessageModal


