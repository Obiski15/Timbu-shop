import { cloneElement, createContext, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledWidow = styled.div`
  background-color: transparent;
  box-shadow: #64646f33 0px 7px 29px 0px;
  position: fixed;
  width: 120px;
  z-index: 9999;

  ${(props) => css`
    top: ${props.position.y}px;
    right: ${props.position.x}px;
  `}
`;

const StyledList = styled.div`
  border-radius: 0.8rem;
  background-color: #f2f1f0;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > button:first-child {
    border-radius: 0.8rem 0.8rem 0 0;
  }

  & > button:last-child {
    border-radius: 0 0 0.8rem 0.8rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0 1rem 0 1rem;
  text-transform: capitalize;
  font-size: 1.4rem;
  text-align: left;
  color: var(--text-color);
  font-weight: 400;
  line-height: 3.2rem;

  &:hover {
    background-color: var(--secondary-color);
    color: var(--background-color);
  }
`;

const DropdownContext = createContext();

function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState("");
  const [position, setPosition] = useState({});

  const open = setIsOpen;

  function close() {
    setIsOpen("");
  }

  return (
    <DropdownContext.Provider
      value={{ open, close, isOpen, position, setPosition }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

function DropButton({ name, children }) {
  const { isOpen, open, close, setPosition } = useContext(DropdownContext);

  function handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.right - rect.width,
      y: rect.bottom + 20,
    });
    isOpen === name ? close() : open(name);
  }

  return cloneElement(children, { onClick: handleClick });
}

function List({ children }) {
  return <StyledList>{children}</StyledList>;
}

function Window({ name, children }) {
  const { isOpen, position, close } = useContext(DropdownContext);
  const ref = useOutsideClick(close);

  if (!name || name !== isOpen) return null;

  return createPortal(
    <StyledWidow ref={ref} position={position}>
      {children}
    </StyledWidow>,
    document.body
  );
}

Window.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.any,
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

DropButton.propTypes = {
  name: PropTypes.any,
};

List.propTypes = {
  children: PropTypes.node.isRequired,
};

Dropdown.Window = Window;
Dropdown.DropButton = DropButton;
Dropdown.Button = Button;
Dropdown.List = List;

export default Dropdown;
