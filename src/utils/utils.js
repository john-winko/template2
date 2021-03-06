import axios from "axios"

const myexports = {}

// This will be edited in the .env file in the root folder
// use your local host in development, leave the value blank on the file residing on the server
const urlPrefix = process.env.REACT_APP_URL_PREFIX

myexports.getCSRFToken = () => {
    let csrfToken

    // the browser's cookies for this page are all in one string, separated by semi-colons
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
        // individual cookies have their key and value separated by an equal sign
        const crumbs = cookie.split('=')
        if (crumbs[0].trim() === 'csrftoken') {
            csrfToken = crumbs[1]
        }
    }
    return csrfToken
}

const apiGet = async (url, params = null) => {
    console.log(url, params)  // so we can check which url was called in production if things go wonky
    axios.defaults.headers.common['X-CSRFToken'] = myexports.getCSRFToken()
    if (params)
        return await axios.get(urlPrefix + url, params)
    return await axios.get(urlPrefix + url)
}

const apiPost = async (url, params = null) => {
    console.log(url, params) // so we can check which url was called in production if things go wonky
    axios.defaults.headers.common['X-CSRFToken'] = myexports.getCSRFToken()
    if (params)
        return await axios.post(urlPrefix + url, params)
    return await axios.post(urlPrefix + url)
}

export default myexports;