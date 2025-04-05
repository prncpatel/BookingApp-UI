import { useNavigate } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../components/ui/button"
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import axios from "axios"
import { useDispatch } from "react-redux"
import { FormikSelect } from "@/shared/FormikSelect"
import { FormikDatePicker } from "@/shared/FormikDatePicker"
import { FormikTimeDropdown } from "@/shared/FormikTimePicker"
import { addNewbookingDetails } from "@/redux/slices/bookingSlice"
import { toast } from "sonner"
import { BookingDetails } from "./BookingDetails"

const initialValues = {
    customerName: "",
    customerEmail: "",
    bookingDate: "",
    bookingType: "",
    bookingSlot: "",
    fromTime: "",
    toTime: "",
}

export const BookingForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleValidate = (values) => {
        const errors = {};
        if (!values.customerName) {
            errors.customerName = "Required";
        } else if (values.customerName.length < 2) {
            errors.customerName = "first name must be at least 2 characters";
        }

        if (!values.customerEmail) {
            errors.customerEmail = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.customerEmail)) {
            errors.customerEmail = "Invalid email address";
        }

        return errors;
    }

    const handleSubmit = async (values, { resetForm ,setSubmitting }) => {
        const updatedDate = new Date(values.bookingDate).toISOString().split('T')[0];
        const payload = {
            customerName: values.customerName,
            customerEmail: values.customerEmail,
            bookingDate: updatedDate,
            bookingType: values.bookingType,
        };

        if (values.bookingType === "Half Day") {
            payload.bookingSlot = values.bookingSlot;
        } else if (values.bookingType === "Custom") {
            payload.fromTime = values.fromTime;
            payload.toTime = values.toTime;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/booking/request-booking",
                payload,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                        'Content-Type': 'application/json',
                    },
                });
            if (response.status === 201) {
                dispatch(addNewbookingDetails(response.data));
                toast.success("New Booking successful!")
                resetForm();

            }
        } catch (error) {
            console.log(`Login Failed! ${error}`)
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold text-center py-4 sm:py-7">Booking Dashboard</h3>
            <div className="flex flex-col justify-center items-center">
                <Formik
                    initialValues={initialValues}
                    validate={handleValidate}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values }) => (
                        <Form className="w-full">
                            <Card className="w-full max-w-[360px] sm:max-w-[600px] lg:max-w-[800px] mx-auto">
                                <CardHeader>
                                    <CardTitle>Booking form</CardTitle>
                                    <CardDescription>Welcome! enter your booking details.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="customerName" className="pb-1">Customer Name</Label>
                                            <Field as={Input} name="customerName" placeholder="First Name" type="text" />
                                            <ErrorMessage name="customerName" component="div" className="text-red-800 text-sm" />
                                        </div>
                                        <div>
                                            <Label htmlFor="customerEmail" className="pb-1">Customer Email</Label>
                                            <Field as={Input} type="text" name="customerEmail" placeholder="Email" />
                                            <ErrorMessage name="customerEmail" component="div" className="text-red-800 text-sm" />
                                        </div>
                                        <div>
                                            <Label htmlFor="bookingDate" className="pb-1">Booking Date</Label>
                                            <FormikDatePicker name="bookingDate" />
                                            <ErrorMessage name="bookingDate" component="div" className="text-red-800 text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="bookingType" className="pb-1">Booking Type</Label>
                                            <FormikSelect
                                                name="bookingType"
                                                options={[
                                                    { label: 'Full Day', value: 'Full Day' },
                                                    { label: 'Half Day', value: 'Half Day' },
                                                    { label: 'Custom', value: 'Custom' },
                                                ]}
                                            />
                                        </div>
                                        {values.bookingType === "Half Day" && (
                                            <div>
                                                <Label htmlFor="bookingSlot" className="pb-1">Booking Slot</Label>
                                                <FormikSelect
                                                    name="bookingSlot"
                                                    options={[
                                                        { label: 'First Half', value: 'First Half' },
                                                        { label: 'Second Half', value: 'Second Half' },
                                                    ]}
                                                />
                                            </div>
                                        )}
                                        {values.bookingType === "Custom" && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <Label className="block mb-1 text-sm font-medium">From Time</Label>
                                                    <FormikTimeDropdown name="fromTime" />
                                                </div>
                                                <div>
                                                    <Label className="block mb-1 text-sm font-medium">To Time</Label>
                                                    <FormikTimeDropdown name="toTime" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center">
                                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                        {isSubmitting ? "Booking..." : "Book"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="mt-8">
                <BookingDetails />
            </div>
        </div>
    )
}