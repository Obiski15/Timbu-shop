import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { object, string } from "yup";
import { useState } from "react";

import { useForgotPassword } from "../services/auth/useForgotPassword";

import AuthLayout from "../ui/layouts/AuthLayout";
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
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;

  & > button {
    float: right;
  }
`;

function ForgotPassword() {
  const { forgotPassword, isLoading } = useForgotPassword();
  const [isActive, setIsActive] = useState("");

  const schema = object({
    email: string()
      .matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$", {
        message: "Kindly provide a valid email address",
      })
      .lowercase()
      .required("Kindly your email address"),
  });

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleActiveInput(field) {
    setIsActive(field);
  }

  function onSubmit({ email }) {
    forgotPassword(email, {
      onSuccess: () => reset(),
    });
  }

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email address"
          register={{
            ...register("email", {
              onBlur: () => {
                handleActiveInput("");
              },
            }),
          }}
          error={errors?.email?.message}
          isActive={isActive}
          handleActiveInput={() => handleActiveInput("email")}
          disabled={isLoading}
          label="email address"
          required={true}
          autocomplete="email"
        />

        <ButtonWrapper>
          <Button type="small" disabled={isLoading}>
            {!isLoading ? "Loading..." : "confirm"}
          </Button>
        </ButtonWrapper>
      </Form>
    </AuthLayout>
  );
}

export default ForgotPassword;
