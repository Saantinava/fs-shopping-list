import React from 'react';
import AddItem from '../components/AddItem';
import ItemList from '../components/ItemList';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Home = () => (
  <Container>
    <h1>Shopping List</h1>
    <AddItem />
    <ItemList />
  </Container>
);

export default Home;
