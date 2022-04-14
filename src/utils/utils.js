import {authRequest} from './auth.js'

const whoAmI = async () => {
    return await authRequest.get("/v1/user/whoami/")
        .then((res) => res.data)
}

const byebye = async () => {
    return await authRequest.post('/byebye/')
}

export {whoAmI, byebye};