import { useNavigate, useLocation } from "react-router-dom"
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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios"
import { toast } from "sonner";
import { useSelector } from "react-redux"

const initialValues = {
    verificationCode: "",
}

export const VerifyEmail = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const isSignUp = useSelector((state) => state.login.isSignUp);
    const { email } = location.state.values || {};

    const handleSignUpNavigation = () => {
        navigate("/signup")
    }

    const handleValidate = (values) => {
        const errors = {};

        if (!values.verificationCode && isSignUp) {
            errors.verificationCode = "Required";
        } else if (values.verificationCode.length < 6) {
            errors.verificationCode = "Verificcation code must be 6 digits";
        }

        return errors;
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values)
        try {
            const response = await axios.post("http://localhost:5000/api/users/verify-email", { ...values, email });
            console.log(response)
            if (response.status === 200) {
                console.log("Verification successful");
                toast("Verification Successful!", {
                    description: "New User has Sign up successfully.",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
                navigate("/")
            }
        } catch (error) {
            console.log(`Email Verification Failed! ${error}`)
        }
    }

    return (
        <>
            <div>
                <h3 className="text-center text-3xl py-7">Sign up Page</h3>
                <div className="flex flex-col justify-center items-center">
                    <Formik
                        initialValues={initialValues}
                        validate={handleValidate}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Card className="min-w-[400px] gap-y-5">
                                    <CardHeader>
                                        <CardTitle>Verify Email</CardTitle>
                                        <CardDescription>Please enter your verification code.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {isSignUp &&
                                            <div className="pb-3">
                                                <Label htmlFor="verificationCode" className="pb-1">Your Verification code</Label>
                                                <Field as={Input} type="text" name="verificationCode" placeholder="Verification code" />
                                                <ErrorMessage name="verificationCode" component="div" className="text-red-800" />
                                            </div>}
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" onClick={handleSignUpNavigation}>Sign up</Button>
                                        <Button type="submit" disabled={isSubmitting}>Verify Code</Button>
                                    </CardFooter>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}