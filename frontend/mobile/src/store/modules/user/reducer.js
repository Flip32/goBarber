import produce from 'immer' //O produce manipula o state

const INITIAL_STATE = {
    profile: null,
    loading: false,
}

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCCESS':
                draft.profile = action.payload.user
                if(draft.profile.avatar === null) {
                    draft.profile.avatar = {url: null}
                }
                break;
            case '@auth/SIGN_OUT': {
                draft.profile = null;
                break;
            }
            case '@user/UPDATE_USER_REQUEST': {
                draft.loading = true;
                break;
            }
            case '@user/UPDATE_USER_SUCCESS': {
                draft.loading = false;
                draft.profile = action.payload.profile;
                break;
            }
            case '@user/UPDATE_USER_FAILURE': {
                draft.loading = false;
                break;
            }
            default:
                return state;
        }
    })
}
