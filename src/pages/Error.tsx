


import img from '../assets/images/404-error.svg';
import { Link, useRouteError } from 'react-router-dom';
// import './Error.css';
import Wrapper from '../assets/wrappers/ErrorPage';
export const Error = () => {
  const error: any = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div className="error-cotainer">
          <div>
            <img src={img} alt='not found' />
            <h3>Ohh! page not found</h3>
            <p>we can't seem to find the page you are looking for</p>
            <Link to='/dashboard'>back home</Link>
          </div>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="main-cotainer">
        <div>
          <h3>something went wrong</h3>
        </div>
      </div>
    </Wrapper>
  );
};

