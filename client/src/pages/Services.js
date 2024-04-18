import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './Services.css'; 

const Services = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filters, setFilters] = useState({
        ServiceType: '',
        CarrierName: '',
        Dimension: '',
        PriceRange:''
    });
    const [searchText, setSearchText] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [sortDirection, setSortDirection] = useState('');
    useEffect(() => {
        fetchItems();
    }, []); 

    const fetchItems = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/getallservices`);
            const data = await response.json();
            setItems(data);
            setFilteredItems(data); 
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    useEffect(() => {
        
        applyFilters();
    }, [items, filters,sortDirection]);
    useEffect(() => {
        if(searchClicked==true){
        applyFilters();}
    }, [  searchClicked]);
    useEffect(() => {

    }, [searchText]);
    // useEffect(() => {
    //     handleSort();
    // }, [sortDirection]);

    const handleSort = (sortedItems) => {
        return sortedItems.sort((a, b) => {
          const priceA = parseFloat(a.Price);
          const priceB = parseFloat(b.Price);
          return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
        });
      };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    };
    const applyFilters = () => {
        let filtered = [...items];
        for (const key in filters) {
            if (key === 'PriceRange') {
                switch (filters[key]) {
                    case '0-15':
                        filtered = filtered.filter(item => item.Price >= 0 && item.Price <= 15);
                        break;
                    case '15-20':
                        filtered = filtered.filter(item => item.Price > 15 && item.Price <= 20);
                        break;
                    case '>20':
                        filtered = filtered.filter(item => item.Price > 20);
                        break;
                    default:
                        break;
                }
            } 
            else if (filters[key] !== '') {
                filtered = filtered.filter(item => item[key] === filters[key]);
            }
        }
        if (searchClicked && searchText.trim() !== '') {
            const keyword = searchText.toLowerCase();
            filtered = filtered.filter(item =>
                Object.values(item).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(keyword)
                )
            );
        }
        // const sortedItems = filtered.sort((a, b) => {
        //     if (a[sortConfig.key] < b[sortConfig.key]) {
        //         return sortConfig.direction === 'ascending' ? -1 : 1;
        //     }
        //     if (a[sortConfig.key] > b[sortConfig.key]) {
        //         return sortConfig.direction === 'ascending' ? 1 : -1;
        //     }
        //     return 0;
        // });
        // setFilteredItems(sortedItems);
        const sortedFilteredItems = handleSort(filtered);
        setFilteredItems(sortedFilteredItems);
        setSearchClicked(false);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };
    // const handleSortChange = (key) => {
    //     setSortConfig(prevSortConfig => ({
    //         key,
    //         direction: prevSortConfig.direction === 'ascending' && prevSortConfig.key === key ? 'descending' : 'ascending'
    //     }));
    // };
    const handleResetFilters = () => {
        setFilters({
            ServiceType: '',
            CarrierName: '',
            Dimension: '',
            PriceRange: '', 
        });
        setSearchText('');
        setSearchClicked(false);
        setFilteredItems(items); 
    };

    const handleSearchClick = () => {
        setSearchClicked(true);
    };

    const handleSearch = () => {
        setSearchClicked(false);
    };

    return (
        <div className="services-container">
            <h1>Services</h1>
            <div className="filters">
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="carrier-name-label">Select Carrier Name</InputLabel>
                    <Select
                        labelId="carrier-name-label"
                        id="carrier-name-select"
                        value={filters.CarrierName}
                        name="CarrierName"
                        onChange={handleFilterChange}
                        label="Select Carrier Name"
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {[...new Set(filteredItems.map(item => item.CarrierName))].map((name, index) => (
                            <MenuItem key={index} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="service-type-label">Select Service Type</InputLabel>
                    <Select
                        labelId="service-type-label"
                        id="service-type-select"
                        value={filters.ServiceType}
                        name="ServiceType"
                        onChange={handleFilterChange}
                        label="Select Service Type"
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {[...new Set(filteredItems.map(item => item.ServiceType))].map((type, index) => (
                            <MenuItem key={index} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="dimension-label">Select Dimension</InputLabel>
                    <Select
                        labelId="dimension-label"
                        id="dimension-select"
                        value={filters.Dimension}
                        name="Dimension"
                        onChange={handleFilterChange}
                        label="Select Dimension"
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {[...new Set(filteredItems.map(item => item.Dimension))].map((dimension, index) => (
                            <MenuItem key={index} value={dimension}>{dimension}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="price-range-label">Select Price Range</InputLabel>
                    <Select
                        labelId="price-range-label"
                        id="price-range-select"
                        value={filters.PriceRange}
                        name="PriceRange"
                        onChange={handleFilterChange}
                        label="Select Price Range"
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="0-15">$0 - $15</MenuItem>
                        <MenuItem value="15-20">$15 - $20</MenuItem>
                        <MenuItem value=">20">More than $20</MenuItem>
                    </Select>
                </FormControl>
                <IconButton onClick={() => toggleSortDirection('Price')} sx={{ p: '10px' }}>
                    <SortIcon />
                    {sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ m: 1, minWidth: 200 }}
                />
                <IconButton onClick={handleSearchClick} sx={{ p: '10px' }}>
                    <SearchIcon />
                </IconButton>
                <Button variant="contained" onClick={handleResetFilters} sx={{ m: 1 }}>
                    Reset
                </Button>
            </div>
            <div className="card-container">
                {filteredItems.map((item) => (
                    <div key={item._id} className="card">
                        <strong>Service Type:</strong> {item.ServiceType}<br />
                        <strong>Carrier Name:</strong> {item.CarrierName}<br />
                        <strong>Dimension:</strong> {item.Dimension}<br />
                        <strong>Price:</strong> ${item.Price}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
