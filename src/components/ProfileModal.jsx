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
    Button,
    Image,
    Text,
    Box,
    Container,
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
                        <Box mb={5}>
                            <Text fontSize={'xs'}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores inventore facere fugiat voluptatibus corporis ducimus.
                            </Text>
                        </Box>
                        <Button colorScheme={'teal'} w={'100%'} >
                            Edit Profile
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProfileModal
