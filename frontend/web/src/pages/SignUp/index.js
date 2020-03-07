import React from 'react';
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import { Form, Input } from '@rocketseat/unform'

import logo from '~/assets/logoNomeHalf.svg'

import { singUpRequest } from "~/store/modules/auth/actions";

const schema = Yup.object().shape({
    name: Yup.string().required('Campo Obrigatório'),
    email: Yup.string().email('Insira um email Válido').required('Campo Obrigatório'),
    password: Yup.string().min(6, 'No mínimo 6 caracteres').required('Campo Obrigatório')
})

export default function SingUp() {
    const dispatch = useDispatch()

    function handleSubmit({ name, email, password }){
        dispatch(singUpRequest(name, email.toLowerCase(), password))
    }

    return (
        <>
            <img src={logo} alt="GoBarber" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" type="test" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="password" type="password" placeholder="Sua senha secreta" />

                <button type="submit"> Criar Conta </button>
                <Link to="/"> Já tenho Login </Link>
            </Form>
        </>
    )
}
