import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";

import { useResetPassword } from "../services/auth/useResetPassword";

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

function ResetPassword() {
  const { resetPassword, isLoading } = useResetPassword();
  const [isActive, setIsActive] = useState("");
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function handleActiveInput(field) {
    setIsActive(field);
  }

  function onSubmit({ password, confirmPassword }) {
    resetPassword(
      { password, confirmPassword, resetToken },
      {
        onSuccess: () => {
          reset();
          navigate("/login");
        },
      }
    );
  }

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          register={{
            ...register("password", {
              required: {
                value: true,
                message: "password field is required",
              },
              onBlur: () => {
                handleActiveInput("");
              },
            }),
          }}
          error={errors?.password?.message}
          isActive={isActive}
          handleActiveInput={() => handleActiveInput("password")}
          disabled={isLoading}
          label="new password"
          required={true}
          autocomplete="new-password"
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          register={{
            ...register("confirmPassword", {
              required: {
                value: true,
                message: "kindly confirm your password",
              },
              minLength: {
                value: 8,
                message: "minimum required length is 8",
              },
              validate: (value, formValues) =>
                value === formValues.password || "password doesn't match",
              onBlur: () => {
                handleActiveInput("");
              },
            }),
          }}
          error={errors?.confirmPassword?.message}
          isActive={isActive}
          handleActiveInput={() => handleActiveInput("confirmPassword")}
          disabled={isLoading}
          label="confirm new password"
          required={true}
          autocomplete="new-password"
        />

        <ButtonWrapper>
          {!isLoading ? (
            <Button type="small" disabled={isLoading}>
              reset
            </Button>
          ) : (
            <Spinner />
          )}
        </ButtonWrapper>
      </Form>
    </AuthLayout>
  );
}

export default ResetPassword;
