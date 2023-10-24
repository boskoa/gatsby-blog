import { Link } from "gatsby";
import * as React from "react";
import "../styles/global.css";
import styled from "styled-components";
import Header from "./Header";

const StyledContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const StyledNav = styled.nav`
  background-color: black;
  height: 50px;
  padding: 0 20px;
`;

const StyledNavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
  height: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
`;

const StyledMain = styled.main`
  margin: 20px;
`;

const StyledTitle = styled.h1`
  color: purple;
  margin-bottom: 20px;
`;

function Layout({ pageTitle, children }) {
  return (
    <StyledContainer>
      <Header />
      <StyledNav>
        <StyledNavList>
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink to="/about">About</StyledLink>
          </li>
        </StyledNavList>
      </StyledNav>
      <StyledMain>
        <StyledTitle>{pageTitle}</StyledTitle>
        {children}
      </StyledMain>
    </StyledContainer>
  );
}

export default Layout;
