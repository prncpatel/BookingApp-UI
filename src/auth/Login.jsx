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
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/loginSlice";


export const Login = () => {

    const userData = useSelector((state) => console.log(state))

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleValidate = (values) => {
        const errors = {};
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
        console.log(values)
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", values);
            console.log(response)
            if (response.status == 200) {
                dispatch(login(response.data));
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(`Login Failed! ${error}`)
        }
    }

    const handleSignUp = () => {
        navigate("/signup")
    }

    return (
        <div className="">
            <h3 className="text-center text-3xl py-7">Login Page</h3>
            <div className="flex flex-col justify-center items-center">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={handleValidate}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Card className="min-w-[400px] gap-y-7">
                                <CardHeader>
                                    <CardTitle>Login</CardTitle>
                                    <CardDescription>Don't Have an Account? Sign up First!</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="pb-5">
                                        <Label htmlFor="email" className="pb-1">Your email address</Label>
                                        <Field as={Input} type="email" name="email" placeholder="Email" />
                                        <ErrorMessage name="email" component="div" className="text-red-800" />
                                    </div>
                                    <div>
                                        <Label htmlFor="password" className="pb-1">Your Password</Label>
                                        <Field as={Input} type="password" name="password" placeholder="Password" />
                                        <ErrorMessage name="password" component="div" className="text-red-800" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={handleSignUp}>Sign up</Button>
                                    <Button type="submit" disabled={isSubmitting}>Login</Button>
                                </CardFooter>
                            </Card>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}