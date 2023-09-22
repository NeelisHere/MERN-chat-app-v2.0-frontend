import React, { useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { FormControl } from '@chakra-ui/react'
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import schema from '../../utils/fromValidationSchemas'
import { loginUser } from '../../utils/APIcalls';


const Login = () => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { handleSubmit, register } = useForm()

    const onSubmit = async (values) => {
        // console.log(values)
        try {
            setLoading(true)
            const { data } = await loginUser(values)
            // console.log(data)
            toast.success(`Welcome back, ${data.user.username}!`)
            localStorage.setItem('userInfo', JSON.stringify(data.user))
            navigate('/home')
        } catch (error) {
            console.log(error)
            toast.error('Error logging in user!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3}>
                <FormControl>
                    <Input
                        placeholder='Username'
                        {...register('username', schema.username)}
                    />
                </FormControl>

                <FormControl>
                    <InputGroup>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder='Password'
                            {...register('password', schema.password)}
                        />
                        <InputRightAddon width={'4.5rem'}>
                            <Button
                                h={'1.75rem'}
                                size={'sm'}
                                onClick={() => {
                                    setShow(!show)
                                }}
                            >
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightAddon>
                    </InputGroup>
                </FormControl>

                <Button
                    width={'100%'}
                    colorScheme='teal'
                    isLoading={loading}
                    type='submit'
                    mt={'20px'}
                >
                    Login
                </Button>
            </VStack >
        </form>
    )
}

export default Login
