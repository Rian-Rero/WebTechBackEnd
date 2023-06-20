const verificarJwt = require("./VerificarJwt");

function verificarUsuario(req, res, next) {
  const usuarioId =
    req.params.id || req.params.id_usuario || req.body.id_usuario;

  if (req.usuarioId !== usuarioId)
    return res.status(401).json({ message: "Operação Não Autorizada!" });

  next();
}

module.exports = verificarUsuario;
