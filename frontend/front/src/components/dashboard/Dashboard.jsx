import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
  IconButton,
  Divider,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../contexts/AuthContext";

const drawerWidth = 240;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          background: "linear-gradient(90deg, #2d7ff9 0%, #0f2027 100%)",
          color: "#fff",
        }}
      >
        <Typography variant="h6" noWrap>
          Complete Auth
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button selected>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#2d7ff9" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletIcon sx={{ color: "#2d7ff9" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem
          button
          onClick={logout}
          sx={{
            transition: "box-shadow 0.3s, background 0.3s",
            "&:hover": {
              boxShadow: "0 0 16px 4px #2d7ff9, 0 0 8px 2px #fff",
              background: "rgba(45,127,249,0.15)",
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#2d7ff9" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #232526 0%, #2d7ff9 100%)",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Chrome, Safari, Opera
        "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
        scrollbarWidth: "none", // Hide scrollbar for Firefox
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "rgba(34, 40, 49, 0.95)",
          boxShadow: "none",
          backdropFilter: "blur(8px)",
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#232526",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#232526",
              color: "#fff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Welcome Section */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  background: "rgba(255,255,255,0.07)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  borderRadius: 4,
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: "#fff", fontWeight: 700 }}
                >
                  Welcome back, {user?.username || "User"}!
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ color: "#e0e0e0" }}
                >
                  Manage your account and profile settings from this dashboard.
                </Typography>
              </Paper>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 4,
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Quick Actions
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {/* Add your quick action buttons or links here */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ color: "#e0e0e0" }}
                  >
                    No actions available yet.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Recent Transactions */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 4,
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Recent Activity
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {/* Add your transactions list here */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ color: "#e0e0e0" }}
                  >
                    No recent activity.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Account Summary */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 4,
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Profile Summary
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {/* Add your account summary here */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ color: "#e0e0e0" }}
                  >
                    Profile information will be displayed here.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
