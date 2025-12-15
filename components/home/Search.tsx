"use client";

import { FiSearch } from "react-icons/fi";

function Search() {
	return (
		<div className="search-container">
			<FiSearch className="search-icon" />
			<input
				type="text"
				placeholder="Search here"
				className="search-input"
			/>
		</div>
	);
}

export default Search;
