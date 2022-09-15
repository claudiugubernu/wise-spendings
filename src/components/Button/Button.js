const Button = ({ variant, content, type }) => {
  return (
    <button type={type ? type : "button"} className={`btn ${variant}`}>
      {content}
    </button>
  );
};

export default Button;
