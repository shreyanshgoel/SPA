import utils from 'resources/utils'
export const CHANGE_ROUTE = 'CHANGE_ROUTE'

// const requestConstants = () => {
//     return utils.request({
//         url: '/AppModels/constants'
//     });
// }

// export const getUser = (id) => {
//     return dispatch => {
//         utils.request({
//             url: `users/${id}`
//         }).then(
//             res => dispatch(userDetailsFetched(res.data)),
//             err => {
//                 utils.clearCookies()
//             }
//         )
//     }
// }

// const settingsReceived = (settings) => ({
//     type: SETTINGS_RECEIVED,
//     settings
// })
export const getCount = (id) => {
    return dispatch => {
        utils.request({
            url: `users/${id}`
        }).then(
            res => dispatch(countReceived(res.data)),
            err => {
                utils.clearCookies()
            }
        )
    }
}


export const getLaunchList = (id) => {
    return dispatch => {
        utils.request({
            url: `users/${id}`
        }).then(
            res => dispatch(launchesReceived(res.data)),
            err => {
                utils.clearCookies()
            }
        )
    }
}

const launchesReceived = () => ({

})

const countReceived = () => ({

})