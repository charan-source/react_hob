import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import Select from '@mui/material/Select';
// import Grid from '@mui/material/Grid';
// import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

// import Header from "../../components/Header";
// const customRender = ({ options, customProps, ...selectProps }) => (
//   <Select {...selectProps} {...customProps}>
//     {options.map(({ label, value, key }) => (
//       <MenuItem value={value} key={key}>
//         {label}
//       </MenuItem>
//     ))}
//   </Select>
// );

const CmForm = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode); // Get theme colors
  // const [country, setCountry] = React.useState('');
  // const [region, setRegion] = React.useState('');

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
    dropdownSelection: "",
    // subject: "",
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
    // subject: yup.string().required("Required"),
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
      padding: "8px 12px", // Adjust padding to reduce height
      height: "50px", // Set a fixed height for the input
    },
    "& .MuiInputLabel-root": {
      color: "#555",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  return (
    <Box m="15px" sx={{
      backgroundColor: "#ffffff", padding: "20px"

    }}>
      {/* <Header title="Create CM" subtitle="Create a New Customer Manager Profile" /> */}

      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit} sx={{ backgroundColor: "#ffffff" }}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} >
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
                { label: "Email", name: "lastName" },
                { label: "Phone No", name: "phoneno" },

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


              {/* Country and State Dropdowns First */}
              {/* <FormControl fullWidth sx={{ gridColumn: "span 2", ...textFieldStyles }}>
                <InputLabel>Country</InputLabel>
                <CountryDropdown
                  value={country}
                  onChange={(val) => {
                    setCountry(val);
                    setRegion('');
                  }}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    padding: "8px 12px",
                    backgroundColor: "#ffffff",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                  customRender={customRender}
                />
              </FormControl>

              <FormControl fullWidth sx={{ gridColumn: "span 2", ...textFieldStyles }}>
                <InputLabel>State</InputLabel>
                <RegionDropdown
                  country={country}
                  value={region}
                  onChange={(val) => setRegion(val)}
                  disableWhenEmpty={true}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    padding: "8px 12px",
                    backgroundColor: "#ffffff",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                  customRender={customRender}
                />
              </FormControl> */}

              <FormControl fullWidth sx={{ gridColumn: "span 2", ...textFieldStyles }}>
                    <InputLabel>Organization</InputLabel>
                    <Select
                      name="dropdownSelection"
                      value={values.dropdownSelection}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="">Select</MenuItem> {/* Ensure a default selection */}
                      <MenuItem value="Option 1">Wipro</MenuItem>
                      <MenuItem value="Option 2">Tata</MenuItem>
                      <MenuItem value="Option 3">Relience</MenuItem>
                      <MenuItem value="Option 4">Santoor</MenuItem>
                    </Select>
                    {touched.dropdownSelection && errors.dropdownSelection && (
                      <p style={{ color: "red", fontSize: "12px" }}>{errors.dropdownSelection}</p>
                    )}
                  </FormControl>



              {/* Email & Phone No */}

            </Box>


            {/* </Grid> */}

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

export default CmForm;
