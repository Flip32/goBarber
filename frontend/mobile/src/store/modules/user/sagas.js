import { Alert } from 'react-native'
import { all, takeLatest, put, call } from 'redux-saga/effects'

import api from "~/services/api";

import { updateUserFailure, updateUserSuccess } from "~/store/modules/user/actions";

export function* updateUser({ payload }) {
    try {
        const { name, email,  ...rest } = payload.data

        const profile = Object.assign(
            { name, email },
            rest.oldPassword ? rest : {}
        )
        const response = yield call(api.put, 'users', { ...profile })

        Alert.alert(
            'Sucesso',
            'Perfil atualizado com sucesso'
        )

        yield put(updateUserSuccess(response.data))

    } catch (err) {
        Alert.alert(
            'Falha na atualização',
            'Houve um erro na atualização do perfil, verifique seus dados'
        )
        yield put(updateUserFailure())
    }
}

export default all ([
    takeLatest('@user/UPDATE_USER_REQUEST', updateUser)
])
