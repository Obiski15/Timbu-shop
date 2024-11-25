import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";

import { useForgotPassword } from "../services/auth/useForgotPassword";

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
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;

  & > button {
    float: right;
  }
`;

function ForgotPassword() {
  const [isActive, setIsActive] = useState("");
  const { forgotPassword, isLoading } = useForgotPassword();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

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
          placeholder="Enter email address"
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
          disabled={isLoading}
          label="email address"
          required={true}
          autocomplete="email"
        />

        <ButtonWrapper>
          {!isLoading ? (
            <Button type="small" disabled={isLoading}>
              confirm
            </Button>
          ) : (
            <Spinner />
          )}
        </ButtonWrapper>
      </Form>
    </AuthLayout>
  );
}

export default ForgotPassword;
