import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useQueryClient } from "@tanstack/react-query"
import { getGetUsersQueryKey, useCreateUser } from "./http/generated/users/users"

const createuserSchema = z.object({
  name: z.string().min(3)
})

type TypeCreateuserSchema = z.infer<typeof createuserSchema>


const CreateUser = () => {

  const queryClient = useQueryClient()

  const {
    handleSubmit,
    register,
    reset,
    formState: {
      errors
    }
  } = useForm<TypeCreateuserSchema>({
    resolver: zodResolver(createuserSchema)
  })

  const  { mutateAsync: createUser } = useCreateUser()

   function handlerCreateUser (data: TypeCreateuserSchema) {
    createUser({ data: { name: data.name } })
    queryClient.invalidateQueries({
      queryKey: getGetUsersQueryKey()
    })
    reset()
  }
  return (
    <form onSubmit={handleSubmit(handlerCreateUser)}>
      <input type="text" {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Criar User</button>
    </form>
  )
}

export default CreateUser