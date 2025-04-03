import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { Country, State, City } from "country-state-city";
import React, { useState, useRef } from "react";

const OrganizationForm = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode);
  const formRefs = useRef([]);

  const [formInstances, setFormInstances] = useState([{ 
    id: 1,
    selectedCountry: null,
    selectedState: null,
    selectedCity: null
  }]);

  const handleAddForm = () => {
    setFormInstances([...formInstances, { 
      id: formInstances.length + 1,
      selectedCountry: null,
      selectedState: null,
      selectedCity: null
    }]);
  };

  const handleRemoveForm = (id) => {
    setFormInstances(formInstances.filter((form) => form.id !== id));
  };

  const handleFormSubmit = (values) => {
    console.log("Form Data:", values);
    // Add your form submission logic here
    alert('Form submitted successfully!');
  };

  const handleCreateSubmit = () => {
    // Trigger submit for all forms
    formRefs.current.forEach(formRef => {
      if (formRef) {
        formRef.handleSubmit();
      }
    });
  };

  const updateFormInstance = (id, updates) => {
    setFormInstances(formInstances.map(form => 
      form.id === id ? { ...form, ...updates } : form
    ));
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
    branch: "",
  };

  const checkoutSchema = yup.object().shape({
    organization: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    phoneCode: yup.string().required("Required"),
    phoneno: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    province: yup.string().required("Required"),
    country: yup.string().required("Required"),
    postalcode: yup.string().required("Required"),
    branch: yup.string(),
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

  return (
    <Box m="15px" sx={{ backgroundColor: "#ffffff", padding: "20px" }}>
      {formInstances.map((instance, index) => {
        const countries = Country.getAllCountries();
        const states = instance.selectedCountry ? State.getStatesOfCountry(instance.selectedCountry.isoCode) : [];
        const cities = instance.selectedState ? City.getCitiesOfState(instance.selectedCountry?.isoCode, instance.selectedState.isoCode) : [];

        return (
          <Formik
            key={instance.id}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={handleFormSubmit}
            innerRef={(ref) => (formRefs.current[index] = ref)}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit} style={{ marginBottom: "20px", borderBottom: "2px solid #ddd", paddingBottom: "20px" }}>
                <h3>Branch {index + 1}</h3>
                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns={isNonMobile ? "repeat(1, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"}
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? "span 1" : undefined },
                    backgroundColor: "#ffffff",
                  }}
                >
                  {/* Organization Name and Email */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Organization Name"
                    name="organization"
                    value={values.organization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.organization && !!errors.organization}
                    helperText={touched.organization && errors.organization}
                    sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Branch Name"
                    name="branch"
                    value={values.branch}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.branch && !!errors.branch}
                    helperText={touched.branch && errors.branch}
                    sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email Id"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                  />

                  <Autocomplete
                    fullWidth
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    value={instance.selectedCountry}
                    onChange={(event, newValue) => {
                      updateFormInstance(instance.id, {
                        selectedCountry: newValue,
                        selectedState: null,
                        selectedCity: null
                      });
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
                    value={instance.selectedState}
                    onChange={(event, newValue) => {
                      updateFormInstance(instance.id, {
                        selectedState: newValue,
                        selectedCity: null
                      });
                      setFieldValue("province", newValue ? newValue.name : "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State/Province"
                        sx={textFieldStyles}
                        error={!!touched.province && !!errors.province}
                        helperText={touched.province && errors.province}
                        disabled={!instance.selectedCountry}
                      />
                    )}
                    sx={{ gridColumn: "span 1" }}
                    disabled={!instance.selectedCountry}
                  />

                  <Autocomplete
                    fullWidth
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    value={instance.selectedCity}
                    onChange={(event, newValue) => {
                      updateFormInstance(instance.id, {
                        selectedCity: newValue
                      });
                      setFieldValue("city", newValue ? newValue.name : "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        sx={textFieldStyles}
                        error={!!touched.city && !!errors.city}
                        helperText={touched.city && errors.city}
                        disabled={!instance.selectedState}
                      />
                    )}
                    sx={{ gridColumn: "span 1" }}
                    disabled={!instance.selectedState}
                  />


                 <TextField
                    fullWidth
                    variant="outlined"
                    label="Postal Code"
                    name="postalcode"
                    value={values.postalcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.postalcode && !!errors.postalcode}
                    helperText={touched.postalcode && errors.postalcode}
                    sx={{ ...textFieldStyles, gridColumn: "span 1" }}
                  />
                </Box>

                {index > 0 && (
                  <Box display="flex" justifyContent="flex-start" mt="10px">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveForm(instance.id)}
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
              </form>
            )}
          </Formik>
        );
      })}

      <Box display="flex" justifyContent="center" mt="20px" gap="20px">
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
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default OrganizationForm;