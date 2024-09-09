import Form from "../Components/Form";

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context
import { useGlobalContext } from "../Context/global.context";

const Contact = () => {
  const { theme } = useGlobalContext();

  return (
    <div className={`layout min-height ${theme === "dark" ? "layout-bg" : ""}`}>
      <div className="contact-container">
        <h2>Want to know more?</h2>
        <p>Send us your questions and we will contact you</p>
      </div>
      <Form theme={theme} />
    </div>
  );
};

export default Contact;
