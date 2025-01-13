import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Style/SideNavBar.css";

/**
 * Author: Menachem H, Elliot C
 * 
 * SideNavBar component renders a side navigation bar with dropdown menus.
 * 
 * @component
 * @example
 * return (
 *   <SideNavBar />
 * )
 * 
 * @returns {JSX.Element} The rendered side navigation bar component.
 * 
 * @description
 * The SideNavBar component contains navigation items that can be expanded to show sub-items.
 * It uses the useState hook to manage the state of the open dropdown menu.
 * 
 * @typedef {Object} NavItem
 * @property {string} title - The title of the navigation item.
 * @property {Array<{label: string, link: string}>} items - The sub-items under the navigation item.
 * 
 * @typedef {Object} SubNavItem
 * @property {string} label - The label of the sub-navigation item.
 * @property {string} link - The link to navigate to when the sub-navigation item is clicked.
 * 
 * @property {NavItem[]} navItems - The list of navigation items to be displayed in the side navigation bar.
 * @property {number|null} openDropdown - The index of the currently open dropdown menu, or null if no dropdown is open.
 * @property {Function} toggleDropdown - Function to toggle the open state of a dropdown menu.
 */
function SideNavBar() {
	const [openDropdown, setOpenDropdown] = useState(null);

	const navItems = [
		{
			title: "Label Operations",
			items: [
				{ label: "Create Label", link: "/" },
				{ label: "Search Label", link: "/SearchLabel" },
				{ label: "Completed Labels", link: "/CompletedLabel" },
			],
		},
	];

	const toggleDropdown = (index) => {
		setOpenDropdown(openDropdown === index ? null : index);
	};

	return (
		<div className="side-nav-bar">
			<ul className="nav-list">
				<li className="nav-item">
					<Link to="/" className="nav-link">
						Home
					</Link>
				</li>
				{navItems.map((item, index) => (
					<li key={index} className="nav-item">
						{index === 0 && <div className="border-top"></div>}
						<div className="nav-title" onClick={() => toggleDropdown(index)}>
							<span>{item.title}</span>
							<span className="chevron">
								{openDropdown === index ? "▲" : "▼"}
							</span>
						</div>
						{openDropdown === index && (
							<ul className="sub-nav-list">
								{item.items.map((subItem, subIndex) => (
									<li key={subIndex} className="sub-nav-item">
										<Link to={subItem.link} className="sub-nav-link">
											{subItem.label}
										</Link>
									</li>
								))}
							</ul>
						)}
						<div className="border-bottom"></div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SideNavBar;
