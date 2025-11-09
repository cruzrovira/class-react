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
    <div>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className="w-full rounded  outline p-2 hover:outline-sky-800 hover:outline-2"
      />
      <p className="text-red-400 min-h-6">{error?.message}</p>
    </div>
  )
}

export default CustomInput
