import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from '@rocketseat/unform'

import { signInRequest } from "~/store/modules/auth/actions";

import logo from '~/assets/logoNomeHalf.svg'
import * as Yup from "yup";

const schema = Yup.object().shape({
    email: Yup.string().email('Insira um email Válido').required('Campo Obrigatório'),
    password: Yup.string().required('Campo Obrigatório')
})

export default function SingIn() {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.loading)

    function handleSubmit({ email, password }) {
        // console.tron.log(data)
        dispatch(signInRequest(email.toLowerCase(), password))
    }

    return (
        <>
            <img src={logo} alt="GoBarber" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="password" type="password" placeholder="Sua senha secreta" />

                <button type="submit"> { loading ? 'Carregando...' : 'Acessar'} </button>
                <Link to="/register"> Criar conta gratuita </Link>
            </Form>
        </>
    )
}
