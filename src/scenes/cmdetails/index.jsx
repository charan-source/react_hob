import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect, useMemo } from 'react';
import { Country, State, City } from 'country-state-city';
import { useLocation } from 'react-router-dom';

const CmDetails = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode); // Get theme colors
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
  const location = useLocation();

  // Memoize the ticket object to avoid unnecessary re-renders
  const ticket = useMemo(() => location.state?.ticket || {}, [location.state]);

  // Initialize selectedCountry, selectedState, and selectedCity based on ticket data
  useEffect(() => {
    if (ticket.country) {
      const country = Country.getAllCountries().find((c) => c.name === ticket.country);
      setSelectedCountry(country || null);
    }
    if (ticket.state && selectedCountry) {
      const state = State.getStatesOfCountry(selectedCountry.isoCode).find((s) => s.name === ticket.state);
      setSelectedState(state || null);
    }
    if (ticket.city && selectedState) {
      const city = City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode).find((c) => c.name === ticket.city);
      setSelectedCity(city || null);
    }
  }, [ticket, selectedCountry, selectedState]);

  const handleFormSubmit = (values) => {
    // Combine phone code and phone number
    const fullPhoneNumber = `${values.phoneCode}${values.PhoneNo}`;
    console.log("Form Data:", { ...values, fullPhoneNumber });
    setIsEditing(false); // Exit editing mode after saving
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode without saving
  };

  const initialValues = {
    firstName: ticket.name?.split(' ')[0] || "",
    middleName: ticket.name?.split(' ')[1] || "",
    lastName: ticket.name?.split(' ')[2] || "",
    street: "",
    city: ticket.city || "",
    state: ticket.state || "",
    country: ticket.country || "",
    email: ticket.email || "",
    PhoneNo: ticket.phoneno || "",
    phoneCode: ticket.phonenocode || "",
    customerManager: ticket.customermanager || "", // New field for customer manager
    organization: ticket.organization || "", // New field for organization
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    middleName: yup.string(),
    lastName: yup.string().required(""),
    street: yup.string().required(""),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    country: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    PhoneNo: yup
      .string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Must be at least 10 digits")
      .required("Required"),
    phoneCode: yup.string().required("Required"),
    customerManager: yup.string().required("Required"), // Corrected field name
    organization: yup.string().required("Required"), // Add organization validation
  });

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize:"16px",
      "&:hover": {
        borderColor: "#999",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)",
      },
      padding: "8px 12px",
      height: "50px",
    },
    "& .MuiInputLabel-root": {
      fontSize:"16px",
      color: "#555",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #ccc", // Ensure the border is visible
    },
  };

  // Get all countries
  const countries = Country.getAllCountries();

  // Get states based on selected country
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];

  // Get cities based on selected state
  const cities = selectedState ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode) : [];

  // Customer Manager options
  const customerManagers = [
    "Customer Manager 1",
    "Customer Manager 2",
    "Customer Manager 3",
    "Customer Manager 4",
    "Customer Manager 5",
  ];

  // Organization options
  const organization = [
    "Wipro",
    "Infosys",
    "TCS",
    "HCL",
    "Tech Mahindra",
  ];

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
              {/* First Name */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                   gridColumn: "span 1"
                }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Middle Name */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Middle Name"
                name="middleName"
                value={values.middleName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                   gridColumn: "span 1"
                }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Last Name */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                   gridColumn: "span 1"
                }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Email Id */}
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                label="Email Id"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                   gridColumn: "span 1"
                }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* Phone Code and Phone Number (Combined as one span) */}
              <Box sx={{ gridColumn: "span 1", display: "flex", gap: "10px" }}>
                <Autocomplete
                  fullWidth
                  options={countries}
                  getOptionLabel={(option) => `+${option.phonecode} (${option.name})`}
                  value={countries.find((country) => `+${country.phonecode}` === values.phoneCode) || null}
                  onChange={(event, newValue) => {
                    setFieldValue("phoneCode", newValue ? `+${newValue.phonecode}` : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Phone Code"
                      sx={textFieldStyles}
                      error={!!touched.phoneCode && !!errors.phoneCode}
                      helperText={touched.phoneCode && errors.phoneCode}
                      disabled={!isEditing} // Disable in non-editing mode
                    />
                  )}
                  sx={{
                    ...textFieldStyles,
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000",
                    },

                  }}
                  disabled={!isEditing} // Disable in non-editing mode
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Phone No"
                  name="PhoneNo"
                  value={values.PhoneNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.PhoneNo && !!errors.PhoneNo}
                  helperText={touched.PhoneNo && errors.PhoneNo}
                  sx={{
                    ...textFieldStyles,
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000",
                    },
                     gridColumn: "span 1"
                  }}
                  disabled={!isEditing} // Disable in non-editing mode
                />
              </Box>

              {/* Country Dropdown */}
              <Autocomplete
                fullWidth
                options={countries}
                getOptionLabel={(option) => option.name}
                value={selectedCountry}
                onChange={(event, newValue) => {
                  setSelectedCountry(newValue);
                  setSelectedState(null); // Reset state when country changes
                  setSelectedCity(null); // Reset city when country changes
                  setFieldValue("country", newValue ? newValue.name : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    sx={textFieldStyles}
                    error={!!touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
                    disabled={!isEditing} // Disable in non-editing mode
                  />
                )}
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                  gridColumn: "span 1" 

                }}
                disabled={!isEditing} // Disable in non-editing mode
              />

              {/* State Dropdown */}
              <Autocomplete
                fullWidth
                options={states}
                getOptionLabel={(option) => option.name}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                  setSelectedCity(null); // Reset city when state changes
                  setFieldValue("state", newValue ? newValue.name : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State"
                    sx={textFieldStyles}
                    error={!!touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                    disabled={!selectedCountry || !isEditing} // Disable in non-editing mode
                  />
                )}
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                  gridColumn: "span 1" 

                }}
                disabled={!selectedCountry || !isEditing} // Disable in non-editing mode
              />

              {/* City Dropdown */}
              <Autocomplete
                fullWidth
                options={cities}
                getOptionLabel={(option) => option.name}
                value={selectedCity}
                onChange={(event, newValue) => {
                  setSelectedCity(newValue);
                  setFieldValue("city", newValue ? newValue.name : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    sx={textFieldStyles}
                    error={!!touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                    disabled={!selectedState || !isEditing} // Disable in non-editing mode
                  />
                )}
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                  gridColumn: "span 1" 

                }}
                disabled={!selectedState || !isEditing} // Disable in non-editing mode
              />

              {/* Street Address */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Street Address"
                name="street"
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.street && !!errors.street}
                helperText={touched.street && errors.street}
            
                disabled={!isEditing} // Disable in non-editing mode
                sx={{
                  ...textFieldStyles,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                   gridColumn: "span 1"
                }}
              />

              {/* Organization Dropdown */}
              <FormControl fullWidth sx={{ gridColumn: "span 1", ...textFieldStyles }}>
                <InputLabel>Organization</InputLabel>
                <Select
                  name="organization"
                  value={values.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Organization"
                  sx={{
                    ...textFieldStyles,
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000",
                    },
                    gridColumn: "span 1" 
  
                  }}
                  disabled={!isEditing} // Disable in non-editing mode
                >
                  <MenuItem value="" disabled>
                    Select Organization
                  </MenuItem>
                  {organization.map((org, index) => (
                    <MenuItem key={index} value={org}>
                      {org}
                    </MenuItem>
                  ))}
                </Select>
                {touched.organization && errors.organization && (
                  <p style={{ color: "red", fontSize: "12px" }}>{errors.organization}</p>
                )}
              </FormControl>

              {/* Customer Manager Dropdown */}
              <FormControl fullWidth sx={{ gridColumn: "span 1", ...textFieldStyles }}>
                <InputLabel>  Select Customer Relationship Manager</InputLabel>
                <Select
                  name="customerManager"
                  value={values.customerManager}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Customer Manager"
                  disabled={!isEditing} // Disable in non-editing mode
                  sx={{
                    ...textFieldStyles,
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000",
                    },
                    gridColumn: "span 1" 
  
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Customer Relationship Manager
                  </MenuItem>
                  {customerManagers.map((manager, index) => (
                    <MenuItem key={index} value={manager}>
                      {manager}
                    </MenuItem>
                  ))}
                </Select>
                {touched.customerManager && errors.customerManager && (
                  <p style={{ color: "red", fontSize: "12px" }}>{errors.customerManager}</p>
                )}
              </FormControl>
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
                      marginLeft: "5px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
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

export default CmDetails;