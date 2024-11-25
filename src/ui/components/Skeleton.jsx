import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
   opacity: 100%;
  }
  60% {
    opacity: 60%;
  }
  100% {
    opacity: 40%;
  }
`;

const overlay = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
`;

const Skeleton = styled.div`
  position: relative;
  display: inline-block;
  height: ${(props) => (props.height ? `${props.height}px` : "2rem")};
  width: 100%;
  max-width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  background: #d9d9d9;
  animation: ${shimmer} 1.3s infinite ease-in-out alternate;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    width: 0;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    animation: ${overlay} 3s 1s infinite linear forwards;
  }
`;

export default Skeleton;
