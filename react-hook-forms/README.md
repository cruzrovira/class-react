# Formularios con React Hook Form + TypeScript + Zod

Este proyecto es un ejemplo de implementación de formularios en React utilizando:

- ⚛️ **React Hook Form** para el manejo de formularios
- 🏷️ **TypeScript** para tipado estático
- 🛡️ **Zod** para validación de esquemas
- 🎨 **Tailwind CSS** para estilos

## 🚀 Características

- ✅ Validación de formularios con mensajes de error personalizados
- 🔄 Componente de entrada reutilizable (`CustomInput`)
- 🏗️ Estructura de proyecto escalable
- 🧪 Validación con esquemas usando Zod
- 📱 Diseño responsive con Tailwind CSS

## 🛠️ Estructura del Proyecto

```
src/
├── components/
│   ├── customForm/     # Componente principal del formulario
│   └── customInput/    # Componente de entrada reutilizable
├── models/
│   └── type-userData.ts # Esquemas de validación y tipos
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada de la aplicación
```

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/react-hook-forms.git
   cd react-hook-forms
   ```

2. Instala las dependencias con pnpm:

   ```bash
   pnpm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

## 🛠 Uso

### 1. Definición del esquema con Zod

```typescript
// src/models/type-userData.ts
import { z } from "zod"

export const userSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .nonempty("El nombre es obligatorio")
      .min(5, "El nombre debe tener al menos 5 caracteres"),
    lastName: z.string().optional(),
    email: z
      .string()
      .email("Email inválido")
      .nonempty("El email es obligatorio"),
    age: z
      .string()
      .refine(val => !isNaN(Number(val)), {
        message: "La edad debe ser un número",
      })
      .refine(val => Number(val) >= 18, {
        message: "Debes ser mayor de 18 años",
      }),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export type userData = z.infer<typeof userSchema>
```

### 2. Componente de Entrada Reutilizable

```tsx
// src/components/customInput/customInput.tsx
import type { FieldError, UseFormRegister } from "react-hook-form"
import type { userData } from "../../models/type-userData"

interface CustomInputProps {
  name: keyof userData
  label: string
  type?: "text" | "email" | "password" | "number"
  register: UseFormRegister<userData>
  error?: FieldError
}

const CustomInput = ({
  label,
  name,
  type = "text",
  register,
  error,
}: CustomInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1">
        {label}:
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className="w-full p-2 border rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  )
}

export default CustomInput
```

### 3. Implementación del Formulario

```tsx
// src/components/customForm/customForm.tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { userSchema, type userData } from "../../models/type-userData"
import CustomInput from "../customInput/customInput"

const CustomForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit: SubmitHandler<userData> = (data: userData) => {
    console.log("Datos del formulario:", data)
    // Aquí iría la lógica para enviar los datos
  }

  const onReset = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md p-6 mx-auto mt-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-center">
        Registro de Usuario
      </h2>

      <CustomInput
        label="Nombre"
        name="firstName"
        type="text"
        register={register}
        error={errors.firstName}
      />

      {/* Más campos del formulario... */}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Limpiar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </form>
  )
}

export default CustomForm
```

## 📚 Dependencias Principales

- `react-hook-form`: Para el manejo de formularios
- `zod`: Para la validación de esquemas
- `@hookform/resolvers`: Para integrar Zod con React Hook Form
- `tailwindcss`: Para estilos
- `typescript`: Para tipado estático

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](./../LICENSE) para más detalles.

## 🔗 Recursos Adicionales

- [Documentación de React Hook Form](https://react-hook-form.com/)
- [Documentación de Zod](https://zod.dev/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/)
