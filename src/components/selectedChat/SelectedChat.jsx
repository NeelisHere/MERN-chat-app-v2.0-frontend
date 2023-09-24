import { Box, Stack } from "@chakra-ui/react"
import SelectedChatNav from "./SelectedChatNav"
import SelectedChatInput from "./SelectedChatInput"

const SelectedChat = () => {

    return (
        <Stack spacing={0} h={'100%'}>

            <SelectedChatNav />
            
            <Box
                // border={'2px solid black'}
                borderBottom={'2px solid #d3d3d3'}
                borderTop={'2px solid #d3d3d3'}
                // backgroundImage={'bg-image.jpg'}
                h={'80%'}
            >
                chat
            </Box>

            <SelectedChatInput />

        </Stack>
    )
}

export default SelectedChat