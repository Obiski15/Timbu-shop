import { cloneElement, createContext, useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { useOutsideClick } from "../../hooks/useOutsideClick";

import Button from "./Button";

const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background-color: var(--backdrop);
  backdrop-filter: blur(4px);
`;

const modalAnimate = keyframes`
  from {
    height: 0;
  } to {
    height: 400px;
  }
`;

const StyledModal = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 400px;
  max-width: 500px;
  overflow: hidden;
  border-radius: 0.5rem;
  padding: 0 2rem;
  background-color: var(--modal-background);
  animation: ${modalAnimate} 0.2s ease-in;
`;

const StyledCloseModal = styled.div`
  height: 24px;
  margin-top: 2rem;
  margin-bottom: 1rem;

  & > svg {
    position: absolute;
    right: 1rem;
    width: 24px;
    height: 24px;
  }
`;

const StyledWindow = styled.div`
  height: 290px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState("");

  function close() {
    document.getElementById("modal").firstChild.classList.add("modal-fade-out");

    setTimeout(() => {
      setIsOpen("");
      document
        .getElementById("modal")
        .firstChild.classList.remove("modal-fade-out");
    }, 190);
  }

  const open = setIsOpen;

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ modalName, children }) {
  const { open, close, isOpen } = useContext(ModalContext);

  function handleOpenModal(e) {
    e.stopPropagation();
    modalName !== isOpen ? open(modalName) : close();
  }

  return cloneElement(children, { onClick: handleOpenModal });
}

function Window({ children, modalName, cb }) {
  const { isOpen, close } = useContext(ModalContext);
  const ref = useOutsideClick(isOpen, close, true);

  if (!modalName) return;

  if (modalName === isOpen)
    return createPortal(
      <StyledModalWrapper id="modal">
        <StyledModal ref={ref}>
          <StyledCloseModal>
            <MdClose onClick={close} />
          </StyledCloseModal>
          <StyledWindow>
            {cloneElement(children, { closeModal: close })}
          </StyledWindow>

          <StyledActionButtons>
            <Button
              variant="destructive"
              type="small"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              cancel
            </Button>
            <Button
              type="small"
              onClick={() => {
                cb?.();
              }}
            >
              confirm
            </Button>
          </StyledActionButtons>
        </StyledModal>
      </StyledModalWrapper>,
      document.body
    );
}

Modal.Window = Window;
Modal.Open = Open;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

Window.propTypes = {
  modalName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
