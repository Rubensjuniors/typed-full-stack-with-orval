import { randomUUID } from 'crypto'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

interface IUser {
  id: string
  name: string
}

const users: IUser[] = []

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        operationId: 'createUser',
        description: 'Create user.',
        body: z.object({
          name: z.string(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.body

      users.push({
        id: randomUUID(),
        name,
      })

      return reply.status(201).send()
    },
  )

  app.get(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        operationId: 'getUser',
        description: 'Get an user.',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const user = users.find(({ id: userId }) => userId === id)

      if (!user) {
        return reply.status(404).send({ message: 'User No exist' })
      }

      return user
    },
  )
  app.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        operationId: 'getUsers',
        description: 'List users.',
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          ),
        },
      },
    },
    () => {
      return users
    },
  )
}
