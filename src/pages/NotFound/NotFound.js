import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <>
      <Box
        sx={{
          my: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography fontSize="5ch">Page Not Found</Typography>
      </Box>
    </>
  );
}
