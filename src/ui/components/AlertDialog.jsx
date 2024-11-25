import { cloneElement, createContext, useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import Button from "./Button";

const StyledAlertDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin: 0 1rem;
  background-color: var(--backdrop);
  backdrop-filter: blur(4px);
`;

const modalAnimate = keyframes`
  from {
    height: 0;
  } to {
    height: auto;
  }
`;

const Dialog = styled.div`
  position: relative;
  width: 100%;
  max-height: 300px;
  max-width: 300px;
  overflow: hidden;
  border-radius: 0.5rem;
  padding: 0 2rem;
  background-color: var(--modal-background);
  animation: ${modalAnimate} 0.2s ease-in;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding-bottom: 2rem;
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
  align-self: center;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DialogContext = createContext();

function AlertDialog({ children }) {
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
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  );
}

function Open({ modalName, children }) {
  const { open, close, isOpen } = useContext(DialogContext);

  function handleOpenModal(e) {
    e.stopPropagation();
    modalName !== isOpen ? open(modalName) : close();
  }

  return cloneElement(children, { onClick: handleOpenModal });
}

function Window({ children, modalName, cb, buttonText }) {
  const { isOpen, close } = useContext(DialogContext);

  if (!modalName) return;

  if (modalName === isOpen)
    return createPortal(
      <StyledAlertDialog id="modal">
        <Dialog>
          <StyledCloseModal>
            <MdClose onClick={close} />
          </StyledCloseModal>

          <Main>
            <StyledWindow>
              {cloneElement(children, { closeModal: close })}
            </StyledWindow>

            <Button
              full={true}
              onClick={(e) => {
                e.stopPropagation();
                cb?.();
                close();
              }}
            >
              {buttonText}
            </Button>
          </Main>
        </Dialog>
      </StyledAlertDialog>,
      document.body
    );
}

AlertDialog.Window = Window;
AlertDialog.Open = Open;

AlertDialog.propTypes = {
  children: PropTypes.node.isRequired,
};

Window.propTypes = {
  modalName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default AlertDialog;
