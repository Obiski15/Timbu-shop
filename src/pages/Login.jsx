import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

import { useLogin } from "../services/auth/useLogin";

import AuthLayout from "../ui/layouts/AuthLayout";
import Spinner from "../ui/components/Spinner";
import Button from "../ui/components/Button";
import Input from "../ui/components/Input";

const Form = styled.form`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
`;

const AccountConfirmation = styled.p`
  font-size: 1.2rem;
  align-self: center;
`;

function Login() {
  const [isActive, setIsActive] = useState("");
  const { login, isLoggingIn } = useLogin();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleActiveInput(field) {
    setIsActive(field);
  }

  function onSubmit(data) {
    login({ ...data });
  }

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          name="email"
          placeholder="e.g. obiski15@gmail.com"
          register={{
            ...register("email", {
              required: {
                value: true,
                message: "field is required",
              },
              onBlur: () => {
                handleActiveInput("");
              },
            }),
          }}
          error={errors?.email?.message}
          isActive={isActive}
          handleActiveInput={() => handleActiveInput("email")}
          disabled={isLoggingIn}
          label="email"
          required={true}
          autocomplete="email"
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          register={{
            ...register("password", {
              required: {
                value: true,
                message: "field is required",
              },
              minLength: {
                value: 8,
                message: "minimum required length is 8",
              },
              onBlur: () => {
                handleActiveInput("");
              },
            }),
          }}
          error={errors?.password?.message}
          isActive={isActive}
          handleActiveInput={() => handleActiveInput("password")}
          disabled={isLoggingIn}
          label="password"
          required={true}
          autocomplete="current-password"
        />

        <ButtonWrapper>
          {!isLoggingIn ? (
            <Button type="small" disabled={isLoggingIn}>
              Login
            </Button>
          ) : (
            <Spinner />
          )}
        </ButtonWrapper>

        <AccountConfirmation>
          Don&apos;t have an account? <Link to="/signup">signup</Link>{" "}
          <Link to="/forgot-password">forgot password</Link>
        </AccountConfirmation>
      </Form>
    </AuthLayout>
  );
}

export default Login;
