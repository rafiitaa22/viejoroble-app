import classes from "../../styles/Booking.module.css";
import { ESTADOS } from "../global";
import { CgSandClock } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import { BiHappyHeartEyes } from "react-icons/bi";
import { FaRegSadCry } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
const StatusIcon = ({
  status,
  fontSize = "6em",
  width = "150px",
  height = "150px",
}) => {
  let icon;
  switch (status) {
    case 0:
      icon = <CgSandClock />;
      break;
    case 1:
      icon = <AiOutlineCheck />;
      break;
    case 2:
      icon = <RxCross1 />;
      break;
    case 3:
      icon = <RxCross1 />;
      break;
    case 4:
      icon = <BiHappyHeartEyes />;
      break;
    case 5:
      icon = <FaRegSadCry />;
      break;

    default:
      break;
  }

  return (
    <div
      className={classes.popout}
      style={{
        color: ESTADOS[status].color,
        backgroundColor: ESTADOS[status].backgroundColor,
        fontSize: fontSize,
        width: width,
        height: height,
      }}
    >
      {icon}
    </div>
  );
};

export default StatusIcon;
