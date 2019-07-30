import axios from 'axios';
import Cookies from 'universal-cookie';
import CONFIG from './config';
import _ from 'lodash';

axios.defaults.baseURL = CONFIG.getAPIUrl();
axios.defaults.headers.post['Content-Type'] = 'application/json';
const cookies = new Cookies();


let utilities = {
    request: (config) => {
        return axios.request(config);
    },

    getUserId: () => {
        return cookies.get('userId');
    },

    clearCookies: () => {
        cookies.remove('access_token');
        cookies.remove('userId');
    },
    isAuthenticated: () => {
        return !!cookies.get('access_token');
    },
    updateItemList: (list, item, action) => {
        list = list || [];
        let newList = list.slice();
        let itemIndex;
        if (action === 'UPDATE') {
            itemIndex = _.findIndex(newList, { id: item.id });
            if (itemIndex !== -1)
                newList.splice(itemIndex, 1, item);
            return newList;
        } else if (action === 'ADD') {
            newList.unshift(item);
            return newList;
        } else if (action === 'DELETE') {
            _.remove(newList, { id: item.id })
            return newList;
        }
        return newList;
    },
    logoutUser: () => {
        return new Promise((resolve, reject) => {
            utilities.request({
                url: '/users/logout',
                method: 'post'
            }).then(function () {
                utilities.clearCookies()
                resolve();
            }, reject);
        });
    },

    getUser: () => {
        let userId = utilities.getUserId()
        return utilities.request({
            url: `/users/${userId}`,
            method: 'GET'
        })
    },

    getAdminUser: () => {
        let userId = utilities.getUserId()
        return utilities.request({
            url: `/admins/${userId}`,
            method: 'GET'
        })
    },

    logoutAdmin: () => {
        return new Promise((resolve, reject) => {
            utilities.request({
                url: '/admins/logout',
                method: 'post'
            }).then(function () {
                utilities.clearCookies()
                resolve();
            }, reject);
        });
    },

    saveUser: (accessToken, userId) => {
        userId = userId || '';
        cookies.set('access_token', accessToken, { path: '/' });
        cookies.set('userId', userId, { path: '/' });
    }
}

export default utilities;