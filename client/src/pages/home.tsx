import { useEffect, useState } from "react";
import { User } from "../types/user";

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    fetch("http://localhost:5050/users", {
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((result) => setUsers(result));
  }, []);
  return (
    <>
      {!users && <p>We dont have any users right now.</p>}
      {users &&
        users.map((user) => {
          return (
            <>
              <li>name: {user.name}</li>
              <li>family: {user.family}</li>
              <li>age: {user.age}</li>
            </>
          );
        })}
    </>
  );
}
