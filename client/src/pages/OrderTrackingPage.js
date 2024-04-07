import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import '../styles/OrderTrackingPage.css';
import { TextField,Button } from "@mui/material";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Geocode from "react-geocode";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { FiShoppingCart, FiUser, FiShoppingBag, FiFastForward, FiTruck, FiGift } from "react-icons/fi";

import { toast } from "react-toastify";
import { orderstatus } from "../api/user";
import moment from 'moment';

export class OrderTracking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courier: '',
            status: '',
            eod: '',
            statusnum: 0,
            text:'',
            lat:0,
            lng:0,
            location:'',
            trackingID:''
        };
    
        this.getLatLong = this.getLatLong.bind(this);
        this.handleOrderStatus = this.handleOrderStatus.bind(this);
      }

      async getLatLong() {
 
            // Get latitude & longitude of driver location.
            // TODO: please remember, this api key is not a valid one, change it while implementings
          Geocode.setApiKey("AIzaSyACybbAcszV_rSnDy38jbbjsWDDw1mT0wo");
            Geocode.setLanguage("en");
            Geocode.setRegion("us");
            Geocode.setLocationType("ROOFTOP");
            var response = await Geocode.fromAddress(this.state.location);
            var { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            this.setState({lat:lat, lng:lng}); 
      };

    async handleOrderStatus ()  {
        this.setState({statusnum:0,text:0});
		console.log(TrackingID);
        var TrackingID = this.state.trackingID;
		var res = await orderstatus({TrackingID});
        console.log(res);
			if (res.error) toast.error(res.error);
			else {
                console.log(res.Carrier, res.OrderStatus);
				toast.success(res.message);
			}
        this.setState({courier:res.Carrier, status: res.OrderStatus, location: res.Location});
        console.log(this.state.location);
        if(!this.state.location){
            this.setState({text:1});
        }
        let statusArray = ["order placed", "driver assigned", "order picked up", "in transit", "out for delivery", "order delivered"];
        for (let i = 0; i < statusArray.length; i++){
            if (statusArray[i]==res.OrderStatus){
                this.setState({statusnum: i+1, eod:moment().add(6-i, 'days').format('MMMM Do YYYY')});
                break;
            }
        }
        this.getLatLong();
	};

    render(){
    return (
        <div className= "mt-5 mx-5">     
            {/* <div class="container padding-bottom-3x mb-1"> */}
                <div className="container p-3">
                <TextField             
                    sx={{mt:1}}
					size="small"
					className="form-control"
					label="Enter Tracking Number"
					value={this.state.trackingID}
					onChange={(e) => this.setState({trackingID: e.target.value})}
                />
                
                <Button
                    sx={{mt:1}}
                    size="small"
					variant="contained"
                    className="form-control"
					disabled={!this.state.trackingID}
					onClick={this.handleOrderStatus}
				>
					Track my order
				</Button>
                </div>

                <div>
                    <div className="p-4 text-center text-white text-lg bg-dark rounded-top"><span className="text-uppercase">Tracking Order No - </span>
                        <span className="text-medium"> 
                            {this.state.trackingID}
                        </span>
                    </div>
                    <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                        <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped Via:</span> {this.state.courier}</div>
                        <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span> {this.state.status}</div>
                        <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected Delivery Date:</span> {this.state.eod}</div>
                                                    </div>
                                
                                <div className="card-body">
                    <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                        <div className={`${this.state.statusnum >= 1 ? "step completed" : "step"}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><FiShoppingCart /></div>
                            </div>
                            
                            <h4 className="step-title">Order Placed</h4>
                                </div>

                                <div className={`${this.state.statusnum >= 2 ? "step completed" : "step"}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><FiUser /></div>
                            </div>
                            
                            <h4 className="step-title">Driver Assigned</h4>
                                </div>
                    
                                <div className={`${this.state.statusnum >= 3 ? "step completed" : "step"}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><FiShoppingBag /></div>
                            </div>
                            
                            <h4 className="step-title">Order Picked Up</h4>
                                </div>
                                
                                <div className={`${this.state.statusnum >= 4 ? "step completed" : "step"}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><FiFastForward /></div>
                            </div>
                            
                            <h4 className="step-title">In Transit</h4>
                                </div>
                                
                                <div className={`${this.state.statusnum >= 5 ? "step completed" : "step"}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><FiTruck /></div>
                            </div>

                            <h4 className="step-title">Out for Delivery</h4>
                                </div>
                                
                                <div className={`${this.state.statusnum >= 6 ? "step completed" : "step"}`}>
                            <div className="step-icon-wrap">
                                <div className="step-icon"><FiGift /></div>
                            </div>

                            <h4 className="step-title">Order Delivered</h4>
                        </div>
                    </div>
                </div>
</div>

                    <div style={{align:"center", visibility: `${(!this.state.location)? "hidden" : "visible"}`}}>
                    <div className='google-map' >
                    <h5 style={{color: '#000000',display: 'inline-block'}}><b>Package Location:&nbsp;</b></h5> 
                    <h5 style={{display: 'inline-block'}}>{this.state.location}</h5> 
                        <Map  
                            key={this.state.lat && this.state.lng}
                            google={this.props.google}
                            zoom={12}
                            style={{
                                width: '40%',
                                height: '40%',
                            }}
                            initialCenter={{ lat: (this.state.lat), lng: (this.state.lng)}}
                            >
                        <Marker 
                            position={{ lat: this.state.lat, lng: this.state.lng}} 
                            />
                        </Map>
                    </div>
                    </div>
                    <div style={{align:"center", visibility: `${(this.state.text==1)? "visible" : "hidden"}`}}>
                    <h5 style={{color: 'white',display: 'inline-block'}}>Driver hasn't updated the location yet!</h5>
                    </div>
                
                
                {/* <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                    <div class="custom-control custom-checkbox mr-3">
                        <input class="custom-control-input" type="checkbox" id="notify_me" checked="" />
                        <label class="custom-control-label" for="notify_me">Notify me when order is delivered</label>
                    </div>
                    
                    <div class="text-left text-sm-right"><a class="btn btn-outline-primary btn-rounded btn-sm" href="#">View Order Details</a></div>
                </div> */}
            {/* </div> */}
        </div>
    );
}
}
// TODO: use a valid api-key
export default GoogleApiWrapper({
    apiKey: "AIzaSyACybbAcszV_rSnDy38jbbjsWDDw1mT0wo"
    })(OrderTracking);