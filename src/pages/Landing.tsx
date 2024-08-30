
// import './Landing.css';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/Logo.png'
import Wrapper from '../assets/wrappers/LandingPage';
export const Landing = () => {
    return (
        <>
            <Wrapper>
                <div className="landing-cotainer">
                    <nav>

                    </nav>
                    <div className='container page'>
                        <div className='info'>
                            <h1>
                                Zone 6 <span>Admin</span>
                            </h1>
                            <p>
                                Lorem ipsum  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                            </p>
                            <Link to='register' className='btn register-link'>
                                Register
                            </Link>
                            <Link to='login' className='btn '>
                                Login
                            </Link>
                        </div>
                        <img src={Logo} alt='job hunt' className='img main-img' />
                    </div>
                </div>
            </Wrapper>
        </>
    );
};
