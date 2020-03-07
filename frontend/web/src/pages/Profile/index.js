import React from 'react';
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from '@rocketseat/unform'

import AvatarInput from './AvatarInput'
import { Container } from './styles'

import { signOut } from "~/store/modules/auth/actions";
import { updateUserRequest } from "~/store/modules/user/actions";

const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
                                          oldPassword ? field.required('Digite a nova senha').min(6) : field
                                          ),
      confirmPassword: Yup.string().when('password', (password, field) =>
                                          password ? field.required('Confirme a nova senha').min(6).oneOf([Yup.ref('password')]) : field
                                        )
    })

export default function Profile() {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.user.profile)

    function handleSignOut () {
        dispatch(signOut())
    }

    function handleSubmit(data) {
        dispatch(updateUserRequest(data))
    }

    return (
        <Container>
            <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />

                <Input name="name" placeholder="Nome Completo" />
                <Input name="email" type="email" placeholder="Seu email Favorito" />

                <hr />
                <Input name="oldPassword" type="password" placeholder="Sua senha atual" />
                <Input name="password" type="password" placeholder="Nova Senha" />
                <Input name="confirmPassword" type="password" placeholder="Confirme Nova Senha" />
                <button type="submit" > Atualizar </button>
            </Form>

            <button type="button" onClick={() => handleSignOut()} > Sign Out </button>
        </Container>
    )
}
