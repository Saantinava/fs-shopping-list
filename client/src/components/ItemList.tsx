import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { fetchItemsRequest, Item } from '../actions/itemActions';
import { RootState } from '../store';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 'auto',
  },
  emptyList: {
    textAlign: 'center',
    margin: '20px',
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
  },
});

const ItemList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items);

  useEffect(() => {
    dispatch(fetchItemsRequest());
  }, [dispatch]);

  if (items.length === 0) {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.emptyList}>
          <Typography variant="h5" component="h2">
            Your shopping list is empty :(
          </Typography>
          <Button variant="contained" color="primary">
            Add your first item
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <ul className={classes.itemList}>
      {items.map((item: Item) => (
        <li key={item.id} className={classes.item}>
          <span>{item.name}</span>
          <span>{item.quantity}</span>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
