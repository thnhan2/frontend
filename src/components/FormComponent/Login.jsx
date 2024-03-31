import { useState } from "react";
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useNavigate } from "react-router-dom";


const fields = loginFields;

let fieldsState = {};
fields.forEach((field) => {
  fieldsState[field.id] = "";
});

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
    const history = useNavigate();
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

const authenticateUser = () => {
    const endpoint = `http://localhost:5000/api/auth/login`;
    const { name, password } = loginState;
    console.log(name + " " + password);
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            history("/home");
        })
        .catch((error) => console.log(error)); // Fix: Add a comma after the catch block
};

  return (
    <div>

    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
          key={field.id}
          handleChange={handleChange}
          value={loginState[field.id]}
          labelText={field.labelText}
          labelFor={field.labelFor}
          id={field.id}
          name={field.name}
          type={field.type}
          isRequired={field.isRequired}
          placeholder={field.placeholder}
          />
          ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
          </div>
  );
}
