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
    console.log(data)
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      <CustomInput
        label="Nombre"
        name="firstName"
        type="text"
        register={register}
        error={errors.firstName}
      />

      <CustomInput
        label="Apellido"
        name="lastName"
        type="text"
        register={register}
        error={errors.lastName}
      />
      <CustomInput
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
      />
      <CustomInput
        label="Edad"
        name="age"
        type="number"
        register={register}
        error={errors.age}
      />
      <CustomInput
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
      />
      <CustomInput
        label="Confirmar Password"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword}
      />

      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="w-full rounded  outline p-2
              bg-sky-800 text-white hover:outline-sky-800 hover:outline-2"
        >
          Enviar
        </button>
        <button
          type="reset"
          onClick={onReset}
          className="w-full rounded  outline p-2
              bg-sky-800 text-white hover:outline-sky-800 hover:outline-2"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default CustomForm
