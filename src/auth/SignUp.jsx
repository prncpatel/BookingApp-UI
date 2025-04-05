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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios"
import { toast } from "sonner";
import { useDispatch } from "react-redux"
import { setSignUp } from "@/redux/slices/loginSlice"
import { signUpFormFields } from "./resources/signUpFormFields"

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginNavigation = () => {
        navigate("/")
    }

    const handleValidate = (values) => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = "Required";
        } else if (values.firstName.length < 2) {
            errors.password = "first name must be at least 2 characters";
        }

        if (!values.lastName) {
            errors.lastName = "Required";
        } else if (values.lastName.length < 2) {
            errors.lastName = "last name must be at least 2 characters";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/users/signup", values);
            if (response.status === 200) {
                console.log("Sign up successful");
                toast.success("Sign up successful! Please check your email for verification code.")
                dispatch(setSignUp(true))
                navigate("/verifyemail", {
                    state: { values }
                });
            }
        } catch (error) {
            console.log(`Login Failed! ${error}`)
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
                                        <CardTitle>Sign up form</CardTitle>
                                        <CardDescription>Welcome! Sign up using below details.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {
                                            signUpFormFields.map((field, index) => (
                                                <div className="pb-3" key={index}>
                                                    <Label htmlFor={field.name} className="pb-1">{field.label}</Label>
                                                    <Field as={Input} name={field.name} placeholder={field.placeholder} type={field.type} />
                                                    <ErrorMessage name={field.name} component="div" className="text-red-800" />
                                                </div>
                                            ))
                                        }
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" onClick={handleLoginNavigation}>Login</Button>
                                        <Button type="submit" disabled={isSubmitting}>Sign up</Button>
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