import { z } from "zod";

const formatDate = (date: Date | string | null) => {
  if (!date) return "";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const newPaymentSchema = z.object({
  supplier: z.string().min(1, { message: "Fornecedor é obrigatório" }),
  type: z.string().min(1, { message: "Tipo é obrigatório" }),
  paymentMethod: z
    .string()
    .min(1, { message: "Meio de pagamento é obrigatório" }),
  dueDate: z
    .union([
      z.date(),
      z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Data deve estar no formato YYYY-MM-DD",
      }),
    ])
    .nullable()
    .transform((date) => formatDate(date)),
  amount: z.number().gt(0, { message: "Valor não pode ser zero" }),
});

export type NewPaymentSchema = z.infer<typeof newPaymentSchema>;
