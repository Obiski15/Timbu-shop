import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useUpdateShippingAddress } from "../../services/user/useUpdateShippingAddress";
import { useUser } from "../../services/user/useUser";

import Input from "../../ui/components/Input";
import toast from "react-hot-toast";

const StyledEditDeliveryAddress = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const EditDeliveryAddress = forwardRef((props, ref) => {
  const { closeModal } = { ...props };
  const { updateUserShippingAddress, isUpdatingAddress } =
    useUpdateShippingAddress();
  const { user } = useUser();
  const [isActive, setIsActive] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      shippingAddress: { ...user?.data?.user?.shippingAddress },
    },
  });

  function handleActiveInput(value) {
    setIsActive(value);
  }

  function onSubmit(data) {
    if (
      Object.keys(data.shippingAddress).every(
        (key) =>
          user?.data?.user?.shippingAddress?.[key] === data.shippingAddress[key]
      )
    )
      return;

    updateUserShippingAddress({ ...data });

    toast.success("updating shipping address...");
    closeModal();
  }

  return (
    <StyledEditDeliveryAddress onSubmit={handleSubmit(onSubmit)} {...props}>
      <Input
        required={true}
        type="text"
        id="delivery-address"
        name="delivery-address"
        placeholder="e.g 25, Micheal Ayorinde Street"
        register={{
          ...register("shippingAddress.address", {
            required: {
              value: true,
              message: "field is required",
            },
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.shippingAddress?.address?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("delivery-address")}
        disabled={isUpdatingAddress}
        label="Delivery Address"
      />
      <Input
        required={true}
        type="text"
        id="country"
        name="country"
        placeholder="Input Country"
        register={{
          ...register("shippingAddress.country", {
            required: {
              value: true,
              message: "field is required",
            },
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.shippingAddress?.country?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("country")}
        disabled={isUpdatingAddress}
        label="country"
      />
      <Input
        required={true}
        type="text"
        id="region"
        name="region"
        placeholder="Input Region"
        register={{
          ...register("shippingAddress.region", {
            required: {
              value: true,
              message: "field is required",
            },
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.shippingAddress?.region?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("region")}
        disabled={isUpdatingAddress}
        label="region"
      />
      <Input
        required={true}
        type="text"
        id="city"
        name="city"
        placeholder="City"
        register={{
          ...register("shippingAddress.city", {
            required: {
              value: true,
              message: "field is required",
            },
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.shippingAddress?.city?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("city")}
        disabled={isUpdatingAddress}
        label="city"
      />

      <Input
        required={true}
        id="postalCode"
        type="number"
        name="postalCode"
        placeholder="e.g 110027"
        register={{
          ...register("shippingAddress.postalCode", {
            required: {
              value: true,
              message: "field is required",
            },
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.shippingAddress?.postalCode?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("postalCode")}
        disabled={isUpdatingAddress}
        label="postal code"
      />
      <Input
        id="additional-information"
        type="text"
        name="additional-information"
        placeholder="Enter Additional Information"
        register={{
          ...register("shippingAddress.additionalInfo", {
            onBlur: () => {
              handleActiveInput("");
            },
          }),
        }}
        error={errors?.shippingAddress?.additionalInfo?.message}
        isActive={isActive}
        handleActiveInput={() => handleActiveInput("additional-information")}
        disabled={isUpdatingAddress}
        label="additional information"
      />
      <button ref={ref} hidden disabled={isUpdatingAddress}></button>
    </StyledEditDeliveryAddress>
  );
});

EditDeliveryAddress.displayName = "EditDeliveryAddress";

export default EditDeliveryAddress;
