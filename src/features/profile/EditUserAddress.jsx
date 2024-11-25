import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useUpdateAddress } from "../../services/user/useUpdateAddress";
import { useUser } from "../../services/user/useUser";

import Input from "../../ui/components/Input";

const StyledEditUserAddress = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const EditUserAddress = forwardRef((props, ref) => {
  const { closeModal } = { ...props };

  const { updateAddress, isUpdatingAddress } = useUpdateAddress();
  const { user } = useUser();
  const [isActive, setIsActive] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
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
        disabled={isUpdatingAddress}
        label="city"
      />
      <button ref={ref} hidden disabled={isUpdatingAddress}></button>
    </StyledEditUserAddress>
  );
});

EditUserAddress.displayName = "EditUserAddress";

export default EditUserAddress;
