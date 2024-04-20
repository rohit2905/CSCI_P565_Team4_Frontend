import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { LineSeries, XYPlot, VerticalBarSeries, DiscreteColorLegend, Hint ,XAxis,YAxis} from 'react-vis';
import 'react-vis/dist/style.css';
import { fetchOrderData_admin } from "../api/user"; // Assuming you have an API function to fetch order data
import { Card, CardContent, Typography, Grid } from "@material-ui/core"; // Import Material-UI components

const DashboardAdmin = () => {
    const { user, setUser } = useContext(UserContext);
    const { useremail, setUseremail } = useContext(UserContext);

    const [orderData, setOrderData] = useState([]);
    const [averageOrderValue, setAverageOrderValue] = useState(0);
    const [carrierDistribution, setCarrierDistribution] = useState([]);
    const [orderStatusDistribution, setOrderStatusDistribution] = useState([]);
    const [hoveredBar, setHoveredBar] = useState(null);
    const [hoveredLine, setHoveredLine] = useState(null);
    const [mostUsedCarrier, setMostUsedCarrier] = useState("");
    useEffect(() => {
        if (user && useremail) {
            fetchData();
        }
    }, [user]);
useEffect(()=>{
console.log("")
},[carrierDistribution,orderStatusDistribution,orderData,averageOrderValue])
    const fetchData = async () => {
        try {
            // Fetch order data from the backend
            const data = await fetchOrderData_admin({ email: useremail });

            // Process data and set state
            setOrderData(data.orders);

            // Calculate Average Order Value
            const totalAmount = orderData.reduce((acc, order) => acc + parseFloat(order.cost), 0);
            
            const avgOrderValue = orderData.length > 0 ? totalAmount / data.orders.length : 0;
            setAverageOrderValue(avgOrderValue);
            console.log(totalAmount,avgOrderValue)
            const counts = data.orders.reduce((counts, order) => {
                counts[order.Carrier] = (counts[order.Carrier] || 0) + 1;
                return counts;
            }, {});
            const mostUsedCarrier = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            setMostUsedCarrier(mostUsedCarrier);
            // Calculate Carrier Distribution
            const carrierCounts = {};
            data.orders.forEach(order => {
                carrierCounts[order.Carrier] = (carrierCounts[order.Carrier] || 0) + 1;
            });
            const carrierDistributionData = Object.entries(carrierCounts).map(([carrier, count]) => ({
                x: carrier,
                y: count
            }));
            setCarrierDistribution(carrierDistributionData);

            // Calculate Order Status Distribution
            const orderStatusCounts = {};
            data.orders.forEach(order => {
                orderStatusCounts[order.OrderStatus] = (orderStatusCounts[order.OrderStatus] || 0) + 1;
            });
            const orderStatusDistributionData = Object.entries(orderStatusCounts).map(([status, count]) => ({
                x: status,
                y: count
            }));
            setOrderStatusDistribution(orderStatusDistributionData);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    // Define colors for the graphs
    const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545'];

    // Tooltip format for the bar graph
    const barTooltip = hoveredBar && (
        <Hint value={hoveredBar} style={{ fontSize: '14px', fontWeight: 'bold', color: 'orange' }}>
            <div>
                <p style={{ color: hoveredBar.color }}>Carrier: <strong>{hoveredBar.x}</strong></p>
                <p style={{ color: hoveredBar.color }}>Orders: <strong>{hoveredBar.y}</strong></p>
            </div>
        </Hint>
    );

    // Tooltip format for the line graph
    const lineTooltip = hoveredLine && (
        <Hint value={hoveredLine} style={{ fontSize: '14px', fontWeight: 'bold', color: 'pink' }}>
            <div>
                <p style={{ color: hoveredLine.color }}>Status: <strong>{hoveredLine.x}</strong></p>
                {/* <p style={{ color: hoveredLine.color }}>Orders: <strong>{hoveredLine.y}</strong></p> */}
            </div>
        </Hint>
    );

    return (
        <div>
            {/* Average Order Value */}
            {/* <div>
                <h3>Average Order Value</h3>
                <p>${averageOrderValue.toFixed(2)}</p>
            </div> */}
             {/* <div className="d-flex justify-content-center" style={{padding:'10px'}}>
                    
                    <div className="card" style={{padding:'10px'}}>
                        <div className="card-body">
                            <h5 className="card-title">Most Used Carrier</h5>
                            <p className="card-text">{mostUsedCarrier}</p>
                        </div>
                    </div>
                <div className="card" style={{padding:'10px'}}>
                    <div className="card-body">
                        <h5 className="card-title">Average Order Value (AOV)</h5>
                        <p className="card-text">${averageOrderValue.toFixed(2)}</p>
                    </div>
                </div>
                </div> */}
                <div className="d-flex justify-content-center" style={{ padding: '10px' }}>
                {/* Card showing most used carrier */}
                <div className="card" style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
                    <div className="card-body">
                        <h5 className="card-title" style={{color:'cream'}}>Most Used Carrier</h5>
                        <p className="card-text" style={{color:'cream'}}>{mostUsedCarrier}</p>
                    </div>
                </div>
                {/* Card showing average order value (AOV) */}
                <div className="card" style={{ padding: '10px', backgroundColor: 'pink', color: 'white' }}>
                    <div className="card-body">
                        <h5 className="card-title" style={{color:'green'}}>Average Order Value (AOV)</h5>
                        <p className="card-text" style={{color:'green'}}>${averageOrderValue.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            

            {/* Graphs */}
            

<Grid container spacing={3} >
    {/* Carrier Distribution - Bar Graph */}
    <Grid item xs={12} sm={6}>
        <Card>
            <CardContent>
                <Typography variant="h6">Carrier Distribution</Typography>
                <XYPlot
                    width={300}
                    height={300}
                    xType="ordinal"
                    yType="linear"
                    onMouseLeave={() => setHoveredBar(null)}
                >
                    <VerticalBarSeries
                        data={carrierDistribution}
                        color={"pink"}
                        onValueMouseOver={(value) => setHoveredBar(value)}
                        onValueMouseOut={() => setHoveredBar(null)}
                    />
                    <XAxis  />
                    <YAxis  />
                    {barTooltip}
                </XYPlot>
                {/* Legend for Carrier Distribution */}
                <DiscreteColorLegend
                    items={[{ title: 'Carrier Distribution', color: 'pink' }]}
                    orientation="horizontal"
                />
            </CardContent>
        </Card>
    </Grid>

    {/* Order Status Distribution - Line Graph */}
    <Grid item xs={12} sm={6}>
        <Card>
            <CardContent>
                <Typography variant="h6">Order Status Distribution</Typography>
                <XYPlot
                    width={300}
                    height={300}
                    xType="ordinal"
                    yType="linear"
                    onMouseLeave={() => setHoveredLine(null)}
                >
                    <LineSeries
                        data={orderStatusDistribution}
                        color={colors[1]}
                        onNearestX={(value) => setHoveredLine(value)}
                        onSeriesMouseOut={() => setHoveredLine(null)}
                    />
                    <XAxis title="Status" />
                    <YAxis title="Orders" />
                    {lineTooltip}
                </XYPlot>
                {/* Legend for Order Status Distribution */}
                <DiscreteColorLegend
                    items={[{ title: 'Order Status Distribution', color: colors[1] }]}
                    orientation="horizontal"
                />
            </CardContent>
        </Card>
    </Grid>
</Grid>


        </div>
    );
};

export default DashboardAdmin;
