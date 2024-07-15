import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemRequest } from '../actions/itemActions';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addItemRequest({ name, description, quantity }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextField label="Item Name" value={name} onChange={e => setName(e.target.value)} required />
      <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <TextField label="Quantity" type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
      <Button variant="contained" color="primary" type="submit">Add Task</Button>
    </FormContainer>
  );
};

export default AddItem;
