import { verify } from 'jsonwebtoken'

export const authenticated = (fn) => async (req, res) => {
    try {
        verify(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET, async function (err, decode) {
            if (!err && decode) {
                return await fn(req, res)
            }

            if (req.headers.authorization) {
                const isTokenExpired = Date.now() >= (JSON.parse(atob(req.headers.authorization.split('.')[1]))).exp * 1000
                if (isTokenExpired) {
                    return res.status(401).json({
                        code: 401,
                        message: "sorry your token is expired",
                        exp: true
                    })
                }
            } else {
                return res.status(401).json({code: 401, message: "sorry your are not authenticated"})
            }

        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}