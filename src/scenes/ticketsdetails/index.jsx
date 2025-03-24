import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TicketDetails = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode); // Get theme colors
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
  const location = useLocation();

  // Memoize the ticket object to avoid unnecessary re-renders
  const ticket = useMemo(() => location.state?.ticket || {}, [location.state]);

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
    setIsEditing(false); // Disable inputs after saving
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode without saving
  };

  // Define initialValues based on ticket data
  const initialValues = {
    organization: ticket.organization || "",
    cmname: ticket.cmname || "",
    priority: ticket.priority || "",
    experience: ticket.experience || "",
    crmname: ticket.crmname || "",
    status: ticket.status || "",
    department: ticket.department || "",
    date: ticket.date || "",
    time: ticket.time || "",
    subject: ticket.subject || "",
    phoneCode: ticket.phoneCode || "",
    PhoneNo: ticket.PhoneNo || "",
  };

  const checkoutSchema = yup.object().shape({
    organization: yup.string().required("Required"),
    cmname: yup.string().required("Required"),
    priority: yup.string().required("Required"),
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
  });

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "16px",
      "&:hover": {
        borderColor: "#999",
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

  return (
    <Box m="15px" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns={isNonMobile ? "repeat(1, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"}
            >


              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Organization"
                name="organization"
                value={values.organization}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.organization && !!errors.organization}
                helperText={touched.organization && errors.organization}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Customer Manager Name */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Customer Manager Name"
                name="cmname"
                value={values.cmname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.cmname && !!errors.cmname}
                helperText={touched.cmname && errors.cmname}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />
          {/* Experience */}
          <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Experience"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.experience && !!errors.experience}
                helperText={touched.experience && errors.experience}
                sx={{
                  ...textFieldStyles,
                  gridColumn: "span 1",
                  "& .MuiOutlinedInput-input": {
                    color: getExperienceColor(values.experience), // Dynamically set text color
                  },
                  "& .MuiOutlinedInput-input.Mui-disabled": {
                    WebkitTextFillColor: getExperienceColor(values.experience), // Override disabled text color
                  },
                }}
                disabled={!isEditing} // Disable in non-editing mode
              />
              {/* Priority */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Priority"
                name="priority"
                value={values.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.priority && !!errors.priority}
                helperText={touched.priority && errors.priority}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Customer Relationship Manager Name */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Customer Relationship Manager Name"
                name="crmname"
                value={values.crmname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.crmname && !!errors.crmname}
                helperText={touched.crmname && errors.crmname}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />

    

              {/* Status */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Department */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Department"
                name="department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Date */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Date"
                name="date"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Time */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Time"
                name="time"
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.time && !!errors.time}
                helperText={touched.time && errors.time}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Subject */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.subject && !!errors.subject}
                helperText={touched.subject && errors.subject}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                disabled={!isEditing} // Disable in non-editing mode
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" mt="24px">
              {!isEditing ? (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setIsEditing(true)} // Enable editing mode
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
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
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
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleCancel} // Cancel editing mode
                    sx={{
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                      marginLeft: "5px",
                      transition: "0.3s",
                      backgroundColor: colors.redAccent[600],
                      color: "#ffffff",
                      textTransform: "none",
                      "&:hover": { backgroundColor: colors.redAccent[700], boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TicketDetails;