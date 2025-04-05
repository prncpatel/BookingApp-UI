import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAllBookingDetails } from "@/redux/slices/bookingSlice";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"

export const BookingDetails = () => {

    const dispatch = useDispatch();

    const newBookingDetails = useSelector((state) => state.booking.newBookingDetails);
    const allBookingDetails = useSelector((state) => state.booking.allBookingDetails);
    console.log(allBookingDetails)
    console.log(newBookingDetails)

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/booking/", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                        'Content-Type': 'application/json',
                    },
                })
                if (response.status === 200) {
                    console.log(response.data.bookings)
                    dispatch(getAllBookingDetails(response.data.bookings))
                }
            } catch (error) {
                console.error("Error fetching booking details:", error);
            }
        };
        fetchBookingDetails();
    }, [newBookingDetails])

    return (
        <div className="items-center mt-6">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <Table className=" lg:min-w-[800px] border border-gray-200 rounded-md">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Slot / Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allBookingDetails.map((booking, index) => (
                        <TableRow key={index} className="hover:bg-gray-50 transition">
                            <TableCell>{booking.customerName}</TableCell>
                            <TableCell>{booking.customerEmail}</TableCell>
                            <TableCell>{booking.bookingDate}</TableCell>
                            <TableCell>{booking.bookingType}</TableCell>
                            <TableCell>
                                {booking.bookingType === "Half Day" && booking.bookingSlot}
                                {booking.bookingType === "Custom" &&
                                    `${booking.fromTime} - ${booking.toTime}`}
                                {booking.bookingType === "Full Day" && "Full Day"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
