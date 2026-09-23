import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
import { useSettings } from "../context/SettingsContext";

function Error() {
  const error = useRouteError();

  // useSettings may not be available if error happens outside SettingsProvider
  let t = { not_found_title: "Page Not Found", not_found_msg: "We can't seem to find the page you're looking for.",
    back_home: "Back to Home", something_wrong: "Something went wrong", go_home: "Go Home" };
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ctx = useSettings();
    if (ctx?.t) t = ctx.t;
  } catch (_) {}

  if (error?.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="page not found" />
          <h3>{t.not_found_title}</h3>
          <p>{t.not_found_msg}</p>
          <Link to="/" className="btn" style={{ display:"inline-flex", width:"auto" }}>
            {t.back_home}
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>{t.something_wrong}</h3>
        <p style={{ marginBottom:"1rem", color:"var(--text-secondary-color)" }}>
          {error?.message || "An unexpected error occurred."}
        </p>
        <Link to="/" className="btn" style={{ display:"inline-flex", width:"auto" }}>
          {t.go_home}
        </Link>
      </div>
    </Wrapper>
  );
}

export default Error;
