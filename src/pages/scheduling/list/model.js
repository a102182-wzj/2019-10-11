import * as s from './service'
import request from '../../../utils/request'

const moment = require("moment")

export default {
    namespace: 'schedulingList',
    state: {
        pageDisplay: false,
        scheduling: [],
        schedulingDetail: [],
        date: moment().format("YYYY-MM-DD")
    },
    reducers: {
        save(state, { payload: { scheduling, date } }) {
            return { ...state, scheduling, date, pageDisplay: true }
        },
        saveDetail(state, { payload: { schedulingDetail } }) {
            return { ...state, schedulingDetail }
        }
    },
    effects: {
        *get({ payload: date }, { call, put }) {
            const data = yield call(s.getByDate, date)
            let scheduling = data.data
            if (scheduling.length > 0) {
                const schedulingDetail = yield call(s.getDetailByDoctor, scheduling[0].doctor, date)
                yield put({ type: 'saveDetail', payload: { schedulingDetail } })
            }
            yield put({ type: 'save', payload: { scheduling, date } })
        },
        *getDetailByDoctor({ payload: { date, doctor_id } }, { call, put }) {
            const data = yield call(() => {
                return request.get("scheduling/" + doctor_id + "?date=" + date)
            })
            console.log("data", data)
            let schedulingDetail = data.data
            yield put({ type: 'saveDetail', payload: { schedulingDetail } })
        }
    },
    // subscriptions: {
    //     setup({ dispatch, history }) {
    //         return history.listen(({ pathname, query }) => {
    //             if (pathname === '/scheduling/list') {
    //                 dispatch({ type: 'save', payload: query });
    //             }
    //         });
    //     },
    // },
}