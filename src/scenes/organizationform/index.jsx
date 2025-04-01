import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { Country, State, City } from 'country-state-city';
import React, { useState } from 'react';

const OrganizationForm = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [orgManagerPairs, setOrgManagerPairs] = useState([{ branch: "" }]); 

  const handleFormSubmit = (values) => {
    console.log("Form Data:", values);
  };

  const initialValues = {
    organization: "",
    founderName: "",
    email: "",
    phoneCode: "",
    phoneno: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postcode: "",
  };

  const checkoutSchema = yup.object().shape({
    organization: yup.string().required("Required"),
    founderName: yup.string(),
    email: yup.string().email("Invalid email").required("Required"),
    phoneCode: yup.string().required("Required"),
    phoneno: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    province: yup.string().required("Required"),
    country: yup.string().required("Required"),
    postcode: yup.string().required("Required"),
  });

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      border: "1px solid #ccc",
      backgroundColor: "#ffffff",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        borderColor: "#999",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)",
      },
      padding: "8px 12px",
      height: "50px",
    },
    "& .MuiInputLabel-root": {
      color: "#555",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

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

  return (
    <Box m="15px" sx={{ backgroundColor: "#ffffff", padding: "20px" }}>
      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns={isNonMobile ? "repeat(1, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"}
              sx={{
                "& > div": { gridColumn: isNonMobile ? "span 1" : undefined },
                backgroundColor: "#ffffff",
              }}
            >
              {/* Main Form Fields */}
              {[
                { label: "Organization Name", name: "organization" },
                { label: "Email Id", name: "email", type: "email" },
              ].map((field, index) => (
                <TextField
                  key={index}
                  fullWidth
                  variant="outlined"
                  type={field.type || "text"}
                  label={field.label}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched[field.name] && !!errors[field.name]}
                  helperText={touched[field.name] && errors[field.name]}
                  sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                />
              ))}

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
                    />
                  )}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Phone No"
                  name="phoneno"
                  value={values.phoneno}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.phoneno && !!errors.phoneno}
                  helperText={touched.phoneno && errors.phoneno}
                  sx={textFieldStyles}
                />
              </Box>

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
                    label="Country"
                    sx={textFieldStyles}
                    error={!!touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
              />

              <Autocomplete
                fullWidth
                options={states}
                getOptionLabel={(option) => option.name}
                value={selectedState}
                onChange={(event, newValue) => {
                  setSelectedState(newValue);
                  setSelectedCity(null);
                  setFieldValue("province", newValue ? newValue.name : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State/Province"
                    sx={textFieldStyles}
                    error={!!touched.province && !!errors.province}
                    helperText={touched.province && errors.province}
                    disabled={!selectedCountry}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
                disabled={!selectedCountry}
              />

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
                    disabled={!selectedState}
                  />
                )}
                sx={{ gridColumn: "span 1" }}
                disabled={!selectedState}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Postal Code"
                name="postcode"
                value={values.postcode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.postcode && !!errors.postcode}
                helperText={touched.postcode && errors.postcode}
                sx={{ ...textFieldStyles, gridColumn: "span 1" }}
              />
   <Box sx={{ gridColumn: "span 2", display: "flex", gap: "10px", alignItems: "center" }}></Box>
              {/* Branch Fields - Single Column Layout */}
              <Box >
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                  Branch Information
                </Typography>
                
                {orgManagerPairs.map((pair, index) => (
                  <Box 
                    key={`pair-${index}`}
                    sx={{ 
                      display: "flex",
                      gap: "10px",
                      mb: 2,
                      alignItems: "center"
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label={index === 0 ? "Branch" : `Branch ${index + 1}`}
                      name={`branch${index}`}
                      value={values[`branch${index}`] || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched[`branch${index}`] && !!errors[`branch${index}`]}
                      helperText={touched[`branch${index}`] && errors[`branch${index}`]}
                      sx={textFieldStyles}
                    />

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
                ))}
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt="24px">
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
                  "&:hover": { 
                    backgroundColor: colors.blueAccent[600], 
                    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" 
                  },
                }}
              >
                Create
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default OrganizationForm;