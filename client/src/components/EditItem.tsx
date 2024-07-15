import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItemRequest } from '../actions/itemActions';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

interface EditItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    quantity: number;
  };
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EditItem: React.FC<EditItemProps> = ({ item }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateItemRequest({ ...item, name, description, quantity }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextField label="Item Name" value={name} onChange={e => setName(e.target.value)} required />
      <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <TextField label="Quantity" type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
      <Button variant="contained" color="primary" type="submit">Save Item</Button>
    </FormContainer>
  );
};

export default EditItem;
