import { z } from "zod";

const baseSchema = {
  titulo: z
    .string({ required_error: "O titulo é necessario!" })
    .trim()
    .min(1, "O tamanho minimo é 1")
    .max(50, "O maximo de caracteres é 50"),
  conteudo: z
    .string({ required_error: "O conteudo é necessario!" })
    .trim()
    .min(1, "O conteudo é necessario!"),
  lista: z
    .string({ required_error: "A lista é necessaria!" })
    .trim()
    .min(1, "A lista é necessaria!"),
};

export const createCard = z.object(baseSchema);

export const updateCard = z.object({
  ...baseSchema,
  id: z.string({ required_error: "O id é necessario!" }),
});
