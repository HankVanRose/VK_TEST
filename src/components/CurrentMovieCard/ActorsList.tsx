import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

export const ActorsList = ({
  actors,
}: {
  actors: Array<{ id: number; photo?: string; name?: string; enName?: string }>;
}) => {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,

          fontWeight: 600,
        }}
      >
        В ролях
      </Typography>
      <List
        dense
        sx={{
          width: '100%',
          columnCount: { xs: 1, sm: 2, md: 3 },
          columnGap: '24px',
          bgcolor: 'background.paper',
        }}
      >
        {actors.map((person) => (
          <ListItem key={person.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 1 }}>
              <ListItemAvatar>
                <Avatar src={person?.photo} sx={{ width: 36, height: 36 }} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography fontWeight={200}>{person?.name}</Typography>
                }
                secondary={person?.enName}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
