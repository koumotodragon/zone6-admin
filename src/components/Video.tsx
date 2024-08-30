import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";


import VideoWrapper from "../assets/wrappers/VideoWrapper";
export const Video = ({ img, id, title, views }: any) => {
    return (
        <>
            <Link to={`/dashboard/video/${id}`}>
                <VideoWrapper>

                    <div className="video-container">
                        <div className="rounded-image-container">
                            <img src={img} className="rounded-image" loading="lazy" />
                        </div>
                        <div>{title}</div>
                        <div className="comments-container">
                            <FaEye /> <div className="vedio-view">{views}</div>
                        </div>
                    </div> 
                </VideoWrapper >
            </Link>
        </>);
}