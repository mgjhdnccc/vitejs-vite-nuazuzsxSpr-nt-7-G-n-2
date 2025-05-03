import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const found = res.data.find(
          (item) => item.email === form.email && item.password === form.password
        );
        if (found) {
          history.push("/main");
        } else {
          history.push("/error");
        }
      })
      .catch((err) => {
        console.error("Login isteği başarısız:", err);
        history.push("/error");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}

        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"

          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}

        />
      </FormGroup>

      <FormGroup check>
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          checked={form.terms}
          onChange={handleChange}
        />
        <Label check for="terms">
          I agree to terms and conditions
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" type="submit" disabled={!form.terms}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
