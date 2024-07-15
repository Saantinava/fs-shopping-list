import { makeStyles } from '@mui/styles';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemRequest, Item } from '../actions/itemActions';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const ItemForm: React.FC = () => {
  const classes = useStyles();
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
      <DialogContent className={classes.form}>
        <TextField
          name="name"
          label="Item Name"
          value={item.name}
          onChange={handleChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          value={item.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <TextField
          name="quantity"
          label="How many?"
          type="number"
          value={item.quantity}
          onChange={handleChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Add Task
        </Button>
        <Button onClick={() => {}} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemForm;
