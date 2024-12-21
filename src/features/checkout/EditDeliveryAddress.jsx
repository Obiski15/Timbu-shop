import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { object, string } from "yup";
import toast from "react-hot-toast";

import { useUpdateShippingAddress } from "../../services/user/useUpdateShippingAddress";
import { useUser } from "../../services/user/useUser";
import { useModal } from "../../hooks/useModal";

import Input from "../../ui/components/Input";

const StyledEditDeliveryAddress = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const EditDeliveryAddress = forwardRef((_, ref) => {
  const { closeModal } = useModal();
  const { updateUserShippingAddress, isUpdatingAddress } =
    useUpdateShippingAddress();
  const [isActive, setIsActive] = useState("");
  const { user } = useUser();

  const schema = object({
    shippingAddress: object({
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
      postalCode: string()
        .trim()
        .min(4, "Minimum length is 4")
        .max(6, "Maximum length is 6")
        .required("kindly provide a valid postal code"),
      additionalInfo: string()
        .lowercase()
        .trim()
        .max(100, "Maximum length is 100 characters")
        .nullable(),
    }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
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
    <StyledEditDeliveryAddress onSubmit={handleSubmit(onSubmit)}>
      <Input
        required={true}
        type="text"
        id="delivery-address"
        name="delivery-address"
        placeholder="e.g 25, Micheal Ayorinde Street"
        register={{
          ...register("shippingAddress.address", {
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
