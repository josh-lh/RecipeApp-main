import { useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../Button/Button";
import "./Header.css";

type Props = {
  title: string;
  hasReturn: boolean;
  button?: {
    onClick: Function;
    text: string;
  };
  headerStyle?: string;
};

const Header = (props: Props) => {
  const location = useHistory();
  const { title, hasReturn, button, headerStyle = "" } = props;

  return (
    <>
      <div className={`header-container ${headerStyle}`}>
        {hasReturn && (
          <div className="header-return-btn" onClick={() => location.goBack()}>
            <FaArrowLeft size={18} />
          </div>
        )}
        <h1>{title}</h1>
        {button && (
          <Button type="standard" text={button.text} onClick={button.onClick} />
        )}
      </div>
    </>
  );
};

export default Header;
