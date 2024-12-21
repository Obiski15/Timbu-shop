import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { object, string } from "yup";
import toast from "react-hot-toast";

import { useUpdateAddress } from "../../services/user/useUpdateAddress";
import { useUser } from "../../services/user/useUser";
import { useModal } from "../../hooks/useModal";

import Input from "../../ui/components/Input";

const StyledEditUserAddress = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const EditUserAddress = forwardRef((props, ref) => {
  const { closeModal } = useModal();

  const { updateAddress, isUpdatingAddress } = useUpdateAddress();
  const [isActive, setIsActive] = useState("");
  const { user } = useUser();

  const schema = object({
    userAddress: object({
      country: string()
        .lowercase()
        .trim()
        .required("kindly provide a country name"),
      region: string()
        .lowercase()
        .trim()
        .required("kindly provide a state/region name"),
      city: string()
        .lowercase()
        .trim()
        .required("kindly provide your city name"),
      address: string()
        .lowercase()
        .trim()
        .required("kindly provide your house address"),
    }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userAddress: { ...user?.data?.user?.userAddress },
    },
  });

  function handleActiveInput(value) {
    setIsActive(value);
  }

  function onSubmit(data) {
    if (
      Object.keys(data.userAddress).every(
        (key) => user?.data?.user?.userAddress?.[key] === data.userAddress[key]
      )
    )
      return;

    updateAddress({ ...data });

    toast.success("updating address...");
    closeModal();
  }

  return (
    <StyledEditUserAddress onSubmit={handleSubmit(onSubmit)} {...props}>
      <Input
        type="text"
        id="address"
        name="address"
        placeholder="e.g 25, Micheal Ayorinde Street"
        register={{
          ...register("userAddress.address", {
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.userAddress?.address?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("address")}
        disabled={isUpdatingAddress}
        label="Address"
        required={true}
      />
      <Input
        type="text"
        id="country"
        name="country"
        placeholder="Input Country"
        register={{
          ...register("userAddress.country", {
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.userAddress?.country?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("country")}
        disabled={isUpdatingAddress}
        label="country"
        required={true}
      />
      <Input
        type="text"
        id="region"
        name="region"
        placeholder="Input Region"
        register={{
          ...register("userAddress.region", {
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.userAddress?.region?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("region")}
        disabled={isUpdatingAddress}
        label="region"
        required={true}
      />
      <Input
        type="text"
        id="city"
        name="city"
        placeholder="City"
        register={{
          ...register("userAddress.city", {
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.userAddress?.city?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("city")}
        disabled={isUpdatingAddress}
        label="city"
      />
      <button ref={ref} hidden disabled={isUpdatingAddress}></button>
    </StyledEditUserAddress>
  );
});

EditUserAddress.displayName = "EditUserAddress";

export default EditUserAddress;
