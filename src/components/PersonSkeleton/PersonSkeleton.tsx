import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from '@mui/material';
import React from 'react';

export default function PersonSkeleton() {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText primary={<Skeleton variant="text" width="70%" />} />
      </ListItemButton>
    </ListItem>
  );
}
