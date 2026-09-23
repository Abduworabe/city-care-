import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { COMPLAINT_TYPE, COMPLAINT_STATUS, COMPLAINT_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";
import { useSettings } from "../context/SettingsContext";

function SearchContainer() {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();
  const { t } = useSettings();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => onChange(form), 800);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h4 className="form-title">{t.search_complaints}</h4>
        <div className="form-center">
          <FormRow
            type="search" name="search" labelText={t.search_label}
            defaultValue={search} placeholder={t.search_placeholder}
            onChange={debounce((form) => submit(form))}
          />
          <FormRowSelect
            labelText={t.status_label} name="jobStatus"
            list={[t.all, ...Object.values(COMPLAINT_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText={t.type_label} name="jobType"
            list={[t.all, ...Object.values(COMPLAINT_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText={t.sort_label} name="sort"
            list={Object.values(COMPLAINT_SORT_BY)}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <div className="form-actions">
            <Link to="/dashboard/all-jobs" className="btn reset-btn">{t.clear_filters}</Link>
            <button type="button" className="btn apply-btn"
              onClick={() => submit(document.querySelector(".form"))}>
              {t.apply_filters}
            </button>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
}

export default SearchContainer;
