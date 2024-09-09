import "./PlaylistCard.css";
import headImg from "../../../assets/headImg.png";

import { RiPlayList2Fill } from "react-icons/ri";

const PlaylistCard = () => {
  return (
    <div className="playlist-card">
      <div className="wrapper">
        <div className="cover-wrapper">
          <img src={headImg} alt="cover" className="cover" />
          <div className="icon-wrapper">
            <span>22</span>
            <RiPlayList2Fill className="icon" />
          </div>
        </div>
        <span className="title">List Name</span>
      </div>
    </div>
  )
}

export default PlaylistCard