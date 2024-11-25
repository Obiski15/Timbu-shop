import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";

import { useSignup } from "../services/auth/useSignup";

import AuthLayout from "../ui/layouts/AuthLayout";
import Spinner from "../ui/components/Spinner";
import Button from "../ui/components/Button";
import Input from "../ui/components/Input";

const TabNum = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  margin-bottom: 1rem;

  & > p {
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    position: relative;

    & > span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

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

const Tabs = styled.div`
  width: 100%;
  position: relative;
  height: 200px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.div`
  transition: all 1s;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  position: absolute;
  top: 0;
`;

const UserInfo = styled(Tab)``;

const UserAddress = styled(Tab)``;

const RegionCityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const UserCredentials = styled(Tab)``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;

  & > div {
    &:first-child {
      float: left;
    }
    &:last-child {
      float: right;
    }
  }
`;

const AccountConfirmation = styled.p`
  font-size: 1.2rem;
  align-self: center;
`;

function Signup() {
  const [activeTab, setActiveTab] = useState(1);
  const [isActive, setIsActive] = useState("");
  const { signup, isSigningUp } = useSignup();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleActiveInput(field) {
    setIsActive(field);
  }

  function onSubmit(data) {
    signup({ ...data }, { onSuccess: () => navigate("/") });
  }

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TabNum>
          {Array.from({ length: 3 }, (_, i) => (
            <p
              key={i + 1}
              style={{
                backgroundColor:
                  i + 1 <= activeTab
                    ? `${
                        (errors?.email?.message ||
                          errors?.firstNameName?.message ||
                          errors?.lastName?.message) &&
                        i + 1 === 1
                          ? "var(--destructive)"
                          : (errors?.userAddress?.region?.message ||
                              errors?.userAddress?.city?.message ||
                              errors?.userAddress?.address?.message ||
                              errors?.userAddress?.country?.message) &&
                            i + 1 === 2
                          ? "var(--destructive)"
                          : (errors?.tel?.message ||
                              errors?.password?.message ||
                              errors?.confirmPassword?.message) &&
                            i + 1 === 3
                          ? "var(--destructive)"
                          : "var(--secondary-color)"
                      }`
                    : "",
              }}
            >
              <span>{i + 1}</span>
            </p>
          ))}
        </TabNum>

        <Tabs>
          <UserInfo
            style={{ transform: `translate(${(1 - activeTab) * 100}%)` }}
          >
            <Input
              id="email"
              name="email"
              type="email"
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
              disabled={isSigningUp}
              label="email address"
              required={true}
              autocomplete="email"
            />
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="e.g obiski"
              register={{
                ...register("firstName", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                  onBlur: () => {
                    handleActiveInput("");
                  },
                }),
              }}
              error={errors?.firstName?.message}
              isActive={isActive}
              handleActiveInput={() => handleActiveInput("firstName")}
              disabled={isSigningUp}
              label="first name"
              required={true}
              autocomplete="given-name"
            />
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="e.g obiski"
              register={{
                ...register("lastName", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                  onBlur: () => {
                    handleActiveInput("");
                  },
                }),
              }}
              error={errors?.lastName?.message}
              isActive={isActive}
              handleActiveInput={() => handleActiveInput("lastName")}
              disabled={isSigningUp}
              label="last name"
              required={true}
              autocomplete="family-name"
            />
          </UserInfo>

          <UserAddress
            style={{ transform: `translate(${(2 - activeTab) * 100}%)` }}
          >
            <Input
              id="country"
              name="text"
              placeholder="Enter Country"
              register={{
                ...register("userAddress.country", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                  onBlur: () => {
                    handleActiveInput("");
                  },
                }),
              }}
              error={errors?.userAddress?.country?.message}
              isActive={isActive}
              handleActiveInput={() => handleActiveInput("country")}
              disabled={isSigningUp}
              label="country"
              required={true}
              autocomplete="country address-level1"
            />
            <RegionCityWrapper>
              <Input
                id="region"
                name="text"
                placeholder="Enter Region"
                register={{
                  ...register("userAddress.region", {
                    required: {
                      value: true,
                      message: "field is required",
                    },
                    onBlur: () => {
                      handleActiveInput("");
                    },
                  }),
                }}
                error={errors?.userAddress?.region?.message}
                isActive={isActive}
                handleActiveInput={() => handleActiveInput("region")}
                disabled={isSigningUp}
                label="region"
                required={true}
                autocomplete="address-level2"
              />
              <Input
                id="city"
                type="text"
                name="city"
                placeholder="e.g obiski"
                register={{
                  ...register("userAddress.city", {
                    required: {
                      value: true,
                      message: "field is required",
                    },
                    onBlur: () => {
                      handleActiveInput("");
                    },
                  }),
                }}
                error={errors?.userAddress?.city?.message}
                isActive={isActive}
                handleActiveInput={() => handleActiveInput("city")}
                disabled={isSigningUp}
                label="city"
                required={true}
                autocomplete="address-level2"
              />
            </RegionCityWrapper>

            <Input
              id="address"
              type="text"
              name="address"
              placeholder="e.g obiski"
              register={{
                ...register("userAddress.address", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                  onBlur: () => {
                    handleActiveInput("");
                  },
                }),
              }}
              error={errors?.userAddress?.address?.message}
              isActive={isActive}
              handleActiveInput={() => handleActiveInput("address")}
              disabled={isSigningUp}
              label="address"
              required={true}
              autocomplete="street-address address-line1"
            />
          </UserAddress>

          <UserCredentials
            style={{ transform: `translate(${(3 - activeTab) * 100}%)` }}
          >
            <Input
              id="tel"
              type="number"
              name="tel"
              placeholder="e.g obiski"
              register={{
                ...register("tel", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                  onBlur: () => {
                    handleActiveInput("");
                  },
                }),
              }}
              error={errors?.tel?.message}
              isActive={isActive}
              handleActiveInput={() => handleActiveInput("tel")}
              disabled={isSigningUp}
              label="tel"
              required={true}
              autocomplete="tel"
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
              disabled={isSigningUp}
              label="password"
              required={true}
              autocomplete="new-password"
            />
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              register={{
                ...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                  minLength: {
                    value: 8,
                    message: "minimum required length is 8",
                  },
                  validate: (val, formValues) =>
                    val === formValues.password || "password doesn't match",
                  onBlur: () => {
                    handleActiveInput("");
                  },
                }),
              }}
              error={errors?.confirmPassword?.message}
              isActive={isActive}
              handleActiveInput={() => handleActiveInput("confirmPassword")}
              disabled={isSigningUp}
              label="confirm password"
              required={true}
              autocomplete="new-password"
            />
          </UserCredentials>
        </Tabs>

        <ButtonWrapper>
          <div>
            {activeTab > 1 && activeTab <= 3 && (
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab((tab) => tab - 1);
                }}
              >
                Previous
              </Button>
            )}
          </div>

          <div>
            {activeTab < 3 ? (
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab((tab) => tab + 1);
                }}
              >
                Next
              </Button>
            ) : (
              <>
                {isSigningUp ? (
                  <Spinner />
                ) : (
                  <Button type="small">Sign up</Button>
                )}
              </>
            )}
          </div>
        </ButtonWrapper>

        <AccountConfirmation>
          Already have an account? <Link to="/login">login</Link>
        </AccountConfirmation>
      </Form>
    </AuthLayout>
  );
}

export default Signup;
