import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { ArcSeries, XYPlot, DiscreteColorLegend,RadialChart ,Hint} from 'react-vis';
import 'react-vis/dist/style.css';
import { order_details_for_dashboard } from "../api/user";

const Dashboard = () => {
    const { user, setUser } = useContext(UserContext);
    const { usertype, setUsertype } = useContext(UserContext);
    const { useremail, setUseremail } = useContext(UserContext);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [userData, setUserData] = useState([]);
    const [totalAmountSpent, setTotalAmountSpent] = useState(0);
    const [mostUsedCarrier, setMostUsedCarrier] = useState("");
    const [carrierCounts, setCarrierCounts] = useState({});
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [hintData, setHintData] = useState("");

    useEffect(() => {
        if (user && useremail) {
            fetchOrders();
        }
    }, [user]);

    useEffect(() => {
        console.log("bla", userData.length, carrierCounts, mostUsedCarrier, totalAmountSpent)
    }, [userData, carrierCounts, mostUsedCarrier, totalAmountSpent,highlightedIndex,hintData])

    const fetchOrders = async () => {
        try {
            const res = await order_details_for_dashboard({
                email: useremail,
            });
            setUserData(res.orders);
            const totalAmt = res.orders.reduce((acc, order) => acc + parseFloat(order.cost), 0);
            setTotalAmountSpent(totalAmt);
            const counts = res.orders.reduce((counts, order) => {
                counts[order.Carrier] = (counts[order.Carrier] || 0) + 1;
                return counts;
            }, {});
            setCarrierCounts(counts);

            const mostUsedCarrier = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            setMostUsedCarrier(mostUsedCarrier);
        } catch (error) {
            setSnackbarOpen(true);
            setSnackbarMessage(error.message);
        }
    };
 // Calculate Average Order Value (AOV)
 const calculateAOV = () => {
  if (userData.length === 0) return 0;
  const totalCost = userData.reduce((total, order) => total + parseFloat(order.cost), 0);
  return totalCost / userData.length;
};
    if (userData !== null && user ) {
        // const carriers = Object.keys(carrierCounts);
        const totalCarriers = userData.length;

        // Calculate angles for each carrier based on count
//         let startAngle = 0;
//         const generateColor = () => {
//           const randomColor = Math.floor(Math.random() * 16777215).toString(16);
//           return '#' + ('000000' + randomColor).slice(-6); 
//       };
      
//         const arcs = carriers.map((carrier, index) => {
//             const angle = (carrierCounts[carrier] / totalCarriers) * 360;
//             const endAngle = startAngle + angle;
//             const arc = {
//                 angle0: startAngle,
//                 angle: endAngle,
//                 label: carrier,
//                 color:generateColor()
//             };
//             startAngle = endAngle;
//             return arc;
//         });
// console.log("arcs",arcs)
const generateColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
const colors = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6610f2", "#17a2b8", "#f8f9fa", "#343a40", "#28a745", "#ffc107", "#6c757d", "#007bff", "#6610f2", "#dc3545", "#17a2b8"];

const carriers = Object.keys(carrierCounts);
const arcs = carriers.map((carrier, index) => ({
    angle: carrierCounts[carrier],
    label: carrier,
    color: colors[index % colors.length] // Use modulo to ensure cyclic color selection
}));



// const legendItems = arcs.map((arc, index) => ({
//   title: arc.label,
//   color: COLORS[index % COLORS.length]
// }));
        return (
            <div>
                <div className="d-flex justify-content-center">
                    {/* Card showing total amount spent */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Amount Spent</h5>
                            <p className="card-text">${totalAmountSpent.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Card showing most used carrier */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Most Used Carrier</h5>
                            <p className="card-text">{mostUsedCarrier}</p>
                        </div>
                    </div>
                    {/* Card showing average order value (AOV) */}
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Average Order Value (AOV)</h5>
                        <p className="card-text">${calculateAOV().toFixed(2)}</p>
                    </div>
                </div>
                </div>

                {/* Visualization - Pie chart */}
                <div className="d-flex justify-content-center" style={{ textAlign: 'center', marginTop: '20px' }}>
                    
                    {/* <XYPlot width={400} height={400} xDomain={[-1, 1]} yDomain={[-1, 1]}>
                    <XYPlot width={400} height={400} xDomain={[-1, 1]} yDomain={[-1, 1]}>
    <ArcSeries
        animation
        radiusType="literal"
        center={{ x: 0, y: 0 }}
        data={[arcs]}
        colorType="literal"
        getColor={d => d.color}
        arcClassName="myArc"
        innerRadius={0}
        radius={150}
        onValueClick={(datapoint, event) => console.log('Clicked:', datapoint)}
    />
</XYPlot>

</XYPlot> */}


                   
                    {/* <DiscreteColorLegend
                        items={arcs.map(entry => entry.label)}
                        orientation="horizontal"
                    /> */}
                    <RadialChart
                    data={arcs}
                    width={300}
                    height={300}
                    colorType="literal"
                    color="#007bff" // Fixed color for all sectors
                    // labelsAboveChildren
                    onValueClick={(datapoint, event) => setHintData(datapoint.label)}
                    onValueMouseOut={() => setHintData(null)}
                >
                  {hintData !== null && (
                        <Hint value= {{Carrier:hintData}}  />
                    )}
                    </RadialChart>
                    <DiscreteColorLegend
    items={arcs.map(arc => ({ title: arc.label, color: arc.color }))}
    orientation="horizontal"
/>
{/* {if (userType==10){

}} */}

                </div>

            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default Dashboard;
