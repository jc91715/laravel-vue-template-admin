


export function login({username,password}) {
    //see detail Password Grant and independant SPA issue https://github.com/laravel/passport/issues/165#issuecomment-336416737
    return axios.post('oauth/token',{
        grant_type: "password",
        client_id: process.env.MIX_CLIENT_ID,
        client_secret: process.env.MIX_CLIENT_SECRET,
        username:username,
        password: password,
        type: ''
    })
}

export function getInfo() {
    return axios.get('api/user')
}

export function logout() {
    //没有调用此方法直接清除cookie
    //see detail  需要web auth 中间件
    return  axios.delete(`oauth/tokens/${process.env.MIX_CLIENT_ID}`)
}
