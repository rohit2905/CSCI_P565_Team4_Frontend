import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const ServiceForm = ({ action, onSubmit }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            // Clear form after submission
            setFormData({});
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="service-form">
            {action === 'update' && (
                <input
                    type="hidden"
                    name="_method"
                    value="PUT"
                />
            )}
            <div className="form-group">
                <label htmlFor="carrierName">Carrier Name:</label>
                <input
                    type="text"
                    id="carrierName"
                    name="CarrierName"
                    value={formData.CarrierName || ''}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="serviceType">Service Type:</label>
                <input
                    type="text"
                    id="serviceType"
                    name="ServiceType"
                    value={formData.ServiceType || ''}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="dimension">Dimension:</label>
                <input
                    type="text"
                    id="dimension"
                    name="Dimension"
                    value={formData.Dimension || ''}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                    type="text"
                    id="price"
                    name="Price"
                    value={formData.Price || ''}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">{action === 'update' ? 'Update' : 'Add'}</button>
        </form>
    );
};

const Service = ({ service, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedService, setEditedService] = useState(service);

    const handleDelete = async () => {
        try {
            await onDelete(service._id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        try {
            await onUpdate(service._id, editedService);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setEditedService({ ...editedService, [e.target.name]: e.target.value });
    };

    return (
        <TableRow>
            <TableCell>{isEditing ? (
                <input
                    type="text"
                    value={editedService.CarrierName}
                    name="CarrierName"
                    onChange={handleChange}
                />
            ) : (
                service.CarrierName
            )}</TableCell>
            <TableCell>{isEditing ? (
                <input
                    type="text"
                    value={editedService.ServiceType}
                    name="ServiceType"
                    onChange={handleChange}
                />
            ) : (
                service.ServiceType
            )}</TableCell>
            <TableCell>{isEditing ? (
                <input
                    type="text"
                    value={editedService.Dimension}
                    name="Dimension"
                    onChange={handleChange}
                />
            ) : (
                service.Dimension
            )}</TableCell>
            <TableCell>{isEditing ? (
                <input
                    type="text"
                    value={editedService.Price}
                    name="Price"
                    onChange={handleChange}
                />
            ) : (
                service.Price
            )}</TableCell>
            <TableCell>
                {isEditing ? (
                    <>
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
            </TableCell>
            <TableCell>
                {!isEditing && (
                    <button onClick={handleDelete}>Delete</button>
                )}
            </TableCell>
        </TableRow>
    );
};

const ServiceList = ({ services, onDelete, onUpdate }) => (

    
    <div>
        <Paper elevation={2}>
            <TableContainer sx={{ maxHeight: 700 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Carrier Name</b></StyledTableCell>
                            <StyledTableCell><b>Service Type</b></StyledTableCell>
                            <StyledTableCell><b>Dimension</b></StyledTableCell>
                            <StyledTableCell><b>Price</b></StyledTableCell>
                            <StyledTableCell><b></b></StyledTableCell>
                            <StyledTableCell><b></b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <Service
                                key={service._id}
                                service={service}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </div>
);


const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        onSearch(value);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        onSearch('');
    };

    return (
        <center>
            <div style={{ position: 'relative', width: '25%', margin: '5px auto' }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '10px',
                        border: '3px solid gray',
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                />
                {searchQuery && (
                    <button
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'gray',
                        }}
                        onClick={handleClearSearch}
                    >
                        ❌
                    </button>
                )}
            </div>
        </center>
    );
};


const AddService = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        fetchServices();
    }, []); // Fetch services on component mount

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getallservices`);
            setServices(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addService = async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/addservice`, data);
            // After adding a service, fetch updated list of services
            fetchServices();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteService = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/removeservice/${id}`);
            // After deleting a service, fetch updated list of services
            fetchServices();

            const updatedServices = services.filter(service => service._id !== id);

            const filtered = updatedServices.filter(service =>
                service.CarrierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.ServiceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.Dimension.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.Price.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredServices(filtered);

        } catch (error) {
            console.error(error);
        }
    };

    const updateService = async (id, data) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/updateservice/${id}`, data);
            // After updating a service, fetch updated list of services
            fetchServices();

            const updatedServices = services.map(service => {
                if (service._id === id) {
                    return { ...service, ...data };
                }
                return service;
            });

            const filtered = updatedServices.filter(service =>
                service.CarrierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.ServiceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.Dimension.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.Price.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredServices(filtered);
        } catch (error) {
            console.error(error);
        }
    
    };

    const handleSearch = (query) => {
        // Filter services based on the search query
        setSearchQuery(query);
        const filtered = services.filter(service =>
            service.CarrierName.toLowerCase().includes(query.toLowerCase()) ||
            service.ServiceType.toLowerCase().includes(query.toLowerCase()) ||
            service.Dimension.toLowerCase().includes(query.toLowerCase()) ||
            service.Price.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredServices(filtered);
   
    };

    return (
        <div className="service-management">
            <center><h1 className="title">Service Management</h1></center>
            <div className="card-container">
                <ServiceForm action="add" onSubmit={addService} />
            </div>
            <SearchBar onSearch={handleSearch} />
            <ServiceList
                services={filteredServices.length > 0 ? filteredServices : services}
                onDelete={deleteService}
                onUpdate={updateService}
            />
        </div>
    );
};

export default AddService;
