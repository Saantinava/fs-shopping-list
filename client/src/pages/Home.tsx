import React from "react";
import AddItem from "../components/AddItem";
import ItemList from "../components/ItemList";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Container = styled.div`
  padding: 0;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Header = styled.header`
  background-color: #3e6b98;
  color: white;
  padding: 1rem;
  text-align: left;
  font-size: 1.5rem;
  font-family: "Dosis", sans-serif;
`;

const Body = styled.body`
  padding: 4rem 5rem;
  background: none;
`;

const Title = styled.div`
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TitleLabel = styled.h4`
  align-items: space-between;
  font-size: 1.4rem;
  font-family: "Nunito", sans-serif;
  margin: 0.6rem;
`;

const Home = () => {
  const items = useSelector((state: RootState) => state.items);

  return (
    <Container>
      <Header>SHOPPING LIST</Header>
      <Body>
        {items?.length > 0 && (
          <Title>
            <TitleLabel>Your Items</TitleLabel>
            <AddItem label="Add item" />
          </Title>
        )}
        <ItemList />
      </Body>
    </Container>
  );
};

export default Home;
