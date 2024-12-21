import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, ref, string } from "yup";
import styled from "styled-components";
import { useState } from "react";

import { useResetPassword } from "../services/auth/useResetPassword";

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

function ResetPassword() {
  const { resetPassword, isLoading } = useResetPassword();
  const [isActive, setIsActive] = useState("");
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const schema = object({
    password: string()
      .min(8, "Minimum password length is 8")
      .required("Password field is required"),
    confirmPassword: string()
      .min(8, "Minimum password length is 8")
      .oneOf([ref("password")], "Passwords must match")
      .required("Kindly confirm your password"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
          <Button type="small" disabled={isLoading}>
            {!isLoading ? "resetting.." : "reset"}
          </Button>
        </ButtonWrapper>
      </Form>
    </AuthLayout>
  );
}

export default ResetPassword;
