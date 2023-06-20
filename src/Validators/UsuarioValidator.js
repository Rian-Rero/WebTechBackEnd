const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    nome: z.string({ required_error: "O nome é obrigatório" }),
    email: z
      .string({ required_error: "O email é obrigatório" })
      .email("Utilize um email válido"),
    senha: z.string({ required_error: "A senha é obrigatório" }),
    cargo: z.string({ required_error: "O cargo é obrigatório" }),
    sobre: z.string({ required_error: "O sobre é obrigatório" }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "Id não é válido"),
  }),
});

const update = validateRequest({
  body: z.object({
    nome: z.string().optional(),
    email: z.string().email("Utilize um email válido").optional(),
    senha: z.string().optional(),
    cargo: z.string().optional(),
    sobre: z.string().optional(),
  }),
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id não é válido"),
  }),
});

module.exports = {
  create,
  destroy,
  update,
};
