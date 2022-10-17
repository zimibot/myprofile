

export default async (req, res) => {
  const isTokenExpired = req.headers.cookie ? Date.now() >= (JSON.parse(atob(req.headers.cookie?.split("=").pop().split('.')[1]))).exp * 1000 : false
  const data = req.headers.cookie ? (JSON.parse(atob(req.headers.cookie?.split("=").pop().split('.')[1]))) : null
  res.status(200).json({
    isAuth: req.headers.cookie && !isTokenExpired ? true : false,
    data,
    msg: isTokenExpired ? "sorry your token is expired" : false
  });
}