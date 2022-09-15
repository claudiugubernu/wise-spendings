import LogoPng from "./Logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <img src={LogoPng} alt="logo" className="w-50 pv-20" />
    </div>
  );
};

export default Logo;
