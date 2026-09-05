import ClearCircleOutlineIcon from "@iconify-react/mdi/clear-circle-outline";

export function AdminToolbar({
  search,
  searchPlaceholder = "Search ...",
  setSearch,
  setPage,
  currentStatusFilter,
  setStatusFilter,
  status_filters,
  itemsPerPage,
  setItemsPerPage,
  filterByRequestType = false,
  requestType = "All Requests",
  setRequestType = (val) => {},
  currentSortBy = "newest",
  setSortBy = (val) => {},
  sortByRequired = true,
}) {
  return (
    <div className="admin-toolbar">
      {/* Search */}

      <div
        className="toolbar-field"
        style={{
          width: "39rem",
          marginRight: "1rem",
        }}
      >
        <label htmlFor="">Search</label>

        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => {
              setSearch("");
              setPage(1);
            }}
            type="button"
          >
            {filterByRequestType ? (
              <ClearCircleOutlineIcon
                height="1.1em"
                className="clear-search"
                style={{ marginLeft: "65rem" }}
              />
            ) : (
              <ClearCircleOutlineIcon
                height="1.1em"
                className="clear-search"
                style={{ marginLeft: "74rem" }}
              />
            )}
          </button>
        )}
      </div>

      {/* Right controls */}
      <div className="toolbar-controls">
        {/* Sort */}
        {sortByRequired && (
          <div className="toolbar-field">
            <label htmlFor="sortBy">Sort by</label>

            <select
              id="sortBy"
              className="toolbar-select"
              value={currentSortBy}
              onChange={(e) => {
                setPage(1);
                setSortBy(e.target.value);
              }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="nameAsc">Name A–Z</option>
              <option value="nameDesc">Name Z–A</option>
            </select>
          </div>
        )}

        {/* Request Type */}
        {filterByRequestType && (
          <div className="toolbar-field">
            <label htmlFor="status">Request Type</label>

            <select
              id="status"
              className="toolbar-select"
              value={requestType}
              onChange={(e) => {
                setRequestType(e.target.value);
                setPage(1);
              }}
            >
              <option value="All Requests">All Requests</option>
              <option value="Institution Onboarding Request">
                Institution Onboarding Request
              </option>
              <option value="Student Revocation Request">
                Student Revocation Request
              </option>
            </select>
          </div>
        )}

        {/* Status */}
        <div className="toolbar-field">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            className="toolbar-select"
            value={currentStatusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            {status_filters.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Items per page */}
        <div className="toolbar-field">
          <label htmlFor="itemsPerPage">Show</label>

          <select
            id="itemsPerPage"
            className="toolbar-select items-select"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
