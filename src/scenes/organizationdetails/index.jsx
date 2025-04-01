import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect, useMemo } from 'react';
import { Country, State, City } from 'country-state-city';
import { useLocation } from 'react-router-dom';

const OrganizationDetails = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  // const isMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orgManagerPairs, setOrgManagerPairs] = useState([{ branch: "" }]);
  const location = useLocation();
  const ticket = useMemo(() => location.state?.ticket || {}, [location.state]);

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
    const fullPhoneNumber = `${values.phoneCode}${values.PhoneNo}`;
    console.log("Form Data:", { ...values, fullPhoneNumber });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const initialValues = {
    name: ticket.name?.split(' ')[0] || "",
    middleName: ticket.name?.split(' ')[1] || "",
    lastName: ticket.name?.split(' ')[2] || "",
    street: "",
    city: ticket.city || "",
    state: ticket.state || "",
    country: ticket.country || "",
    email: ticket.email || "",
    PhoneNo: ticket.phoneno || "",
    phoneCode: ticket.phonenocode || "",
    address: ticket.address || "",
    organization: ticket.organization || "",
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
    middleName: yup.string(),
    lastName: yup.string().required("Required"),
    street: yup.string().required("Required"),
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
    address: yup.string().required("Required"),
    organization: yup.string().required("Required"),
  });

  // Styles for editable fields
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
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccc",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#555",
      fontSize: "16px",
    },
  };

  // Styles for disabled fields (view mode)
  // const disabledFieldStyles = {
  //   padding: "12px",
  //   backgroundColor: "#f5f5f5",
  //   borderRadius: "8px",
  //   minHeight: "50px",
  //   display: "flex",
  //   alignItems: "center",
  //   fontSize: "16px",
  //   color: "#000",
  //   boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
  //   border: "1px solid transparent",
  // };


  const addOrgManagerPair = () => {
    setOrgManagerPairs([...orgManagerPairs, { branch: "" }]);
  };

  const removeOrgManagerPair = (index) => {
    if (orgManagerPairs.length > 1) {
      const updatedPairs = [...orgManagerPairs];
      updatedPairs.splice(index, 1);
      setOrgManagerPairs(updatedPairs);
    }
  };

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode) : [];

  const getPhoneCodeDisplay = (phoneCode) => {
    if (!phoneCode) return "-";
    const country = countries.find(c => `+${c.phonecode}` === phoneCode);
    return country ? `+${country.phonecode} (${country.name})` : phoneCode;
  };

  const renderField = (heading, name, value, fieldComponent, gridSpan = 1) => (
    <Box sx={{ gridColumn: `span ${gridSpan}` }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "#555" }}>
        {heading}
      </Typography>
      {isEditing ? (
        fieldComponent
      ) : (
        <Typography variant="body1" sx={{
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          minHeight: "50px",
          display: "flex",
          alignItems: "center"
        }}>
          {value || "-"}
        </Typography>
      )}
    </Box>
  );


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
              {/* Organization Name */}
              {renderField(
                "Organization Name",
                "organization",
                values.organization,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="organization"
                  value={values.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.organization && !!errors.organization}
                  helperText={touched.organization && errors.organization}
                  sx={textFieldStyles}
                />
              )}

              {/* Founder Name */}
              {renderField(
                "Founder Name",
                "name",
                values.name,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={textFieldStyles}
                />
              )}

              {/* Email */}
              {renderField(
                "Email Id",
                "email",
                values.email,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={textFieldStyles}
                />
              )}

              {/* Address */}
              {renderField(
                "Address",
                "address",
                values.address,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={textFieldStyles}
                />
              )}

              {/* Phone Number */}
              {renderField(
                "Phone Number",
                "PhoneNo",
                values.PhoneNo ? `${getPhoneCodeDisplay(values.phoneCode)} ${values.PhoneNo}` : "-",
                <Box sx={{ display: "flex", gap: "10px" }}>
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
                        // label="Phone Code"
                        sx={textFieldStyles}
                        error={!!touched.phoneCode && !!errors.phoneCode}
                        helperText={touched.phoneCode && errors.phoneCode}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    // label="Phone No"
                    name="PhoneNo"
                    value={values.PhoneNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.PhoneNo && !!errors.PhoneNo}
                    helperText={touched.PhoneNo && errors.PhoneNo}
                    sx={textFieldStyles}
                  />
                </Box>,
                1
              )}

              {/* Country */}
              {renderField(
                "Country",
                "country",
                values.country,
                <Autocomplete
                  fullWidth
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  value={selectedCountry}
                  onChange={(event, newValue) => {
                    setSelectedCountry(newValue);
                    setSelectedState(null);
                    setSelectedCity(null);
                    setFieldValue("country", newValue ? newValue.name : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="Country"
                      sx={textFieldStyles}
                      error={!!touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    />
                  )}
                />
              )}

              {/* State */}
              {renderField(
                "State",
                "state",
                values.state,
                <Autocomplete
                  fullWidth
                  options={states}
                  getOptionLabel={(option) => option.name}
                  value={selectedState}
                  onChange={(event, newValue) => {
                    setSelectedState(newValue);
                    setSelectedCity(null);
                    setFieldValue("state", newValue ? newValue.name : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="State"
                      sx={textFieldStyles}
                      error={!!touched.state && !!errors.state}
                      helperText={touched.state && errors.state}
                      disabled={!selectedCountry}
                    />
                  )}
                  disabled={!selectedCountry}
                />
              )}

              {/* City */}
              {renderField(
                "City",
                "city",
                values.city,
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
                      // label="City"
                      sx={textFieldStyles}
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                      disabled={!selectedState}
                    />
                  )}
                  disabled={!selectedState}
                />
              )}

              <Box sx={{ gridColumn: "span 1", display: "flex", gap: "10px", alignItems: "center" }}></Box>

              {/* Branch Fields - Single Column Layout */}
              {/* Branch Fields - Single Column Layout */}
              {/* Branch Fields - Single Column Layout */}
              {/* Branch Fields - Single Column Layout */}
              {/* Branch Fields - Full Width Container */}
              <Box sx={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "20px"
              }}>
                {orgManagerPairs.map((pair, index) => (
                  <Box key={`pair-${index}`} sx={{
                    gridColumn: "span 1",
                    display: "flex",
                    flexDirection: isNonMobile ? "column" : "row",
                    alignItems: isNonMobile ? "flex-start" : "center",
                    gap: isNonMobile ? "10px" : "0px"
                  }}>
                    {/* Input field */}
                    <Box sx={{ flex: 1, width: "100%" }}>
                      <Typography variant="subtitle1" sx={{ mb: 1, color: "#555" }}>
                        {index === 0 ? "Branch" : `Branch ${index + 1}`}
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          name={`branch${index}`}
                          value={values[`branch${index}`] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!touched[`branch${index}`] && !!errors[`branch${index}`]}
                          helperText={touched[`branch${index}`] && errors[`branch${index}`]}
                          sx={textFieldStyles}
                        />
                      ) : (
                        <Box sx={{
                          padding: "12px",
                          backgroundColor: "#f5f5f5",
                          borderRadius: "4px",
                          minHeight: "50px",
                          display: "flex",
                          alignItems: "center"
                        }}>
                          {values[`branch${index}`] || "-"}
                        </Box>
                      )}
                    </Box>

                    {/* Buttons - responsive positioning */}
                    {isEditing && (
                      <Box sx={{
                        ml: isNonMobile ? 0 : 2,
                        // mt: isNonMobile ? 1 : 0,
                        marginTop:"30px",
                        alignSelf: isNonMobile ? "flex-start" : "center"
                      }}>
                        {index === orgManagerPairs.length - 1 ? (
                          <Button
                            variant="outlined"
                            onClick={addOrgManagerPair}
                            sx={{
                              minWidth: '100px',
                              height: '40px',
                              backgroundColor: colors.blueAccent[700],
                              color: "#ffffff"
                            }}
                          >
                            Add More
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={() => removeOrgManagerPair(index)}
                            sx={{
                              minWidth: '100px',
                              height: '40px',
                              backgroundColor: '#ffebee'
                            }}
                            color="error"
                          >
                            Remove
                          </Button>
                        )}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt="24px">
              {!isEditing ? (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setIsEditing(true)}
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
                    onClick={handleCancel}
                    sx={{
                      padding: "12px 24px",
                      marginLeft: "10px",
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

export default OrganizationDetails;