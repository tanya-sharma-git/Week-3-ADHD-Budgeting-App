import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" fontWeight={700} color="primary">
          Penny Pal
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Budgeting that works with your ADHD brain, not against it.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your app&apos;s starter is up and running. We&apos;ll build the real
          screens from here.
        </Typography>
        <Box>
          <Button variant="contained" size="large" disabled>
            Coming soon
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
