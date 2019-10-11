import request from '../../../utils/request'

export function getByDate(date) {
    return request.get("scheduling?date=" + date)
}

export function getDetailByDoctor(doctor_id, date) {
    return request.get("scheduling/" + doctor_id + "?date=" + date)
}