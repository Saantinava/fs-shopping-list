import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemRequest, Item } from '../actions/itemActions';
import { PrimaryCTA, SecondaryCTA } from './ItemList';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const ItemForm: React.FC = () => {
  const dispatch = useDispatch();
  const [item, setItem] = React.useState<Partial<Item>>({ name: '', description: '', quantity: 0 });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(addItemRequest(item as Item));
  };

  return (
    <Dialog open={true}>
      <DialogTitle>Add an Item</DialogTitle>
      <DialogContent>
        <FormContainer>
          <TextField
            name="name"
            label="Item Name"
            value={item.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={item.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            name="quantity"
            label="How many?"
            type="number"
            value={item.quantity}
            onChange={handleChange}
            required
            fullWidth
          />
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <PrimaryCTA onClick={handleSubmit} color="primary">
          Add Task
        </PrimaryCTA>
        <SecondaryCTA onClick={() => {}} color="primary">
          Cancel
        </SecondaryCTA>
      </DialogActions>
    </Dialog>
  );
};

export default ItemForm;
