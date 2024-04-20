import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Snackbar,
	Table,
	TableCell,
	tableCellClasses,
	TableHead,
	TableRow,
	TableBody,
	TableContainer,
	Paper,
	TablePagination,
	FormControl,
	InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { UserContext } from "../../../UserContext";
import {readuserorders, orderupdate ,getRatings,updateRating,createRating} from "../../../api/user";
//import icon from '.../public/logo512.png';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const CustomerHome = () => {
	const { user, setUser } = useContext(UserContext);
    const { usertype, setUsertype } = useContext(UserContext);
    const { useremail, setUseremail } = useContext(UserContext);
	const history = useNavigate();

	const [users, setUsers] = useState([]);
	const [count, setCount] = useState(0);
	const [refresh, setRefresh] = useState("");
	const [showtable, setShowtable] = useState("1");
	const [buttoncolor,setButtoncolor] = useState("Customers");
	const [editflag,setEditFlag]=useState(false)
	// pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	// update Details
	const [TrackingID_u,setTrackingID_u] = useState("");
	const [OrderStatus_u,setOrderStatus_u] = useState("");

	const [ratings,setRatings] = useState([])
	const [newRatings, setNewRatings] = useState({});
  const [newReviews, setNewReviews] = useState({});
 

  const handleUpdateReview = async (trackingId) => {
	try {
	//   const { useremail } = useContext(UserContext);
  console.log("tfugjh,",newRatings[trackingId],newReviews[trackingId])
	  const updatedRating = newRatings[trackingId] !== undefined
		? newRatings[trackingId]
		: ratings.find(rating => rating.tracking_id === trackingId)?.rating;
  
	  const updatedReview = newReviews[trackingId] !== undefined
		? newReviews[trackingId]
		: ratings.find(rating => rating.tracking_id === trackingId)?.review_comment;
		console.log("fgbn,",updatedRating,updatedReview)
	  const res = await updateRating({
		TrackingID: trackingId,
		email: useremail,
		rating: updatedRating,
		review: updatedReview,
	  });
  
	  setEditFlag(false);
	  getRatings_here();
	  	  if (res.error) {
		toast.error(res.error);
	  } else {
		toast.success(res.message);
	  }
	} catch (error) {
	  console.error("Error updating review:", error.message);
	}
  };
  
	const handleCreateReview = async(trackingId) => {
		// console.log("in handle",trackingId,useremail,newRating,"example review 1")
		const x="example review 1"
        const res = await createRating({ TrackingID: trackingId, email: useremail, rating: newRatings[trackingId], review :newReviews[trackingId]});
        // setNewReview('');
		getRatings_here();
    };
	useEffect(()=>{
		console.log("")
	},[newRatings,newReviews,editflag])
	// console.log(user,usertype,useremail);
	const fetchOrders = async () => {
		// Event.preventDefault();
		try {
			// console.log('test',user,usertype,useremail);
			const { users, count, error } = await readuserorders({
				page: page + 1,
				perPage: rowsPerPage,
				userType: usertype,
				email: useremail
			});
			if (error) {
				setSnackbarOpen(true);
				setSnackbarMessage(error);
				return;
			}
			// set users
			setUsers(users);
			setCount(count);
			// set snackbar
			setSnackbarOpen(true);
			setSnackbarMessage(`${users?.length} order(s) fetched`);
		} catch (error) {
			setSnackbarOpen(true);
			setSnackbarMessage(error.message);
		}
	};

	useEffect(() => {
		fetchOrders();
			getRatings_here();
			console.log(useremail,"eamin in effect")
	}, []);

	useEffect(() => {
			fetchOrders();
			getRatings_here();
	}, [page, rowsPerPage,showtable,refresh,buttoncolor]);


	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 20));
		setPage(0);
	};

	const handleOrdersView= async () => {
		setButtoncolor('Orders');
	};

    const handleRating = ( rating,trackingId) => {
        setNewRatings({
          ...newRatings,
          [trackingId]: rating,
        });
      };
      const handleReview = ( review,trackingId) => {
        setNewReviews({
          ...newReviews,
          [trackingId]: review,
        });
      };
	const handleOrderUpdate= async (e) => {
		const res = await orderupdate({TrackingID_u, OrderStatus_u});
			if (res.error) toast.error(res.error);
			else {
				toast.success(res.message);
			}
			setRefresh(Math.random());
	};
	const getRatings_here= async () => {
		// console.log("getratings home")
		const res = await getRatings({email: useremail,});
			// console.log("jhfdnm,in getRatings")
			setRatings(res);
			console.log("blaaaaaaaaaaaaaaaaaaaaaaaaa:",res)
	};
	if(usertype == 10){
	return (
			<div className="bg-light vh-100">
				
					<div className="pt-1 px-5">
				<center><h1>Welcome, {user}</h1></center>
					</div>
					<div className="container mt-5 py-4 w-100 col-10 col-sm-8">
				
					<div>
							<Paper elevation={2}>
								<TableContainer sx={{ maxHeight: 350 }}>
									<Table stickyHeader>
										<TableHead>
											<TableRow>
												<StyledTableCell><b>Index</b></StyledTableCell>
												<StyledTableCell><b>Tracking ID</b></StyledTableCell>
												<StyledTableCell><b>Customer</b></StyledTableCell>
												{/* <StyledTableCell><b>From Address</b></StyledTableCell> */}
												<StyledTableCell><b>To Address</b></StyledTableCell>
												<StyledTableCell><b>Driver</b></StyledTableCell>
												<StyledTableCell><b>Order Status</b></StyledTableCell>
												<StyledTableCell><b>Present location</b></StyledTableCell>
												<StyledTableCell><b>Rate</b></StyledTableCell>
												<StyledTableCell><b>Review</b></StyledTableCell>		
											</TableRow>
										</TableHead>
										<TableBody>
										{users?.map(
												({TrackingID,Customer,Address_f,Address_t,Driver,OrderStatus,Location},index) => (
													<TableRow key={TrackingID} hover>
														<TableCell>{index + 1}</TableCell>
														<TableCell>{TrackingID}</TableCell>
														<TableCell>{Customer}</TableCell>
														{/* <TableCell>{Address_f}</TableCell> */}
														<TableCell>{Address_t}</TableCell>
														<TableCell>{Driver}</TableCell>
														<TableCell>{OrderStatus}</TableCell>
														<TableCell>{Location}</TableCell>
														
														<TableCell>
    {ratings.some((rating) => rating.tracking_id === TrackingID) ? (
        ratings
            .filter((rating) => rating.tracking_id === TrackingID)
            .map((p, index) => (
                <TextField
                    key={index}
                    type="number"
                    value={editflag?newRatings[TrackingID]:p.rating}
					onChange={(event) => handleRating(event.target.value,TrackingID)}

                    inputProps={{ min: 0, max: 7 }} // Adjust as per your rating system
                    // disabled // To prevent editing the rating directly
                />
            ))
    ) : (
        <div key={index}>
            <TextField
                type="number"
                value={newRatings[TrackingID]}
                onChange={(event) => handleRating(event.target.value,TrackingID)}
                inputProps={{ min: 0, max: 7 }} // Adjust as per your rating system
            />
            {/* <Button
                variant="contained"
                color="primary"
                onClick={() => handleCreateRating(TrackingID)}
            >
                Rate
            </Button> */}
        </div>
    )}
</TableCell>
<TableCell>
    {ratings.some((rating) => rating.tracking_id === TrackingID) ? (
        ratings
            .filter((rating) => rating.tracking_id === TrackingID)
            .map((p, index) => (
				<div>
                <TextField
                    key={index}
                    type="text"
                    value={editflag?newReviews[TrackingID]:p.review_comment}
					onChange={(event) => handleReview(event.target.value,TrackingID)}

                    // inputProps={{ min: 0, max: 7 }} // Adjust as per your rating system
                    // disabled // To prevent editing the rating directly
                />
				<Button
						variant="contained"
						color="primary"
						onClick={() => setEditFlag(true)}>
						Edit
					</Button>
					{editflag?<Button
						variant="contained"
						color="primary"
						onClick={() => handleUpdateReview(TrackingID)}>
						Rate
					</Button>: null}
					
					</div>
            ))):(<div key={index}>
					<TextField
						type="text"
						value={newReviews[TrackingID]}
						onChange={(event) => handleReview(event.target.value,TrackingID)}
						// inputProps={{ min: 0, max: 7 }} // Adjust as per your rating system
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={() => handleCreateReview(TrackingID)}
					>
						Rate
					</Button>
				</div>)
			
		}
</TableCell>



													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								</TableContainer>
								<TablePagination
									component="div"
									count={count}
									page={page}
									rowsPerPage={rowsPerPage}
									rowsPerPageOptions={[
										 10,20
									]}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									labelRowsPerPage={
										<div className="mt-3">Orders per page</div>
									}
									labelDisplayedRows={({ from, to, count }) => (
										<div className="mt-3">
											{from}-{to} of{" "}
											{count !== -1
												? count
												: `more than ${to}`}
										</div>
									)}
								/>
							</Paper>
					</div>
				<Snackbar
					open={snackbarOpen}
					onClose={() => setSnackbarOpen(false)}
					autoHideDuration={2000}
					message={snackbarMessage}
				/>
				</div>
		</div>
	);
}
else{
	return (
		<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-2 col-lg-10">
			<div className="text-center mb-5 alert">
				<label htmlFor="" className="h2">
					You don't have access to this page, please go back to home
				</label>
			</div>
		</div>
	);
}

return null;
};
export default CustomerHome;