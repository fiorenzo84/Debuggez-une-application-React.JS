import {useCallback, useState} from "react";
import PropTypes from "prop-types";
import Field, {FIELD_TYPES} from "../../components/Field";
import Select from "../../components/Select";
import Button, {BUTTON_TYPES} from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({onSuccess, onError}) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    type: "Personel",
    message: "",
  });

  // This function is used to update the values of the form fields.
  const handleChange = (eOrValue) => {
    let name;
    let value;

    // If it's an event (like for Field components)
    if (eOrValue && eOrValue.target) {
      name = eOrValue.target.name;
      value = eOrValue.target.value;
    } else {
      // If it's a direct value (like for the Select component)
      name = "type";
      value = eOrValue;
    }

    setFormData((prev) => ({...prev, [name]: value}));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [formData, onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder=""
            label="Nom"
          />
          <Field
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder=""
            label="Prénom"
          />
          <Select
            name="type"
            value={formData.type}
            selection={["Personel", "Entreprise"]}
            onChange={handleChange}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
            label="Email"
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
