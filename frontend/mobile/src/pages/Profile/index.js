import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { updateUserRequest } from "~/store/modules/user/actions";
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background'
import { Container, Title, Form, FormInput, Separator, SubmitButton, LogoutButton } from './styles'

function Profile({ navigation }) {
    const profile = useSelector(state => state.user.profile)
    const dispatch = useDispatch()

    const passwordRef = useRef()
    const emailRef = useRef()
    const oldPasswordRef = useRef()
    const ConfirmPasswordRef = useRef()


    const [name, setName] = useState(profile ? profile.name : 'name')
    const [email, setEmail] = useState(profile ? profile.email: 'email')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const signed = useSelector(state => state.auth.signed)

    console.log('Signed - signout', signed)

    useEffect(() => {
        setOldPassword('')
        setPassword('')
        setConfirmPassword('')
    }, [profile])

    useEffect(() => {
        if(!signed) navigation.navigate('SignIn')
    }, [signed])

    function handleSubmit() {
        dispatch(updateUserRequest({
            name,
            email,
            oldPassword,
            password,
            confirmPassword
        }))
    }

    function handleLogout() {
        dispatch(signOut())
    }

    return (
        <Background>
            <Container>
                <Title> Meu Perfil </Title>
                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={profile ? name : ''}
                        onChangeText={setName}
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                        value={profile ? email : ''}
                        onChangeText={setEmail}
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha atual"
                        ref={oldPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua nova senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={() => ConfirmPasswordRef.current.focus()}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirme sua senha"
                        ref={ConfirmPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <SubmitButton onPress={handleSubmit}> Atualizar Perfil </SubmitButton>
                    <LogoutButton onPress={handleLogout}> Sair </LogoutButton>
                </Form>
            </Container>
        </Background>

        )
}

export default Profile
