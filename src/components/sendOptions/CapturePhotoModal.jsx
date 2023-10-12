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
import { useState } from 'react'
import { useRef } from 'react'
import Webcam from 'react-webcam'

const CapturePhotoModal = ({ onOpen, isOpen, onClose }) => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [image, setImage] = useState(null)
    const webcamRef = useRef(null)
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
    }

    return (
        <>
            {/* <Box onClick={onOpen}>{ children }</Box> */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={'20px'}>
                        {
                            image?
                            <img src={image} alt='x' />:
                            <Webcam ref={webcamRef} />
                        }
                    </ModalBody>

                    <ModalFooter>
                        {
                            !image?
                            <Button colorScheme='teal' w={'100%'} onClick={capture}>
                                Capture
                            </Button>
                            :
                            <Button colorScheme='teal' w={'100%'} onClick={() => setImage(null)}>
                                Remove
                            </Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CapturePhotoModal
