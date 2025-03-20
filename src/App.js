import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Cm from "./scenes/cm";
import Hob from "./scenes/hob";
import Crm from "./scenes/crm";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import CmForm from "./scenes/cmform";
import CrmForm from "./scenes/crmform";
import BsuForm from "./scenes/bsuform";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Profile from "./scenes/profile";
import AllExperiences from "./scenes/experiences/allExperiences";
import NewExperiences from "./scenes/experiences/newExperiences";
import PendingExperiences from "./scenes/experiences/pendingExperiences";
import ResolvedExperiences from "./scenes/experiences/resolvedExperiences";
import Notes from "./scenes/notes";
// import { tokens } from "../../theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  // const [drawer, setDrawerOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 900px)"); // Detect mobile screen
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Topbar: Full width at the top */}
        <Box sx={{ width: "100vw",  top: 5, zIndex: 1000 }}>
          <Topbar setIsSidebar={setIsSidebar}  />
        </Box>

        {/* Sidebar: Fixed on the left */}
        {!isMobile && isSidebar && (
          <Box
            sx={{
              position: "fixed",
              left: 0,
              top: "64px", // Below Topbar
              height: "calc(100vh - 64px)", // Full height minus Topbar height
              width: "260px",
              zIndex: 900, // Lower than Topbar
            }}
          >
            <Sidebar isSidebar={isSidebar} />
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: isMobile ? "0px" : isSidebar ? "260px" : "0px",
            padding: "20px 20px 20px", // Top padding increased to prevent overlap
            overflowY: "auto",
            transition: "margin 0.3s ease-in-out",
            "&::-webkit-scrollbar": {
              width: "1px", // Width of the scrollbar
              height: "5px", // Height of the horizontal scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#000000", // Color of the scrollbar track
              borderRadius: "4px",
            },
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cm" element={<Cm />} />
            <Route path="/crm" element={<Crm />} />
            <Route path="/hob" element={<Hob />} />
            <Route path="/form" element={<Form />} />
            <Route path="/cmform" element={<CmForm />} />
            <Route path="/crmform" element={<CrmForm />} />
            <Route path="/bsuform" element={<BsuForm />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/profile" element={<Profile />} />

            {/* Experience Routes */}
            <Route path="/allExperiences" element={<AllExperiences />} />
            <Route path="/newExperiences" element={<NewExperiences />} />
            <Route path="/pendingExperiences" element={<PendingExperiences />} />
            <Route path="/resolvedExperiences" element={<ResolvedExperiences />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
