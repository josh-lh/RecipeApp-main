import "./Button.css";
type Props = {
  type: string;
  onClick: Function;
  text: string;
};

const Button = (props: Props) => {
  const { type, onClick, text } = props;

  return (
    <div className={`button ${type}`} onClick={() => onClick()}>
      {text}
    </div>
  );
};

export default Button;
