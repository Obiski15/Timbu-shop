import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Logo({ theme }) {
  const navigate = useNavigate();
  return (
    <img
      src={theme === "dark" ? "/dark-logo.svg" : "/light-logo.svg"}
      alt="application-logo"
      onClick={() => navigate("/")}
    />
  );
}

Logo.propTypes = {
  theme: PropTypes.string,
  onClick: PropTypes.func,
};

export default Logo;
