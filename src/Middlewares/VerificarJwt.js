const jwt = require("jsonwebtoken");

function verificarJwt(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader)
    return res
      .status(403)
      .json({ message: "Header de Autorização não encontrado!" });

  const [bearer, token] = authHeader.split(" ");

  if (!/^Bearer$/.test(bearer))
    return res
      .status(403)
      .json({ message: "Header de Autorização mal formatado!" });
  if (!token)
    return res.status(403).json({ message: "JWT token não encontrado!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, dados) => {
    if (err) return res.status(403).json({ message: "JWT token Inválido!" });
    req.usuarioId = dados.usuario._id;

    next();
  });
}

module.exports = verificarJwt;
