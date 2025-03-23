import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import {
  CountrySelect,
  StateSelect,
  CitySelect,
  PhonecodeSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const customRender = ({ options, customProps, ...selectProps }) => (
  <Select
    {...selectProps}
    {...customProps}
    //  // Remove the dropdown arrow icon
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        border: "1px solid #ccc", // Default border
      },
      border: "none",
    }}
  >
    {options.map(({ label, value, key }) => (
      <MenuItem value={value} key={key}>
        {label}
      </MenuItem>
    ))}
  </Select>
);

const CrmForm = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode); // Get theme colors
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [phoneCode, setPhoneCode] = useState('');

  const handleFormSubmit = (values) => {
    console.log("Form Data:", values);
  };

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    designation: "",
    street: "",
    city: "",
    state: "",
    country: "",
    email: "",
    PhoneNo: "",
    phoneCode: "",
    dropdownSelection: "",
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    middleName: yup.string(),
    lastName: yup.string().required("Required"),
    designation: yup.string().required("Required"),
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
  })

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
      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns={isNonMobile ? "repeat(1, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))"}
            >
              {/* First Name, Middle Name, Last Name, Designation */}
              {[
                { label: "First Name", name: "firstName" },
                { label: "Middle Name", name: "middleName" },
                { label: "Last Name", name: "lastName" },
                { label: "Email Id", name: "email", type: "email" },
                { label: "Phone No", name: "PhoneNo", type: "text" },
                { label: "Designation", name: "designation" },
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
                  sx={{ ...textFieldStyles, gridColumn: "span 2" }}
                />
              ))}

              {/* Country Dropdown */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <CountrySelect
                  containerClassName="form-group"
                  inputClassName="form-control"
                  onChange={(e) => setCountryid(e.id)}
                  placeHolder="Select Country"
                  customRender={customRender}
                  style={{ height: "37px", border: "none" }}
                />
              </FormControl>

              {/* State Dropdown */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <StateSelect
                  countryid={countryid}
                  containerClassName="form-group"
                  inputClassName="form-control"
                  onChange={(e) => setStateid(e.id)}
                  placeHolder="Select State"
                  customRender={customRender}
                  style={{ height: "37px", border: "none" }}
                />
              </FormControl>

              {/* City Dropdown */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  containerClassName="form-group"
                  inputClassName="form-control"
                  onChange={(e) => console.log(e)}
                  placeHolder="Select City"
                  customRender={customRender}
                  style={{ height: "37px", border: "none" }}
                />
              </FormControl>

              {/* Phone Code Dropdown */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <PhonecodeSelect
                  countryid={countryid}
                  value={phoneCode}
                  containerClassName="form-group"
                  inputClassName="form-control"
                  onChange={(e) => setPhoneCode(e)}
                  
                  placeHolder="Select Phone Code"
                  customRender={customRender}
                  style={{ height: "37px", border: "none" }}
                />
              </FormControl>
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
                  "&:hover": { backgroundColor: colors.blueAccent[600], boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" },
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

export default CrmForm;