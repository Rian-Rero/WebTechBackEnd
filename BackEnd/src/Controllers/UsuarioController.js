const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async create(req, res) {
    try {
      const usuario = await UsuarioModel.create(req.body);

      const { senha, ...novoUsuario } = usuario.toObject();

      return res.status(200).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ message: "Deu ruim aqui", error: error.message });
    }
  }
  async read(req, res) {
    try {
      const usuarios = await UsuarioModel.find();

      return res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: "Deu ruim aqui", error: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const usuariosEncontrado = await UsuarioModel.findById(id);

      if (!usuariosEncontrado)
        return res.status(404).json({ message: "Usuario Não foi Encontrado" });

      const usuario = await usuariosEncontrado.set(req.body).save();

      return res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: "Deu ruim aqui", error: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      const usuariosEncontrado = await UsuarioModel.findById(id);

      if (!usuariosEncontrado)
        return res.status(404).json({ message: "Usuario Não foi Encontrado" });
      await usuariosEncontrado.deleteOne();
      return res
        .status(200)
        .json({ mensagem: "Usuario deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Deu ruim aqui", error: error.message });
    }
  }
}

module.exports = new UsuarioController();
