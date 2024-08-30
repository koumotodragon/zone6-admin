
// import './Login.css';
import { Form, redirect } from 'react-router-dom';
import FormRow from '../components/FormRow';
import SubmitBtn from '../components/SubmitBtn';
import Logo from '../components/Logo';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

export const action =
    () =>
        async ({ request }: any) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                const user = await customFetch.post('/auth/login', data);
                console.log(user);
                toast.success('Login successful');
                return redirect('/dashboard');
            } catch (error: any) {
                console.log(error);
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

export const Login = () => {

    return (
        <>
            <Wrapper>

                <div className="login-cotainer">
                    <Form method='post' className='form'>
                        <Logo />
                        <h4>login</h4>
                        <FormRow type='email' name='email' />
                        <FormRow type='password' name='password' />
                        <SubmitBtn />

                    </Form>
                </div>
            </Wrapper>
        </>
    );
};
