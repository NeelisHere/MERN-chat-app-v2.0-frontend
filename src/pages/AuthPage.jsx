import { Container } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"

const AuthPage = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box bg={'white'} p={4} w={'100%'} borderRadius={'lg'} boxShadow='md'>
                <Tabs variant='soft-rounded' colorScheme='#f4f4f4'>
                    <TabList mb={'1em'}>
                        <Tab width={'50%'} _selected={{ bg: '#f4f4f4' }}>Login</Tab>
                        <Tab width={'50%'} _selected={{ bg: '#f4f4f4' }}>Register</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Register />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default AuthPage
