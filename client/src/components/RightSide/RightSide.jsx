import { useState } from "react";
import "./RightSide.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkMode from "../DarkMode/DarkMode";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import TrendCard from "../TrendCard/TrendCard";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const iconStyle = {
    color: "var(--textColor)",
    width: "1.5rem",
    height: "1.5rem",
  };

  return (
    <div className="RightSide">
      <div className="navIcons">
        <div className="option">
          <Link to="../home">
            <HomeOutlinedIcon style={iconStyle} />
          </Link>
        </div>
        <DarkMode />
        <div className="option">
          <Link to="../chat">
            <ForumOutlinedIcon style={iconStyle} />
          </Link>
        </div>
        <div className="option">
          <NotificationsActiveOutlinedIcon style={iconStyle} />
        </div>
      </div>
      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        <IosShareOutlinedIcon /> Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
