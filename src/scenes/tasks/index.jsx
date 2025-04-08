import { Box, Typography, List, ListItem, ListItemText, useMediaQuery, TextField, Button, Modal } from "@mui/material";
import React, { useState, useRef } from "react";
import { tokens } from "../../theme";
import { Search as SearchIcon } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
// import { useNavigate } from "react-router-dom";

const Tasks = () => {
  // Responsive breakpoints
  const isDesktop = useMediaQuery("(min-width: 1024px)"); // Desktop (5 columns)
  const isTablet = useMediaQuery("(min-width: 768px)"); // Tablet (3 columns)
  //  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const colors = tokens("light");
  const [openModal, setOpenModal] = useState(false);
  const [openTaskModal, setTaskopenModal] = useState(false);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const formRefs = useRef([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handleOpenModal = () => {
  //   setOpenModal(true);
  // };
  const handletaskmodel = () => {
    setTaskopenModal(true);
  };

  const handleRemoveForm = (id) => {
    setFormInstances(formInstances.filter((form) => form.id !== id));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setName(""); // Reset input field
  };

  const handleTaskCloseModal = () => {
    setTaskopenModal(false);
    setName(""); // Reset input field
  };

  const [formInstances, setFormInstances] = useState([{ 
    id: 1,
    selectedCountry: null,
    selectedState: null,
    selectedCity: null
  }]);

  const handleAddForm = () => {
    setFormInstances([...formInstances, { 
      id: formInstances.length + 1,
    }]);
  };
  
  const handleFormSubmit = (values) => {
    console.log("Form Data:", values);
    // Add your form submission logic here
    alert('Form submitted successfully!');
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

  const handleSubmit = () => {
    console.log("Submitted Name:", name);
    handleCloseModal();
  };

  const StyledTextField = ({ label, name, value, handleChange, handleBlur, error, multiline = false, rows = 1 }) => {
    return (
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!error}
        helperText={error}
        multiline={multiline}
        rows={rows}
        sx={{ marginBottom: "15px" }}
      />
    );
  };

  // Dynamic columns based on screen size
  const columns = isDesktop ? 5 : isTablet ? 3 : 1;

  const sections = [
    { title: "Aliquam ut iste est aperiam quis.", text: "Inventore ut dolor illum quidem corporis..." },
    { title: "Autem aliquam occaecati voluptatibus...", text: "Dicta voluptas dolor ut labore ture culpa..." },
    { title: "Dolores aut atque deserunt blanditiis...", text: "Id amet inventore eius labore exercitationem..." },
    { title: "Et at rem nobis assumenda rem non...", text: "Quia autem occaecati dolores et id explicabo..." },
    { title: "Magni accusantium iusto neque et rerum...", text: "Laborum et vitae deserunt voluptas..." },
    { title: "15th March, 2025", isDate: true },
    { title: "Necessitatibus sed officiis rerum omnis...", text: "Quia tempore corporis tempora asperiores..." },
    { title: "Qui rem dolores veniam vero qui.", text: "Impedit impedit necessitatibus quis ad..." },
    { title: "Quod eum dolore facilis optio modi...", text: "Est corporis explicabo necessitatibus..." },
    { title: "15th March, 2025", isDate: true },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      {isMobile ? (
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" p={3} gap={2}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{
              background: "#ffffff",
              flexGrow: 1,
              minWidth: "50px",
              maxWidth: "600px",
              padding: "5px 20px",
              borderRadius: "8px",
              "& fieldset": { border: "none" },
            }}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "action.active" }} />,
            }}
          />

          <Button
            variant="contained"
            sx={{
              background: colors.blueAccent[500],
              color: "#ffffff",
              width: "70%",
              height: "45px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={handletaskmodel}
          >
            Create New Task
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" p={3} gap={2}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{
              background: "#ffffff",
              flexGrow: 1,
              minWidth: "100px",
              maxWidth: "600px",
              padding: "5px 20px",
              borderRadius: "8px",
              "& fieldset": { border: "none" },
            }}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
            }}
          />

          <Button
            variant="contained"
            sx={{
              background: colors.blueAccent[500],
              color: "#ffffff",
              width: "15%",
              height: "45px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={handletaskmodel}
          >
            Create New Task
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 2,
        }}
      >
        {sections.map((section, index) => (
          <Box key={index} sx={{ padding: 2, backgroundColor: "#f9f9f9", borderRadius: 2, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", marginBottom: 1, fontSize:"16px" }}>
                {section.title}
              </Typography>
              <Typography sx={{ marginBottom: 2, fontWeight:"14px" }}>
                {section.text}
              </Typography>
            </Box>
            {section.isDate ? (
              <List>
                {["15th March, 2025", "15th March, 2025"].map((text, i) => (
                  <ListItem button key={i}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                15th March, 2025", "15th March, 2025
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Enter Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Description
          </Typography>
          <StyledTextField
            name="experienceDetails"
            multiline
            rows={4}
          />
          <Box display="flex" justifyContent="flex-start" gap={3}>
            <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor:colors.blueAccent[700], color:"#ffffff", fontSize:"14px", padding:"8px 32px"}} >
              Submit
            </Button>
            <Button onClick={handleCloseModal} sx={{fontSize:"14px", padding:"8px 32px", backgroundColor:"#475569", color:"#ffffff"}}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openTaskModal} onClose={handleTaskCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {formInstances.map((instance, index) => (
            <Formik
              key={instance.id}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={handleFormSubmit}
              innerRef={(ref) => (formRefs.current[index] = ref)}
            >
              {({ handleSubmit }) => (
                <Box>
                  <Typography variant="h6" sx={{}}>
                    Task {instance.id}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={`Task ${instance.id}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  {index > 0 && (
                    <Box display="flex" justifyContent="flex-start" mb={2} >
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
                        Remove Task
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Formik>
          ))}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddForm} 
            sx={{ 
              textTransform: "none",
              padding: "8px 16px",
              mt: 2
            }}
          >
            + Add Task
          </Button>
          <Box display="flex" justifyContent="flex-start" gap={3} mt={2}>
            <Button variant="contained" onClick={handleFormSubmit} sx={{backgroundColor:colors.blueAccent[700], color:"#ffffff", fontSize:"14px", padding:"8px 32px"}} >
              Submit
            </Button>
            <Button onClick={handleTaskCloseModal} sx={{fontSize:"14px", padding:"8px 32px", backgroundColor:"#475569", color:"#ffffff"}}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Tasks;