import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Image } from 'react-native'

import { singUpRequest } from "~/store/modules/auth/actions";

import Background from '~/components/Background'
import {Container, Form, FormInput, SignLink, SignLinkText, SubmitButton} from "./styles";
import logo from "~/assets/logoNomeHalf.png";

function SignUp({ navigation : { navigate } }) {
    const dispatch = useDispatch()

    const passwordRef = useRef()
    const emailRef = useRef()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loading = useSelector(state => state.auth.loading)

    useEffect(() => {
        if (loading) {
            navigation.navigate('SignIn')
        }
    }, [loading])

    function handleSubmit() {
        dispatch(singUpRequest(name, email, password))
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
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
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}> Criar Conta </SubmitButton>
                </Form>
                <SignLink onPress={() => navigate('SignIn')}>
                    <SignLinkText>Já tenho conta</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    )
}

export default SignUp
