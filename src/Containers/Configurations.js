import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Select,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { toast } from "react-toastify";
import errorMessages from "../Constants/ErrorMessages";

const Configurations = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedService, setSelectedService] = useState("Default");
  const [editValue, setEditValue] = useState("");
  const [editKey, setEditKey] = useState("");
  const [showInputFields, setShowInputFields] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const flag = false; //Flag to manage edit key funtionallity

  const base_url = "http://localhost:9000"; // Define the base URL here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/${selectedService}`);
        setRows(response.data);
      } catch (error) {
        toast.error(errorMessages.dataFetchError);
      }
    };

    fetchData();
  }, [selectedService]);

  const handleAddRow = async () => {
    if (key && value) {
      const newRow = { key, value, showValue: false, isEditing: false };
      try {
        await axios.post(`${base_url}/${selectedService}`, {
          key,
          value,
        });
        setRows((prevRows) => [...prevRows, newRow]);
        setKey("");
        setValue("");
        setShowInputFields(false);
      } catch (error) {
        toast.error(errorMessages.addKeyError);
      }
    }
  };

  const handleToggleRowValue = (index) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, showValue: !row.showValue } : row
      )
    );
  };

  const handleDeleteRow = async (index) => {
    const idToDelete = rows[index].id;

    if (
      window.confirm(
        `Are you sure you want to delete the key: ${rows[index].key}?`
      )
    ) {
      try {
        await axios.delete(`${base_url}/${selectedService}/${idToDelete}`);
        setRows((prevRows) => prevRows.filter((_, i) => i !== index));
      } catch (error) {
        toast.error(errorMessages.deleteKeyError);
      }
    }
  };

  const handleSelectChange = (event) => {
    setSelectedService(event.target.value);
    setShowInputFields(false);
  };

  const handleEditRow = (index) => {
    setEditKey(rows[index].key);
    setEditValue(rows[index].value);
    setEditIndex(index);
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, isEditing: true } : { ...row, isEditing: false }
      )
    );
  };

  const handleKeyChange = (index, newKey) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, key: newKey } : row))
    );
  };

  const handleValueChange = (index, newValue) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, value: newValue } : row
      )
    );
  };

  const handleCancelEdit = (index) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index
          ? { ...row, isEditing: false, key: editKey, value: editValue }
          : row
      )
    );
    setEditIndex(-1);
  };

  const handleConfirmEdit = async (index) => {
    if (rows[index].key.trim() !== "" && rows[index].value.trim() !== "") {
      try {
        await axios.put(
          `${base_url}/${selectedService}/${rows[editIndex].id}`,
          {
            key: rows[editIndex].key,
            value: rows[index].value,
          }
        );
        setRows((prevRows) =>
          prevRows.map((row, i) =>
            i === editIndex ? { ...row, isEditing: false } : row
          )
        );
        setEditIndex(-1);
      } catch (error) {
        console.error(errorMessages.updateKeyError);
      }
    } else {
      alert(errorMessages.keyValueEmptyError);
    }
  };

  const handleShowInputFields = () => {
    setShowInputFields(true);
  };

  const handleHideInputFields = () => {
    setKey("");
    setValue("");
    setShowInputFields(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      marginBottom="50px"
      marginTop="20px"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        marginBottom="20px"
      >
        <FormControl
          variant="outlined"
          style={{ minWidth: "175px" }}
          size="small"
        >
          <InputLabel htmlFor="select-services">Select Service</InputLabel>
          <Select
            label="Select Services"
            value={selectedService}
            onChange={handleSelectChange}
            inputProps={{
              name: "select-services",
              id: "select-services",
            }}
          >
            <MenuItem value="ICF">ICF</MenuItem>
            <MenuItem value="Hierarchy">Hierarchy</MenuItem>
            <MenuItem value="Default">Default</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            backgroundColor: "#333",
            color: "#fff",
            height: "40px",
          }}
          onClick={handleShowInputFields}
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>

      {showInputFields && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="20px"
          width="100%"
        >
          <TextField
            label="key"
            variant="outlined"
            size="small"
            fullWidth
            style={{ marginRight: "10px" }}
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <TextField
            label="value"
            variant="outlined"
            size="small"
            type="password"
            fullWidth
            style={{ marginRight: "10px" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#66bb6a",
              color: "#fff",
              height: "40px",
              marginRight: "10px",
              minWidth: "20px",
            }}
            onClick={handleAddRow}
          >
            <DoneRoundedIcon fontSize="medium" />
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#f6685e",
              color: "#fff",
              height: "40px",
              minWidth: "20px",
            }}
            onClick={handleHideInputFields}
          >
            <DeleteRoundedIcon />
          </Button>
        </Box>
      )}
      {rows.map((row, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="20px"
          width="100%"
        >
          <TextField
            label="key"
            variant="outlined"
            size="small"
            fullWidth
            style={{
              marginRight: "10px",
              backgroundColor: flag ? "#e8f5e9" : "transparent",
            }}
            value={row.key}
            onChange={(e) => handleKeyChange(index, e.target.value)}
            InputProps={{ readOnly: !flag }}
          />
          <TextField
            label="value"
            variant="outlined"
            size="small"
            type={row.showValue ? "text" : "password"}
            fullWidth
            style={{
              marginRight: "10px",
              backgroundColor: row.isEditing ? "#e8f5e9" : "transparent",
            }}
            value={row.value}
            onChange={(e) => handleValueChange(index, e.target.value)}
            InputProps={{
              readOnly: !row.isEditing,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle value visibility"
                    onClick={() => handleToggleRowValue(index)}
                    edge="end"
                  >
                    {row.showValue ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {row.isEditing ? (
            <>
              <Button
                variant="contained"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#66bb6a",
                  color: "#fff",
                  marginRight: "10px",
                  minWidth: "20px",
                }}
                onClick={() => handleConfirmEdit(index)}
              >
                <DoneRoundedIcon />
              </Button>
              <Button
                variant="contained"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#f6685e",
                  color: "#fff",
                  minWidth: "20px",
                }}
                onClick={() => handleCancelEdit(index)}
              >
                <CloseRoundedIcon />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#758694",
                  color: "#fff",
                  marginRight: "10px",
                  minWidth: "20px",
                }}
                onClick={() => handleEditRow(index)}
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#f6685e",
                  color: "#fff",
                  minWidth: "20px",
                }}
                onClick={() => handleDeleteRow(index)}
              >
                <DeleteRoundedIcon />
              </Button>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Configurations;
