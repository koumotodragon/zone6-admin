import styled from 'styled-components';

const TagsWrapper = styled.section`
.tag-section {
    display:flex;
    flex-direction:column;
    gap:5px;
}
.tag-section ul{
    list-style:none;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.tag-section ul li{
   padding:10px;
   background:var(--primary-400);
   border-radius:20px;
   color:white;
   display:flex;
   gap:5px;
}
.tag-section ul li button{
background:transparent;
border:none
 }
`;
export default TagsWrapper;
