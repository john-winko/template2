import {authRequest} from './auth.js'

const whoAmI = async () => {
    return await authRequest.get("/v1/user/whoami/")
        .then((res) => res.data)
}

export {whoAmI};