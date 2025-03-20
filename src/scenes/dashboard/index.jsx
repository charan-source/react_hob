import { Box, Grid, Typography } from "@mui/material";
// import { tokens } from "../../theme";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode); // Get theme colors

  const data = [
    {
      title: "50",
      subtitle: "ALL EXPERIENCE",
      progress: 1.0,
      icon: <ReceiptLongIcon />,
      link: "/allExperiences",
    },
    {
      title: "10",
      subtitle: "NEW EXPERIENCE",
      progress: 0.2,
      icon: <NewReleasesIcon />,
      link: "/newExperiences",
    },
    {
      title: "30",
      subtitle: "RESOLVED EXPERIENCE",
      progress: 0.6,
      icon: <CheckCircleIcon />,
      link: "/resolvedExperiences",
    },
    {
      title: "10",
      subtitle: "PENDING EXPERIENCE",
      progress: 0.2,
      icon: <HourglassEmptyIcon />,
      link: "/pendingExperiences",
    },
    //     {
    //   title: "50",
    //   subtitle: "All Experiences",
    //   progress: 1.0,
    //   icon: <ReceiptLongIcon />,
    //   link: "/allExperiences",
    // },
    // {
    //   title: "10",
    //   subtitle: "New Experiences",
    //   progress: 0.2,
    //   icon: <NewReleasesIcon />,
    //   link: "/newExperiences",
    // },
    // {
    //   title: "30",
    //   subtitle: "Resolved Experiences",
    //   progress: 0.6,
    //   icon: <CheckCircleIcon />,
    //   link: "/resolvedExperiences",
    // },
    // {
    //   title: "10",
    //   subtitle: "Pending Experiences",
    //   progress: 0.2,
    //   icon: <HourglassEmptyIcon />,
    //   link: "/pendingExperiences",
    // },
  ];

  return (
    <Box m={2} >
      {/* HEADER */}
      {/* <Box mb={3} p={2} borderRadius={2} sx={{ backgroundColor:"#ffffff" }}>
        <Grid container justifyContent="space-between" alignItems="center" >
          <Grid item xs={12} sm={6}>
            <Header title="Good Morning" subtitle="Welcome to your dashboard" />
          </Grid>
          <Grid item>
            <Button
              sx={{
                backgroundColor: '#3e4396',
                // color: colors.grey[100],
                color: '#fff',
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "bold",
                padding: { xs: "8px 12px", sm: "10px 20px" },
                textTransform:"none"
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Grid>
        </Grid>
      </Box> */}

      {/* EXPERIENCE STATISTICS (FIXED CIRCLE INSIDE BOX) */}
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link to={item.link} style={{ textDecoration: "none" }}>
              <Box
                p={2}
                borderRadius={2}
                sx={{
                  bgcolor: '#ffffff',
                  minHeight: "80px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <StatBox
                        subtitle={item.subtitle}
                  title={item.title}
          
                  color='#3e4396'
                  progress={item.progress}
                  icon={React.cloneElement(item.icon, {
                    fontSize: "large",
                    sx: { color: '#3e4396' },
                  })}
                />
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* REVENUE & EXPERIENCE CHARTS */}
      <Grid container spacing={2} mt={3}>
        {/* <Grid item xs={12} md={8}>
          <Box p={2} borderRadius={2} sx={{ bgcolor: colors.primary[400] }}>
            <Typography variant="h6" color={colors.grey[100]} mb={1}>
              Revenue Generated
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              $59,342.32
            </Typography>
            <Box height="250px">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
           </Grid> */}

        {/* <Grid item xs={12} md={4}>
          <Box p={2} borderRadius={2} sx={{ bgcolor: colors.primary[400] }}>
            <Typography variant="h6" color={colors.grey[100]} mb={1}>
              Experience Quantity
            </Typography>
            <Box height="250px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
        </Grid> */}

        <Grid item xs={12} md={4}>
          <Box p={2} borderRadius={2} sx={{bgcolor:"#ffffff" }} >
            <Typography variant="h6"  mb={1} fontWeight="bold">
              Experience Quantity
            </Typography>
            <Box height="250px"   >
              <PieChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
