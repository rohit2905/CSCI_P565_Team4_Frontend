import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"
import { UserContext } from "../UserContext";
import Select from '@mui/material/Select';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

// design
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
} from "@mui/material";

import MenuItem from '@mui/material/MenuItem';


// functions
import { OrderDetails, orderemail } from "../api/user";


const Order = () => {
	const history = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const { usertype, setUsertype } = useContext(UserContext);
	const { useremail, setUseremail } = useContext(UserContext);
	//var check = undefined;

	// form states
	const [Email_f, setEmail_f] = useState(useremail);
	const [Address_f, setAddress_f] = useState("");
	const [Street_f, setStreet_f] = useState("");
	const [Apt_f, setApt_f] = useState("");
	const [City_f, setCity_f] = useState("");
	const [State_f, setState_f] = useState("");
	const [Zip_f, setZip_f] = useState("");
	const [Address_t, setAddress_t] = useState("");
	const [Street_t, setStreet_t] = useState("");
	const [Apt_t, setApt_t] = useState("");
	const [City_t, setCity_t] = useState("");
	const [State_t, setState_t] = useState("");
	const [Zip_t, setZip_t] = useState("");
	const [Size, setSize] = useState("");
	const [Weight, setWeight] = useState("0");
	const [Fedex, setFedex] = useState("");
	const [Ups, setUps] = useState("");
	const [Usps, setUsps] = useState("");
	const [Carrier, setCarrier] = useState("");
	const [CarrierSug, setCarrierSug] = useState("");
	const [Cost, setCost] = useState("");
	const [Userselection, setUserselection] = useState("You haven't selected any carrier yet");
	const [priority, setPriority] = useState("");
	const [PriorityStatus, setPriorityStatus] = useState("");
	const [TrackingID, setTrackingID] = useState("");
	const [Paynow, setPaynow] = useState("");
	// Paypal
	const [show, setShow] = useState(false);
	const [success, setSuccess] = useState(false);
	const [ErrorMessage, setErrorMessage] = useState("");
	const [orderID, setOrderID] = useState(false);

	const [carriers, setCarriers] = useState([]);
	const [selectedCarrier, setSelectedCarrier] = useState(null);
	const [userSelection, setUserSelection] = useState('');
	const [distance, setDistance] = useState(1); // Assuming you have a way to set this
	const [costs, setCosts] = useState({});
	const [carrierSuggestion, setCarrierSuggestion] = useState('');

	if (user) {
		var email_show = 'hidden';
	} else {
		var email_show = 'visible';
	}

	// 'You have slected '&{Carrier}&', which costs '&{Cost}
	//Functions
	function make_visible(div) {
		var divbox = document.getElementById(div);
		divbox.style.visibility = 'visible';

	}

	// Fetch carriers on component mount
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/getallservices`)
			.then(response => setCarriers(response.data))
			.catch(error => console.error("Failed to fetch carriers", error));
	}, []);

	useEffect(() => {
		setDistance(Math.abs(Zip_f - Zip_t) == 0 ? 1 : Math.abs(Zip_f - Zip_t));
		//handleQuotations();
	}, [carriers, distance, priority]);


	const handleQuotations = async (e) => {
		make_visible('Quotations');
		
		let tempCosts = {};
		carriers.forEach(carrier => {
			if (Size === carrier.Dimension) {
			const key = `${carrier.CarrierName} - ${carrier.ServiceType}`; // Unique key
			tempCosts[key] = parseInt(parseInt(Weight) + ((distance) / 2 * priority * carrier.Price));
			}
		});
		console.log(tempCosts);
		//let cheapest = carriers.reduce((a, b) => tempCosts[a.CarrierName] < tempCosts[b.CarrierName] ? a : b, carriers[0]);
		let cheapestKey = null;
		let lowestPrice = Infinity;
		for (const [key, price] of Object.entries(tempCosts)) {
			if (price < lowestPrice) {
				lowestPrice = price;
				cheapestKey = key;
			}
		}
		setCosts(tempCosts);
		setSelectedCarrier(cheapestKey);
		setUserSelection(`Recommended: ${cheapestKey} as it offers the best rate.`);
		setCarrierSuggestion(cheapestKey);
		setPaynow("");
		//setCarrierSug(carrie_coice);
		
		setAddress_f(Street_f.concat(", ", Apt_f, ", ", City_f, ", ", State_f, ", ", Zip_f));
		setAddress_t(Street_t.concat(", ", Apt_t, ", ", City_t, ", ", State_t, ", ", Zip_t));
		if (priority > 1) {
			setPriorityStatus("Priority");
		} else {
			setPriorityStatus("Normal");
		}
		//console.log(Fedex,Ups,Usps,Carrier,Cost,Priority);
	};

	const handleCarrierSelection = (carrierName, serviceType) => {
		make_visible('Paynow');
		setSelectedCarrier(carrierName+" - "+serviceType);
		setCarrier(carrierName);
		setUserSelection(`You have selected ${carrierName + " - " + serviceType}, which costs $${costs[carrierName + " - " + serviceType]}.`);
		setCost(costs[carrierName + " - " + serviceType])
		setPaynow(1);
	};


	const handlePayment = async (e) => {
		make_visible('Paypal');
		setShow(true);
		console.log(Cost);
		var tId = Math.random();
		tId = tId * 100000000;
		tId = parseInt(tId);
		setTrackingID(tId);
	
	};

	const paymentupdate = async (e) => {
		var PaymentStatus = 'Paid';
		var Customer = useremail || Email_f;
		var OrderStatus = "order placed";
		const res = await OrderDetails({ TrackingID, Address_f, Address_t, Cost, Carrier, Size, Weight, PriorityStatus, PaymentStatus, Customer });
		const res2 = await orderemail({ Customer, Cost, TrackingID });
	};

	// Paypal

	// creates a paypal order
	const createOrder = (data, actions) => {
		return actions.order.create({
			
			purchase_units: [{
				description: "DeliverWise Shipping Option",
				amount: { currency_code: "USD", value: Cost, },
			},],
			// not needed if a shipping address is actually needed
			application_context: { shipping_preference: "NO_SHIPPING", },
		})
			.then((orderID) => { setOrderID(orderID); return orderID; });
	};

	// check Approval
	const onApprove = (data, actions) => {
		return actions.order.capture().then(function (details) {
			const { payer } = details;
			// console.log(payer); // added new
			setSuccess(true);
			// console.log(Cost);
			paymentupdate();
			toast.success("Order has been successfully placed. Please check email for details");
			// console.log(usertype);
			if (usertype == 10) {
				history("/Customer");
			} else if (usertype == 20) {
				history("/Driver");
			} else if (usertype == 30) {
				history("/Manager");
			} else {
				history(`/`);
			}
		});
	};
	//capture likely error
	const onError = (data, actions) => {
		setErrorMessage("An Error occured with your payment ");
		toast.error("An Error occured with your payment. PLease try again!");
		history.replace("/order");
	};

	let navigate = useNavigate();
	return (
		<div>
			<div className="grid-wrapper">
			<div className="grid-item" style={{ padding: '20px', maxWidth: '400px', margin: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff' }}>
				<div>
					<div className="text-center mb-2 alert" style={{ marginBottom: '16px' }}>
						<label htmlFor="" className="h6" style={{ fontWeight: 'bold' }}>
							From Address
						</label>
					</div>
					<div className="form-group-order" style={{ marginBottom: '16px' }}>
						<TextField
							sx={{ mb: 1, width: '100%' }}
							size="small"
							variant="outlined"
							className="form-control-order"
							label="Street"
							value={Street_f}
							onChange={(e) => setStreet_f(e.target.value)}
						/>
					</div>
					<div className="form-group-order" style={{ marginBottom: '16px' }}>
						<TextField
							sx={{ mb: 1, width: '100%' }}
							size="small"
							variant="outlined"
							className="form-control-order"
							label="Apt No."
							value={Apt_f}
							onChange={(e) => setApt_f(e.target.value)}
						/>
					</div>
					<div className="form-group-order" style={{ marginBottom: '16px' }}>
						<TextField
							sx={{ mb: 1, width: '100%' }}
							size="small"
							variant="outlined"
							className="form-control-order"
							label="City"
							value={City_f}
							onChange={(e) => setCity_f(e.target.value)}
						/>
					</div>
					<div className="form-group-order" style={{ marginBottom: '16px' }}>
						<TextField
							sx={{ mb: 1, width: '100%' }}
							size="small"
							variant="outlined"
							className="form-control-order"
							label="State"
							value={State_f}
							onChange={(e) => setState_f(e.target.value)}
						/>
					</div>
					<div className="form-group-order" style={{ marginBottom: '16px' }}>
						<TextField
							sx={{ mb: 1, width: '100%' }}
							size="small"
							variant="outlined"
							className="form-control-order"
							label="Zip Code"
							value={Zip_f}
							onChange={(e) => setZip_f(e.target.value)}
						/>
						<TextField
							sx={{ mb: 1, width: '100%', display: email_show ? 'block' : 'none' }} // Conditional display based on email_show state
							size="small"
							variant="outlined"
							label="Email"
							onChange={(e) => setEmail_f(e.target.value)}
						/>
					</div>
				</div>
			</div>


				<div className="grid-item" style={{ padding: '20px', maxWidth: '400px', margin: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff' }}>
					<div>
						<div className="text-center mb-2 alert">
							<label htmlFor="" className="h6">
								<b>To Address</b>
							</label>
						</div>
						<div className="form-group-order">
							<TextField
								sx={{ mb: 1, width: '100%' }}
								size="small"
								variant="outlined"
								className="form-control-order"
								label="Street"
								value={Street_t}
								onChange={(e) => setStreet_t(e.target.value)}
							/>
						</div>
						<div className="form-group-order">
							<TextField
								sx={{ mb: 1, width: '100%' }}
								size="small"
								variant="outlined"
								className="form-control-order"
								label="Apt No."
								value={Apt_t}
								onChange={(e) => setApt_t(e.target.value)}
							/>
						</div>
						<div className="form-group-order">
							<TextField
								sx={{ mb: 1, width: '100%' }}
								size="small"
								variant="outlined"
								className="form-control-order"
								label="City"
								value={City_t}
								onChange={(e) => setCity_t(e.target.value)}
							/>
						</div>
						<div className="form-group-order">
							<TextField
								sx={{ mb: 1, width: '100%' }}
								size="small"
								variant="outlined"
								className="form-control-order"
								label="State"
								value={State_t}
								onChange={(e) => setState_t(e.target.value)}
							/>
						</div>
						<div className="form-group-order">
							<TextField
								sx={{ mb: 1, width: '100%' }}
								size="small"
								variant="outlined"
								className="form-control-order"
								label="Zip Code"
								value={Zip_t}
								onChange={(e) => setZip_t(e.target.value)}
							/>
						</div>
					</div>
				</div>

				
				<div className="grid-item" style={{ padding: '20px', maxWidth: '400px', margin: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff' }}>
				<div>
					<div className="text-center mb-2 alert">
						<label htmlFor="" className="h6">
							<b>Delivery Product Details</b>
						</label>
					</div>

					<div>
						<FormControl variant="outlined" sx={{ mb: 1 }} fullWidth>
							<InputLabel id="demo-simple-select-label">Size</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={Size}
								label="Size"
								type="text"
								onChange={(e) => setSize(e.target.value)}
							>
								<MenuItem value={'Small'}>Small</MenuItem>
								<MenuItem value={'Medium'}>Medium</MenuItem>
								<MenuItem value={'Large'}>Large</MenuItem>
							</Select>
						</FormControl>
					</div>

					<div className="form-group">
						<TextField
							sx={{ mb: 1 }}
							size="small"
							variant="outlined"
							className="form-control"
							label="Weight (in lbs)"
							value={Weight}
							onChange={(e) => setWeight(e.target.value)}
						/>
					</div>
					<div>
						<FormControl variant="outlined" sx={{ mb: 1 }} fullWidth>
							<InputLabel id="demo-simple-select-label">Priority</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={priority}
								label="Size"
								type="text"
								onChange={(e) => setPriority(e.target.value)}
							>
								<MenuItem value={1}>Normal</MenuItem>
								<MenuItem value={1.5}>Priority</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className="text-center mt-4">
						<Button
							variant="contained"
							disabled={!Street_f || !City_f || !State_f || !Zip_f ||
								!Street_t || !City_t || !State_t || !Zip_t ||
								!Size || !Weight || !priority || (!user && !Email_f)}
							onClick={handleQuotations}
						>
							Get Quotations
						</Button>
					</div>
				</div>
			</div>

			
			</div>

			

			<div id='Quotations' style={{ display: 'flex', visibility: 'hidden',
				flex: 1,
				paddingRight: '20px', // Adds space on the right for consistency
				borderRight: '2px solid #ccc', // Adds a border line to separate from the right partition
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow for depth
				padding: '20px', // Adds spacing inside the partition
				backgroundColor: '#f9f9f9', // Light background color for contrast
				borderRadius: '5px', // Softens the corners
				marginRight: '20px',
				}}>
				
				{/* Left Partition */}
				<div style={{ flex: 1 }}>
					<center><div className="text-center mb-2 alert" style={{ marginBottom: '20px' }}>
						<label htmlFor="" className="h6" style={{
							fontWeight: 'bold', // Makes text bold
							fontSize: '24px', // Larger text for better visibility
							color: '#333', // Dark text for contrast
						}}>Quotations</label>
					</div>
						<div style={{ textAlign: 'center', fontSize: '16px' }}>
							<div>
								<span style={{
									display: 'inline-block',
									width: '16px',
									height: '16px',
									backgroundColor: 'rgba(45, 207, 27, 0.5)',
									border: '1px solid black',
									marginRight: '5px',
									verticalAlign: 'middle'
								}}></span>
								Selected Carrier
							</div>
							<div>
								<span>★</span>
								<span style={{
									display: 'inline-block',
									width: '16px',
									height: '16px',
									backgroundColor: '#ed9624',
									border: '1px solid black',
									marginRight: '5px',
									verticalAlign: 'middle'
								}}></span>
								Recommended Carrier
							</div>
							<div>
								<span style={{
									display: 'inline-block',
									width: '16px',
									height: '16px',
									backgroundColor: 'rgba(255, 255, 255, 0.4)',
									border: '1px solid black',
									marginRight: '5px',
									verticalAlign: 'middle'
								}}></span>
								Other Carriers
							</div>
						</div>
					</center>
					<div className="grid-wrapper-list">
						
						{carriers.filter(carrier => Size === carrier.Dimension).map((carrier) => (
							<div key={carrier.name} className="grid-item" onClick={() => handleCarrierSelection(carrier.CarrierName, carrier.ServiceType)} style={{
								marginBottom: '15px',
								padding: '10px',
								boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
								borderRadius: '10px',
								border: '1px solid rgba(255, 255, 255, 0.18)',
								backgroundColor: selectedCarrier === carrier.CarrierName + " - " + carrier.ServiceType ? 'rgba(45, 207, 27, 0.5)' : (carrierSuggestion === carrier.CarrierName+" - "+carrier.ServiceType ? '#ed9624' : '#f2f2f2'),
								backdropFilter: 'blur(5px)',
								WebkitBackdropFilter: 'blur(5px)',
							}}>
								<div className="one1" style={{ marginBottom: '10px' }}>
									<div className="text-center mb-2 alert">
										<label htmlFor="" className="h8" style={{ fontSize: '18px', color: '#555' }}>
											<b>{carrier.CarrierName} {carrier.ServiceType}<br />({PriorityStatus})</b>
											{carrierSuggestion === carrier.CarrierName+" - "+carrier.ServiceType ? <>&nbsp;<span><b>★</b></span></> : null}
										</label>
									</div>
								</div>
								<div className="two1" style={{ marginBottom: '10px' }}>
									<div className="text-center mb-2 alert">
										<label htmlFor="" className="h8" style={{ fontSize: '25px', color: '#555' }}>
											<b>${costs[carrier.CarrierName+" - "+carrier.ServiceType]}</b>
										</label>
									</div>
								</div>
								<div className="three1">
									<div className="text-center mt-4">
										
									</div>
								</div>
							</div>
						))}
					</div>
					
				</div>

				{/* Right Partition */}
				<div style={{
					flex: 1,
					paddingLeft: '20px',
					borderLeft: '2px solid #ccc', // Adds a border line to separate from the left partition
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow for depth
					padding: '20px', // Adds spacing inside the partition
					backgroundColor: '#f9f9f9', // Light background color for contrast
					borderRadius: '5px', // Softens the corners
					marginLeft: '20px', // Adds space between the partitions
				}}>
					<div className="text-center mb-2 alert" style={{ marginBottom: '20px' }}>
						<label htmlFor="" className="h8" style={{
							fontWeight: 'bold', // Makes text bold
							fontSize: '20px', // Larger text for better visibility
							color: '#333', // Darker text for contrast
							textDecoration: 'underline', // Underlines the suggestion for emphasis
						}}>We suggest going with {carrierSuggestion}</label>
					</div>

					<div className="text-center mb-2 alert" style={{ marginBottom: '20px', paddingBottom: '10px' }}>
						<label htmlFor="" className="h8" style={{
							fontSize: '18px', // Slightly smaller text than the suggestion for hierarchy
							color: '#555', // Slightly lighter text color
							fontStyle: 'italic', // Italicizes the selection for distinction
						}}>{userSelection}</label>
					</div>
					<div id="Paynow" style={{ visibility: 'hidden' }} className="text-center mt-4">
						<Button variant="contained" disabled={!Paynow} onClick={handlePayment} style={{
							backgroundColor: '#007bff', // Example button color
							color: 'white', // Text color for the button
							fontWeight: 'bold', // Bold text for the button
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Adds shadow to the button for depth
						}}>
							Pay now!
						</Button>
					</div>


					<center>
						<div id="Paypal" style={{ visibility: 'hidden' }} className="grid-item">
							<PayPalScriptProvider options={{ "client-id": "AQkWnOy6_u2JcRcgC4RuUjHqM0H4QrIWAbLZYyEmS1W_dsfHPxK5k4GtD-0GrWsg3D67Y_YXVLfeGHht" }}>
								<div>
									{show ? (
										<PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} />
									) : null}
								</div>
							</PayPalScriptProvider>
						</div>
					</center>
				</div>
			</div>
</div>
			
	
		
	

																																																																																				)
};
export default Order;