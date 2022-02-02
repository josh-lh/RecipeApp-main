import "./Input.css";

type Props = {
  type: string;
  placeholder: string;
  additionalProps: object; // react-hook-form requires this (register event)
  width?: string;
  flexGrow?: number;
};

const Input = (props: Props) => {
  const { type, placeholder, additionalProps, width, flexGrow } = props;

  let style = {
    maxWidth: width ?? "auto",
    flexGrow: flexGrow ?? "auto",
  };

  return (
    <input
      className="custom-input"
      style={style}
      type={type}
      placeholder={placeholder}
      {...additionalProps}
    />
  );
};

export default Input;
