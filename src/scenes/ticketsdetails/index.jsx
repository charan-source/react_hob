import { Box, Button, useMediaQuery, useTheme, Select, MenuItem, FormControl } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const TicketDetails = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode); // Get theme colors
  // const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
  const location = useLocation();

  // Memoize the ticket object to avoid unnecessary re-renders
  const ticket = useMemo(() => location.state?.ticket || {}, [location.state]);
  console.log("Ticket:", ticket);

  // Function to determine the color based on experience
  const getExperienceColor = (experience) => {
    switch (experience) {
      case "Frustrated":
        return "#E64A19"; // Darker orange for frustration
      case "Extremely Frustrated":
        return "#D32F2F"; // Darker red for extreme frustration
      case "Happy":
        return "#FBC02D"; // Darker yellow for happiness
      case "Extremely Happy":
        return "#388E3C"; // Darker green for extreme happiness
      default:
        return "#616161"; // Darker grey for default
    }
  };

  const handleFormSubmit = (values) => {
    // Combine phone code and phone number
    const fullPhoneNumber = `${values.phoneCode}${values.PhoneNo}`;
    console.log("Form Data:", { ...values, fullPhoneNumber });
  };


  // Define initialValues based on ticket data
  const initialValues = {
    organization: ticket.organization || "",
    cmname: ticket.cmname || "",
    experience: ticket.experience || "",
    crmname: ticket.crmname || "",
    status: ticket.status || "",
    department: ticket.department || "",
    date: ticket.date || "",
    time: ticket.time || "",
    subject: ticket.subject || "",
    requestdetails: ticket.requestdetails || "",
    phoneCode: ticket.phoneCode || "",
    PhoneNo: ticket.PhoneNo || "",
    notes: ticket.notes || "", // Additional notes
  };

  const checkoutSchema = yup.object().shape({
    organization: yup.string().required("Required"),
    cmname: yup.string().required("Required"),
    crmname: yup.string().required("Required"),
    status: yup.string().required("Required"),
    department: yup.string().required("Required"),
    date: yup.string().required("Required"),
    time: yup.string().required("Required"),
    subject: yup.string().required("Required"),
    phoneCode: yup.string().required("Required"),
    PhoneNo: yup
      .string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Must be at least 10 digits")
      .required("Required"),
    notes: yup.string(), // Optional notes
  });

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "16px",
      "&:hover": {
        // borderColor: "#999",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)",
      },
      padding: "8px 12px",
      height: "50px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "16px",
      color: "#555",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #ccc", // Ensure the border is visible
    },
  };

  const CrmDetails = [
    { id: 1, crmname: "charan" },
    { id: 2, crmname: "charan" },
    { id: 3, crmname: "charan" },
    { id: 4, crmname: "charan" },
  ];

  return (
    <Box m="15px" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              sx={{ paddingLeft: "20px" }}
              gridTemplateColumns={isNonMobile ? "repeat(1, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"}
            >
              {/* Organization */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Organization</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.organization}</Box>
              </Box>

              {/* Customer Manager Name */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Customer Manager Name</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.cmname}</Box>
              </Box>

              {/* Experience */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Experience</Box>
                <Box sx={{ fontSize: "16px", color: getExperienceColor(values.experience) }}>{values.experience}</Box>
              </Box>

              {/* Status */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Status</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.status}</Box>
              </Box>

              {/* Department */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Impact</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.department}</Box>
              </Box>

              {/* Date */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Date</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.date}</Box>
              </Box>

              {/* Time */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Time</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.time}</Box>
              </Box>



            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: "20px", gap: "20px", marginTop: "10px" }}>
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Subject</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.subject}</Box>
              </Box>

              {/* Subject */}
              <Box sx={{ gridColumn: "span 1" }}>
                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Request Details</Box>
                <Box sx={{ fontSize: "16px", color: "#000" }}>{values.requestdetails}</Box>
              </Box>

              {/* Customer Relationship Manager (Editable) */}

              <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>Customer Relationship Manager</Box>

              <Box sx={{ width: "30%" }}> {/* Adjust the width as needed */}
                <FormControl fullWidth sx={{ ...textFieldStyles }}>
                  <Select
                    label="Customer Relationship Manager"
                    name="crmname"
                    value={values.crmname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.crmname && !!errors.crmname}
                  >
                    {CrmDetails.map((crm) => (
                      <MenuItem key={crm.id} value={crm.crmname}>
                        {crm.crmname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

            </Box>



            {/* Edit/Save/Cancel Buttons */}
            <Box display="flex" justifyContent="flex-end" mt="24px" sx={{gap:"10px"}}>

            <Button
                type="button"
                variant="contained"

                sx={{
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                  transition: "0.3s",
                  backgroundColor: colors.redAccent[500],
                  color: "#ffffff",
                  textTransform: "none",
                  "&:hover": { backgroundColor: colors.redAccent[600], boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
                }}
              >
                Delete
              </Button>

              <Button
                type="button"
                variant="contained"

                sx={{
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                  transition: "0.3s",
                  backgroundColor: colors.blueAccent[700],
                  color: "#ffffff",
                  textTransform: "none",
                  "&:hover": { backgroundColor: colors.blueAccent[600], boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
                }}
              >
                Save
              </Button>


            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TicketDetails;