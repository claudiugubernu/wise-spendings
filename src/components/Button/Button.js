const Button = ({ variant, content }) => {
  return (
    <button type="button" className={`btn ${variant}`}>
      {content}
    </button>
  );
};

export default Button;
