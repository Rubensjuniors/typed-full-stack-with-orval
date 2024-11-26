import CreateUser from "./CreateUser"
import { useGetUsers } from "./http/generated/users/users"

function App() {
  const { data: users } = useGetUsers()
  return (
    <>
    <ul>
        {users?.data.map(u => {
          return (
            <li key={u.id}>{u.name}</li>
          )
        })}
    </ul>

    <CreateUser />
    </>
  )
}

export default App
