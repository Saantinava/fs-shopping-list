import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemRequest } from "../actions/itemActions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ModalHeader, ModalTile, PrimaryTextField } from "./AddItem";
import { PrimaryCTA, SecondaryCTA } from "./ItemList";

interface EditItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    quantity: number;
  };
  open: boolean;
  onClose: () => void;
}

const EditItem: React.FC<EditItemProps> = ({ item, open, onClose }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateItemRequest({ ...item, name, description, quantity }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <ModalHeader>SHOPPING LIST</ModalHeader>
      <DialogTitle
        style={{ margin: "0", padding: "1.8rem 1.5rem 0.2rem 1.5rem" }}
      >
        Edit an Item
      </DialogTitle>
      <DialogContentText style={{ padding: "0 1.5rem", margin: "0" }}>
        Edit your item below
      </DialogContentText>
      <DialogContent>
        <PrimaryTextField
          value={name}
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
          placeholder={name}
          fullWidth
        />
        <PrimaryTextField
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setDescription(e.target.value)
          }
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
      <DialogActions style={{ padding: "1.8rem 1.5rem"}}>
        <SecondaryCTA onClick={onClose} color="primary">
          Cancel
        </SecondaryCTA>
        <PrimaryCTA onClick={handleSubmit} color="primary">
          Save Item
        </PrimaryCTA>
      </DialogActions>
      <ModalTile />
    </Dialog>
  );
};

export default EditItem;
