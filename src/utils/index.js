export const getSender = (users, loggedInUser) => {
    return users[0]._id === loggedInUser._id? users[1] : users[0]
}