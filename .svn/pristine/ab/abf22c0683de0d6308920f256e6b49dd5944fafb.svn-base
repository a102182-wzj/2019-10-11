import request from '../utils/request'
import { getToken } from '../utils/token'

export default {
    namespace: 'login',

    state: {
        menu: [],
        store: [],
        person:{},
    },
    reducers: {
        saveMenu(state, { payload: { data } }) {
            return { ...state, menu: data.menu, store: data.store, person:data.person }
        }
    },
    effects: {
        *login({ payload: { } }, { call, put }) {
            const data = yield call(() => {
                return request.post("token", { token: getToken() })
            })
            yield put({ type: 'saveMenu', payload: { data: data.data } })
        }
    }


}