import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState,  useMemo, useRef } from 'react';
import { Country, State, City } from 'country-state-city';
import { useLocation } from 'react-router-dom';




const OrganizationDetails = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode);
  const [isEditing, setIsEditing] = useState(false);
  const [formInstances, setFormInstances] = useState([{ 
    id: 1,
    selectedCountry: null,
    selectedState: null,
    selectedCity: null,
    values: {
      organization: "",
      name: "",
      branch: "",
      email: "",
      address: "",
      phoneCode: "",
      PhoneNo: "",
      country: "",
      state: "",
      city: ""
    }
  }]);
  const formRefs = useRef([]);
  const location = useLocation();
  const ticket = useMemo(() => location.state?.ticket || {}, [location.state]);

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
    branch: ""
  };

  const checkoutSchema = yup.object().shape({
    organization: yup.string().required("Required"),
    name: yup.string().required("Required"),
    branch: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    address: yup.string().required("Required"),
    phoneCode: yup.string().required("Required"),
    PhoneNo: yup
      .string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Must be at least 10 digits")
      .required("Required"),
    country: yup.string().required("Required"),
    state: yup.string().required("Required"),
    city: yup.string().required("Required"),
  });

  const handleFormSubmit = (values, formId) => {
    console.log("Form Data:", values);
    // Update the specific form instance with the submitted values
    setFormInstances(prev => prev.map(form => 
      form.id === formId ? { ...form, values } : form
    ));
    setIsEditing(false);
  };

  const handleAddForm = () => {
    const newId = formInstances.length > 0 ? Math.max(...formInstances.map(f => f.id)) + 1 : 1;
    setFormInstances([...formInstances, { 
      id: newId,
      selectedCountry: null,
      selectedState: null,
      selectedCity: null,
      values: { ...initialValues, branch: `Branch ${newId}` }
    }]);
  };

  const handleRemoveForm = (id) => {
    if (formInstances.length > 1) {
      setFormInstances(formInstances.filter((form) => form.id !== id));
    }
  };

  const handleCreateSubmit = () => {
    formRefs.current.forEach(formRef => {
      if (formRef && formRef.handleSubmit) {
        formRef.handleSubmit();
      }
    });
  };

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

  const renderForm = (formInstance) => {
    const { id, values, selectedCountry, selectedState, selectedCity } = formInstance;
    const countries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
    const cities = selectedState ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode) : [];

    const getPhoneCodeDisplay = (phoneCode) => {
      if (!phoneCode) return "-";
      const country = countries.find(c => `+${c.phonecode}` === phoneCode);
      return country ? `+${country.phonecode} (${country.name})` : phoneCode;
    };

    return (
      <Formik
        key={id}
        initialValues={values}
        validationSchema={checkoutSchema}
        onSubmit={(values) => handleFormSubmit(values, id)}
        innerRef={ref => formRefs.current[id] = ref}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 3, borderRadius: '8px',  borderBottom: "2px solid #ddd" }}>
            {/* <Typography variant="h6" gutterBottom> */}
              {/* {id === 1 ? "Parent Company" : `Branch ${id - 1}`} */}
              <h3> {id === 1 ? "Parent Company" : `Branch ${id - 1}`}</h3>
            {/* </Typography> */}

            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns={isNonMobile ? "repeat(1, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"}
            >
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

              {renderField(
                "Branch Name",
                "branch",
                values.branch,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="branch"
                  value={values.branch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.branch && !!errors.branch}
                  helperText={touched.branch && errors.branch}
                  sx={textFieldStyles}
                />
              )}

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
                    setFieldValue("country", newValue ? newValue.name : "");
                    updateFormInstance(id, { 
                      selectedCountry: newValue,
                      selectedState: null,
                      selectedCity: null
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={textFieldStyles}
                      error={!!touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    />
                  )}
                />
              )}

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
                    setFieldValue("state", newValue ? newValue.name : "");
                    updateFormInstance(id, { 
                      selectedState: newValue,
                      selectedCity: null
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={textFieldStyles}
                      error={!!touched.state && !!errors.state}
                      helperText={touched.state && errors.state}
                      disabled={!selectedCountry}
                    />
                  )}
                  disabled={!selectedCountry}
                />
              )}

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
                    setFieldValue("city", newValue ? newValue.name : "");
                    updateFormInstance(id, { selectedCity: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={textFieldStyles}
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                      disabled={!selectedState}
                    />
                  )}
                  disabled={!selectedState}
                />
              )}
            </Box>

            {id > 1 && (
              <Box display="flex" justifyContent="flex-start" mt="10px">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleRemoveForm(id)}
                  sx={{ 
                    textTransform: "none",
                    padding: "4px 8px",
                    fontSize: "0.75rem"
                  }}
                >
                  Remove Branch
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Formik>
    );
  };

  const updateFormInstance = (id, updates) => {
    setFormInstances(prev => prev.map(form => 
      form.id === id ? { ...form, ...updates } : form
    ));
  };

  return (
    <Box m="15px" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
      {formInstances.map(renderForm)}

      <Box display="flex" justifyContent="flex-end" mt="24px" gap="10px">
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
              "&:hover": { 
                backgroundColor: colors.blueAccent[600], 
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" 
              },
            }}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddForm} 
              sx={{ 
                textTransform: "none",
                padding: "8px 16px"
              }}
            >
              + Add Branch
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateSubmit}
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
              Save
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default OrganizationDetails;