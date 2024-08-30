import styled from 'styled-components';

const VideoWrapper = styled.section`
a {
    text-decoration: none;
    display: flex;
    justify-content: center;
  }
  
  .video-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 13.3px;
    /* height: 225px; */
    width: 212px;
    margin: 1vw;
    gap: 5px;
    color:var(--text-color);
  }
  
  .video-container .rounded-image-container {
    overflow: hidden;
    /* Ensure that the rounded corners are visible */
    width: 212px;
    /* Set your desired width */
    height: 125px;
    
  }
  
  .video-container .rounded-image-container .rounded-image {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover; 
    /* Maintain aspect ratio and cover container */
    border-radius: 10px;
  }
  
  .video-container .comments-container {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    gap: 7px;
    color:var(--text-color);
  }
  
//   .video-container .comments-container .vedio-view::before {
//     content: "";
//     display: inline-block;
//     vertical-align: middle;
//     background: url(../assets/images/sprite.png) no-repeat -47px -41px;
//     height: 10px;
//     width: 17px;
//     margin: -1px 3px 0 0;
//   }
  
//   .video-container .comments-container .vedio-comment::before {
//     content: "";
//     display: inline-block;
//     vertical-align: middle;
//     background: url(../../assets/images/sprite.png) no-repeat -47px -54px;
//     height: 10px;
//     width: 11px;
//     margin: -1px 3px 0 0;
//   }
  
  @media screen and (max-width:756px) {
    .video-container {
      width: 150px;
      height: auto;
    }
  
    .video-container .rounded-image-container {
      overflow: hidden;
  
      width: 150px;
  
      height: auto;
      aspect-ratio: 16/10;
    }
  }
`;
export default VideoWrapper;
