import { useContext } from "react";

import { ModalContext } from "../ui/components/Modal";

export function useModal() {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error("modal is being accessed outside of it's provider ");

  return { openModal: context.open, closeModal: context.close };
}
