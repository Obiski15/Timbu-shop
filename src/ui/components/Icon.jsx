import styled from "styled-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Image = styled.button`
  padding: 1rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: relative;

  &:disabled {
    cursor: pointer;
  }

  &:hover {
    background-color: hsla(28, 100%, 51%, 0.6);
  }

  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
  }
`;

const Icon = forwardRef(
  ({ Svg, onClick, fill, disabled, bgColor, ...props }, ref) => (
    <Image
      ref={ref}
      {...props}
      disabled={disabled}
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
    >
      <Svg fill={fill} />
    </Image>
  )
);

Icon.propTypes = {
  bgColor: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  fill: PropTypes.string,
  Svg: PropTypes.func,
};

Icon.displayName = "Icon";

export default Icon;
