export function signInRequest(email, password) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: { email, password }
    }
}

export function signInSuccess(token, user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { token, user }
    }
}

export function singUpRequest(name, email, password) {
    return {
        type: '@auth/SIGN_UP_REQUEST',
        payload: { name, email, password }
    }
}

export function singUpSuccess(loading) {
    return {
        type: '@auth/SIGN_UP_SUCCESS',
        payload: { loading }
    }
}

export function signFailure() {
    return {
        type: "@auth/SIGN_FAILURE"
    }
}

export function signOut() {
    return {
        type: "@auth/SIGN_OUT"
    }
}
