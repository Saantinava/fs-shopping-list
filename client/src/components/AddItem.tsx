import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemRequest } from "../actions/itemActions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  TextFieldProps,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import { PrimaryCTA, SecondaryCTA } from "./ItemList";
import styled from "styled-components";

interface AddItemProps {
  label: string;
}

export const ModalHeader = styled.header`
  background-color: #fafafa;
  color: #000;
  padding: 1.6rem 1.5rem;
  text-align: left;
  font-size: 1.4rem;
  font-family: "Dosis", sans-serif;
`;

export const ModalTile = styled.div`
  background-color: #4c81B7;
  height: 6px;
  width: 100%;
`;



export const PrimaryTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  textTransform: "none",
  margin: "1rem 0 !important",
}));
const AddItem = ({ label }: AddItemProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>();
  const dispatch = useDispatch();

  const resetInputs = () => {
    setName("");
    setDescription("");
    setQuantity(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addItemRequest({ name, description, quantity: quantity || 1 }));
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetInputs();
    setOpen(false);
  };

  return (
    <>
      <PrimaryCTA variant="contained" color="primary" onClick={handleClickOpen}>
        {label}
      </PrimaryCTA>
      <Dialog open={open} onClose={handleClose}>
        <ModalHeader>SHOPPING LIST</ModalHeader>
        <DialogTitle>Add an Item</DialogTitle>
        <DialogContentText style={{ padding: "0 1.5rem", margin: "0" }}>
          Add your new item below
        </DialogContentText>
        <DialogContent style={{ gap: "1rem 0" }}>
          <PrimaryTextField
            label="Item Name"
            value={name}
            onChange={(
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setName(e.target.value)}
            required
            fullWidth
          />
          <PrimaryTextField
            label="Description"
            value={description}
            onChange={(
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="quantity-select-label">How many?</InputLabel>
            <Select
              labelId="quantity-select-label"
              aria-label="How many?"
              id="quantity-simple-select"
              value={quantity}
              onChange={(e: SelectChangeEvent<number>) =>
                setQuantity(Number(e.target.value))
              }
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <SecondaryCTA onClick={handleClose} color="primary">
            Cancel
          </SecondaryCTA>
          <PrimaryCTA onClick={handleSubmit} color="primary">
            Add Task
          </PrimaryCTA>
        </DialogActions>
        <ModalTile />
      </Dialog>
    </>
  );
};

export default AddItem;
