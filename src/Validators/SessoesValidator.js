const { default: mongoose } = require("mongoose");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");

const create = validateRequest({
  body: z.object({
    id_usuario: z.custom(
      mongoose.isValidObjectId,
      "Id do usuario não é válido"
    ),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id_usuario: z.custom(
      mongoose.isValidObjectId,
      "O ID do usuário não é válido"
    ),
  }),
});

module.exports = {
  create,
  destroy,
};
