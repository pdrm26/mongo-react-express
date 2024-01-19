import { FormEvent, useRef } from "react";
import { User } from "../types/user";

export default function AddUser() {
  const nameRef = useRef<HTMLInputElement>();
  const familyRef = useRef<HTMLInputElement>();
  const ageRef = useRef<HTMLInputElement>();
  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const family = familyRef.current?.value;
    const age = Number(ageRef.current?.value);
    let newUser: User;
    if (name && family && age) {
      newUser = { name, family, age };
      fetch("http://localhost:5050/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      }).then((result) => {
        console.log(result);
      });
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        <label htmlFor="name">name: </label>
        <input type="text" name="name" id="name" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="family">family: </label>
        <input type="text" name="family" id="family" ref={familyRef} />
      </div>
      <div>
        <label htmlFor="age">age: </label>
        <input type="number" name="age" id="age" ref={ageRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
