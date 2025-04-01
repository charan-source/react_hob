import { Box, Button, TextField, useMediaQuery, useTheme, Autocomplete, Typography, Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Country, State, City } from 'country-state-city';
import { useLocation } from 'react-router-dom';


function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  const cropWidth = mediaWidth * 0.9;
  const cropHeight = cropWidth / aspect;

  const cropX = (mediaWidth - cropWidth) / 2;
  const cropY = (mediaHeight - cropHeight) / 2;

  return {
    unit: '%',
    x: cropX / mediaWidth * 100,
    y: cropY / mediaHeight * 100,
    width: cropWidth / mediaWidth * 100,
    height: cropHeight / mediaHeight * 100
  };
}

const HobDetails = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const colors = tokens(theme.palette.mode);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const imgRef = useRef(null);
    const fileInputRef = useRef(null);
  const location = useLocation();

  const handleFormSubmit = (values) => {
    const formData = {
      ...values,
      profileImage: profileImage
    };
    const fullPhoneNumber = `${values.phoneCode}${values.PhoneNo}`;
    console.log("Form Data:", { ...values, fullPhoneNumber });
    setIsEditing(false);
    console.log("Form Data:", formData);

  };

  const handleImageUpload = (event) => {
    if (!isEditing) return; // Prevent image upload in disabled mode
    
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (!isEditing) return; // Prevent triggering file input in disabled mode
    fileInputRef.current?.click();
  };

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
  };

  const handleCropImage = async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  const handleSaveCroppedImage = async () => {
    await handleCropImage();
    setCropModalOpen(false);
  };
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

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState.isoCode) : [];

  const getPhoneCodeDisplay = (phoneCode) => {
    if (!phoneCode) return "-";
    const country = countries.find(c => `+${c.phonecode}` === phoneCode);
    return country ? `+${country.phonecode} (${country.name})` : phoneCode;
  };

  // Helper function to render fields in both modes

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

  const gender = ["Male", "Female"];

  return (
    <Box m="15px" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
      <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
             <Box display="flex" justifyContent="center" mb="20px">
                          <Box sx={{ position: 'relative' }}>
                            <Avatar
                              src={profileImage || "https://via.placeholder.com/150"}
                              sx={{
                                width: 120,
                                height: 120,
                                border: `2px solid ${colors.primary[500]}`,
                                cursor: isEditing ? 'pointer' : 'default',
                                opacity: isEditing ? 1 : 0.8
                              }}
                              onClick={triggerFileInput}
                            />
                            <IconButton
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: colors.blueAccent[500],
                                '&:hover': {
                                  backgroundColor: isEditing ? colors.blueAccent[600] : colors.blueAccent[500],
                                },
                                opacity: isEditing ? 1 : 0.7
                              }}
                              onClick={triggerFileInput}
                              disabled={!isEditing}
                            >
                              <PhotoCamera />
                            </IconButton>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                              accept="image/*"
                              style={{ display: 'none' }}
                              disabled={!isEditing}
                            />
                          </Box>
                        </Box>
            
                        {/* Crop Modal */}
                        <Dialog open={cropModalOpen} onClose={() => setCropModalOpen(false)} maxWidth="md">
                          <DialogTitle>Crop Profile Picture</DialogTitle>
                          <DialogContent>
                            {originalImage && (
                              <ReactCrop
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={handleCropComplete}
                                aspect={1}
                                circularCrop
                              >
                                <img
                                  ref={imgRef}
                                  src={originalImage}
                                  onLoad={onImageLoad}
                                  style={{ maxHeight: '70vh', maxWidth: '100%' }}
                                  alt="Crop preview"
                                />
                              </ReactCrop>
                            )}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setCropModalOpen(false)} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={handleSaveCroppedImage} color="primary" variant="contained">
                              Save
                            </Button>
                          </DialogActions>
                        </Dialog>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns={isNonMobile ? "repeat(1, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))"}
            >
              {/* First Name */}
              {renderField(
                "First Name",
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

              {/* Middle Name */}
              {renderField(
                "Middle Name",
                "middleName",
                values.middleName,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="middleName"
                  value={values.middleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.middleName && !!errors.middleName}
                  helperText={touched.middleName && errors.middleName}
                  sx={textFieldStyles}
                />
              )}

              {/* Last Name */}
              {renderField(
                "Last Name",
                "lastName",
                values.lastName,
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
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
                      {renderField(
                              "Gender",
                              "gender",
                              values.gender,
                              <Autocomplete
                                fullWidth
                                options={gender}
                                value={values.gender || null}
                                onChange={(event, newValue) => {
                                  setFieldValue("gender", newValue || "");
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    sx={textFieldStyles }
                                    error={!!touched.gender && !!errors.gender}
                                    helperText={touched.gender && errors.gender}
                                    disabled={!isEditing}
                                  />
                                )}
                                disabled={!isEditing}
                                sx={{ gridColumn: "span 1" }}
                                freeSolo
                                forcePopupIcon
                                popupIcon={<ArrowDropDownIcon />}
                              />
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

export default HobDetails;