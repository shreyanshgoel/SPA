import utils from 'resources/utils'

export const LAUNCHES_RECEIVED = 'LAUNCHES_RECEIVED'
export const LAUNCH_SELECTED = 'LAUNCH_SELECTED'

const requestLaunchList = () => {
    return utils.request({
        url: '/launches',
        method: "GET",
        params: {
            start: "",
            end: '2013-12-31"'
        }
    });
}

const requestSelectLaunch = (flight_number) => {
    return utils.request({
        url: `/launches/${flight_number}`,
        method: "GET"
    });
}

export const getLaunchList = (id) => {
    return dispatch => {
        requestLaunchList().then(
            res => {
                dispatch(launchesReceived(res.data))
            }
        )
    }
}

export const selectLaunch = (flight_number) => {
    return dispatch => {
        requestSelectLaunch(flight_number).then(
            res => {
                dispatch(launchSelected(res.data))
            }
        )
    }
}

const launchSelected = (launch) => ({
    type: LAUNCH_SELECTED,
    launch
})

const launchesReceived = (launches) => ({
    type: LAUNCHES_RECEIVED,
    launches
})