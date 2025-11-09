import { z } from "zod"

const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty("El nombre es obligatorio")
    .min(5, "El nombre debe tener al menos 5 caracteres"),
  lastName: z.string().optional(),
  age: z
    .string()
    .trim()
    .nonempty("La edad es obligatoria")
    .refine(val => !isNaN(parseFloat(val)), {
      message: "La edad debe ser un número",
    })
    .refine(val => parseFloat(val) >= 18, {
      message: "Debes ser mayor de edad",
    }),
  email: z
    .string()
    .trim()
    .nonempty("El email es obligatorio")
    .email({ message: "El correo electrónico no es válido" }),
  password: z
    .string()
    .trim()
    .nonempty("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña no debe exceder los 32 caracteres")
    .refine(val => /[a-z]/.test(val), {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .refine(val => /[A-Z]/.test(val), {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .refine(val => /[0-9]/.test(val), {
      message: "La contraseña debe contener al menos un número",
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message:
        'La contraseña debe contener al menos un carácter especial !@#$%^&*(),.?":{}|<></>',
    }),
  confirmPassword: z
    .string()
    .trim()
    .nonempty("Debes confirmar la contraseña")
    .min(8, "La confirmación de la contraseña debe tener al menos 8 caracteres")
    .max(
      32,
      "La confirmación de la contraseña no debe exceder los 32 caracteres",
    )
    .refine(val => /[a-z]/.test(val), {
      message:
        "La confirmación de la contraseña debe contener al menos una letra mayúscula",
    })
    .refine(val => /[A-Z]/.test(val), {
      message:
        "La confirmación de la contraseña debe contener al menos una letra minúscula",
    })
    .refine(val => /[0-9]/.test(val), {
      message:
        "La confirmación de la contraseña debe contener al menos un número",
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message:
        'La confirmación de la contraseña debe contener al menos un carácter especial !@#$%^&*(),.?":{}|<></>',
    }),
})

type userData = z.infer<typeof userSchema>

export { userSchema, type userData }
