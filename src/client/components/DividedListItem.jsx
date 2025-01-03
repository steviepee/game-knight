import React from 'react';
import PropTypes from 'prop-types'
import {
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function DividedListItem({
  element,
  index,
  collectionName,
  formValues,
  setFormValues,
}) {
// Handle delete of element in event being created
  const handleDeleteClick = () => {
    // Make a copy of formValues
    const formCopy = { ...formValues };
    // Delete the element at the index of the collection
    formCopy[collectionName].splice(index, 1);
    // Reset the formValues in state
    setFormValues(formCopy);
  };

  return (
    <div>
      <ListItem>
        <ListItemText primary={element} />
        <IconButton>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={handleDeleteClick}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </ListItem>
      <Divider component="li" />
    </div>
  );
}

DividedListItem.propTypes = {
  element: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  formValues: PropTypes.shape({
    guests: PropTypes.arrayOf(PropTypes.string),
    snacks: PropTypes.arrayOf(PropTypes.string),
    games: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setFormValues: PropTypes.func.isRequired,
};

export default DividedListItem;
