import styled from "styled-components";

import copyright from "../assets/icons/copyright.svg";
import Logo from "./Logo";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: #22252a;
  color: #f8f7f7;
`;

const Wrapper = styled.div`
  padding: 48px 0px 46px 0px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3.2rem;
`;

const Main = styled.div`
  width: 100%;
  padding: 20px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 152px;
`;

const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.1rem;
`;

const LinksWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 0px 16px 0px 16px;
`;

const Links = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0px 16px 0px 16px;

  & p {
    text-transform: capitalize;
    font-weight: 500;
    line-height: 2.4rem;
    font-size: 1.6rem;
    text-align: left;
    &:hover {
      text-decoration: underline;
      cursor: default;
    }
  }
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
`;

function Footer() {
  return (
    <StyledFooter>
      <Wrapper>
        <Main>
          <Logo />
          <LinksWrapper>
            <Links>
              <p>contact us</p>
              <p>FAQ</p>
              <p>service center</p>
              <p>report a product</p>
            </Links>
            <Links>
              <p>help center</p>
              <p>dispute policy</p>
              <p>return policy</p>
              <p>chat with us</p>
            </Links>
            <Links>
              <p>privacy notice</p>
              <p>cookie notice</p>
              <p>official stores</p>
              <p>flash sales</p>
            </Links>
            <Links>
              <p>payment and deliveries</p>
              <p>be a sales consultant</p>
              <p>service partners</p>
              <p>our locations</p>
            </Links>
          </LinksWrapper>
        </Main>

        <Copyright>
          <Img src={copyright} alt="copyright-icon" />
          <div>
            <span>All rights reserved, Ruvid Store, </span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </Copyright>
      </Wrapper>
    </StyledFooter>
  );
}

export default Footer;
