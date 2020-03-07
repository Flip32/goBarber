import { all, takeLatest, put, call } from 'redux-saga/effects'
import { toast } from "react-toastify";

import api from "~/services/api";

import { updateUserFailure, updateUserSuccess } from "~/store/modules/user/actions";

export function* updateUser({ payload }) {
    try {
        const { name, email, avatar_id, ...rest } = payload.data

        const profile = Object.assign(
            { name, email, avatar_id },
            rest.oldPassword ? rest : {}
        )
        const response = yield call(api.put, 'users', { ...profile })

        toast.success('Perfil atualizado com sucesso')

        yield put(updateUserSuccess(response.data))

    } catch (err) {
        toast.error('Falha ao enviar formulário')
        yield put(updateUserFailure())
    }
}

export default all ([
    takeLatest('@user/UPDATE_USER_REQUEST', updateUser)
])
