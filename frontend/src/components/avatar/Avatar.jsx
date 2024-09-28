/* eslint-disable react/prop-types */
import avatarImg from "../../assets/avatar.png";

const Avatar = ({ src, size, radius }) => {
  const style = {
    height: size ? `${size}px` : "40px",
    width: size ? `${size}px` : "40px",
    // eslint-disable-next-line no-constant-binary-expression
    borderRadius: "50%" || radius,
    overflow: "hidden",
  };

  return (
    <div className="avatar" style={style}>
      <img
        src={src ? src : avatarImg}
        alt="avatar"
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Avatar;
