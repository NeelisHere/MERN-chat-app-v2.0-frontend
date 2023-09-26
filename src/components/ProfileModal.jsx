import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    useDisclosure,
    Image,
    Text,
} from '@chakra-ui/react'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            {
                children ?
                    <span onClick={onOpen}>{children}</span> :
                    <IconButton
                        display={{ base: 'flex' }}
                        icon={<RemoveRedEyeIcon />}
                        onClick={onOpen}
                    />
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display={'flex'}
                        justifyContent={'center'}
                        flexDir={'column'}
                        alignItems={'center'}
                    >
                        <Text fontSize={'40px'} >{user?.username}</Text>
                        <Text fontSize={'17px'} fontWeight={'normal'}>{user?.email}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        p={'25px'}
                    >
                        <Image
                            borderRadius={'full'}
                            boxSize={'250px'}
                            src={user?.avatar}
                            alt={user?.username}
                        />
                    </ModalBody>
                    <ModalFooter
                        display={'flex'}
                        flexDir={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        p={'25px'}
                    >
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProfileModal
