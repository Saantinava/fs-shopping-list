import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonProps,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  fetchItemsRequest,
  deleteItemRequest,
  Item,
} from "../actions/itemActions";
import { RootState } from "../store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditItem from "./EditItem";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import AddItem from "./AddItem";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: "auto",
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  emptyList: {
    textAlign: "center",
    margin: "20px",
  },
  itemList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.6rem 1.6rem",
    margin: "1rem 0",
    border: "2px solid #EAEFF4",
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
    "& > div:first-child": {
      flex: 1,
    },
  },
});

export const PrimaryCTA = styled((props: ButtonProps) => <Button {...props} />)(
  ({ theme }) => ({
    backgroundColor: "#1771E8",
    fontSize: "1rem",
    padding: "0.6rem 1.1rem",
    color: "#fff",
    borderRadius: 5,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#145bb5",
    },
  })
);

export const SecondaryCTA = styled(PrimaryCTA)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  border: "none",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
}));

const ItemList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {
    dispatch(fetchItemsRequest());
  }, [dispatch]);

  const handleEditClick = (item: Item) => {
    setCurrentItem(item);
    setEditOpen(true);
  };

  const handleDeleteClick = (item: Item) => {
    setCurrentItem(item);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentItem) {
      dispatch(deleteItemRequest(currentItem.id));
    }
    setDeleteOpen(false);
  };

  if (items.length === 0) {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.emptyList}>
          <Typography variant="h5" component="h2" style={{ margin: "2rem", color: "grey"}}>
            Your shopping list is empty :(
          </Typography>
          <AddItem label="Add your first item" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <ul className={classes.itemList}>
        {items.map((item: Item) => (
          <li key={item.id} className={classes.item}>
            <div>
              <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.description}
              </Typography>
            </div>
            <div>
              <IconButton onClick={() => handleEditClick(item)} color="default">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteClick(item)}
                color="default"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
      {currentItem && (
        <EditItem
          item={currentItem}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle style={{ padding: "2rem" }}>Delete Item?</DialogTitle>
        <DialogContent style={{ padding: "0 2rem 4rem 2rem", color: "grey" }}>
          Are you sure you want to delete this item? This cannot be undone.
        </DialogContent>
        <DialogActions>
          <SecondaryCTA onClick={() => setDeleteOpen(false)} color="primary">
            Cancel
          </SecondaryCTA>
          <PrimaryCTA onClick={handleDeleteConfirm} color="primary">
            Delete
          </PrimaryCTA>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemList;
