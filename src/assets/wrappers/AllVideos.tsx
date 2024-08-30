import styled from 'styled-components';

const AllVideosWrapper = styled.section`
-webkit-font-smoothing: antialiased;
font-family: 'Roboto', Helvetica, sans-serif;
font-style: normal;
text-align: center;
margin: 0;
padding: 0;
box-sizing: border-box;
background-color: var(--background-color);
color:var(--text-color);
width: 100%;
font-size: calc(10px + 2vmin);
display: grid;
grid-template-columns: repeat(auto-fill, minmax(212px, 1fr));
gap: 16px;
overflow: hidden;
`;
export default AllVideosWrapper;
