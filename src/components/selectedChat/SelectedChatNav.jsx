import { Avatar, Box, Button, Spinner, Text } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSender } from "../../utils"
import { useChatAuth } from "../../context/ChatAuthProvider"
import RenameGroupChatModal from "./RenameGroupChatModal";
import UpdateGroupChatMembersModal from './UpdateGroupChatMembersModal'
import UpdateGroupPhoto from "./UpdateGroupPhoto"
import { removeUserFromGroup } from '../../utils/APIcalls.js'
import { changeChatsUpdateFlagStatus } from "../../slices/chat-slice";
import toast from "react-hot-toast";


const SelectedChatNav = () => {
    const dispatch = useDispatch()
    const { loggedInUser } = useChatAuth()
    const { selectedChat, chatsUpdateFlag } = useSelector((state) => state.chat)
    const [sender, setSender] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!selectedChat.isGroupChat) {
            setSender((prevSender) => {
                return getSender(selectedChat.users, loggedInUser)
            })
        }
    }, [selectedChat.isGroupChat, selectedChat.users, loggedInUser])

    const handleExit = async () => {
        try {
            setLoading(true)
            const payload = {
                chatId: selectedChat?._id,
                userId: loggedInUser?._id
            }
            await removeUserFromGroup(payload)
            dispatch(changeChatsUpdateFlagStatus(!chatsUpdateFlag))
            toast.success('Left the group successfully!')
        } catch (error) {
            console.log(error)
            toast.error('Error exiting you!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            // border={'2px solid black'}
            h={'10%'}
            display={'flex'}
            justifyContent={'space-between'}
            // bg={'teal.500'} color={'white'}
        >
            <Box
                // border={'2px solid blue'}
                display={'flex'}
                alignItems={'center'}
                px={'20px'}
                gap={3}
            >
                {
                    selectedChat?.isGroupChat ?
                        <Avatar
                            size={'md'}
                            name={selectedChat?.chatName}
                            src={selectedChat?.photo}
                            bg='teal.500'
                            color={'white'}
                        />
                        :
                        <Avatar
                            size={'md'}
                            name={sender?.username}
                            src={sender?.avatar}
                        />
                }

                <Box>
                    {
                        selectedChat?.isGroupChat ?
                            <>
                                <Text>{selectedChat?.chatName}</Text>
                                <Text fontSize={'xs'}>Group Chat</Text>
                            </>
                            :
                            <>
                                <Text>{sender?.username}</Text>
                                <Text fontSize={'xs'}>{sender?.email}</Text>
                            </>
                    }
                </Box>
            </Box>
            {
                selectedChat?.isGroupChat &&
                <Box
                    // border={'2px solid blue'}
                    mx={'20px'}
                    px={'20px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Menu>
                        <MenuButton 
                            as={Button} 
                            rightIcon={<MoreVertIcon />} 
                            colorScheme="teal"
                        >
                            Actions
                        </MenuButton>
                        <MenuList>
                            <RenameGroupChatModal>
                                <MenuItem>Edit Group Name</MenuItem>
                            </RenameGroupChatModal>
                            <MenuDivider />
                            <UpdateGroupChatMembersModal>
                                <MenuItem>Update Group Members</MenuItem>
                            </UpdateGroupChatMembersModal>
                            <MenuDivider />
                            <UpdateGroupPhoto>
                                <MenuItem>Update Group Photo</MenuItem>
                            </UpdateGroupPhoto>
                            <MenuDivider />
                            <MenuItem onClick={handleExit}>
                                { loading? <Spinner/> : 'Exit Group' }
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            }

        </Box>
    )
}

export default SelectedChatNav
