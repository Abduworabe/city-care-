import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn, text = "submit" }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn ? "form-btn" : ""}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Saving..." : text}
    </button>
  );
};

export default SubmitBtn;
