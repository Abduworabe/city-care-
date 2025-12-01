import React from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import {
  COMPLAINT_TYPE,
  COMPLAINT_STATUS,
  COMPLAINT_SORT_BY,
} from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

function SearchContainer() {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 800);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h4 className="form-title">🔍 Search Complaints</h4>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="🔎 Search"
            defaultValue={search}
            placeholder="Title, location, department..."
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="📊 Status"
            name="jobStatus"
            list={["all", ...Object.values(COMPLAINT_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="🏗️ Type"
            name="jobType"
            list={["all", ...Object.values(COMPLAINT_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="📈 Sort"
            name="sort"
            list={Object.values(COMPLAINT_SORT_BY)}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <div className="form-actions">
            <Link to="/dashboard/all-jobs" className="btn reset-btn">
              🗑️ Clear
            </Link>
            <button
              type="button"
              className="btn apply-btn"
              onClick={() => submit(document.querySelector(".form"))}
            >
              ✅ Apply
            </button>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
}

export default SearchContainer;
