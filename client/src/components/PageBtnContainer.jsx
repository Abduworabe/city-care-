import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    if (pageNumber < 1 || pageNumber > numOfPages) return null;

    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxPagesToShow = 5;

    const addDots = (key) => (
      <span className="page-btn dots" key={`dots-${key}`}>
        ....
      </span>
    );

    // Mobile: Show fewer pages
    const isMobile = window.innerWidth < 768;
    const pagesToShow = isMobile ? 3 : maxPagesToShow;

    // 1. Add the first page button
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // 2. Add leading dots if needed
    if (currentPage > (isMobile ? 2 : 3) && numOfPages > pagesToShow) {
      pageButtons.push(addDots(1));
    }

    // 3. Add buttons surrounding current page
    const startPage = Math.max(2, currentPage - (isMobile ? 0 : 1));
    const endPage = Math.min(numOfPages - 1, currentPage + (isMobile ? 0 : 1));

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== numOfPages) {
        pageButtons.push(
          addPageButton({ pageNumber: i, activeClass: currentPage === i })
        );
      }
    }

    // 4. Handle edge case for page 2 on mobile
    if (currentPage === 2 && numOfPages > 2 && isMobile) {
      pageButtons.splice(
        1,
        0,
        addPageButton({ pageNumber: 2, activeClass: true })
      );
    }

    // 5. Add trailing dots if needed
    if (
      currentPage < numOfPages - (isMobile ? 1 : 2) &&
      numOfPages > pagesToShow
    ) {
      pageButtons.push(addDots(2));
    }

    // 6. Add the last page button
    if (numOfPages > 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: numOfPages,
          activeClass: currentPage === numOfPages,
        })
      );
    }

    return pageButtons.filter(
      (btn, index, self) => index === self.findIndex((t) => t.key === btn.key)
    );
  };

  const pages = renderPageButtons();

  if (numOfPages <= 1) return null;

  return (
    <Wrapper>
      <button
        className="prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        <span className="btn-text">prev</span>
      </button>
      <div className="btn-container">{pages}</div>
      <button
        className="next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <span className="btn-text">next</span>
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
