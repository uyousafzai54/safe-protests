import React from "react";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "../../css/Toolbar.css";

const toolbar = (props) => (
	<header className="toolbar">
		<nav className="toolbar_navigation">
			<div className="spacer" />
			<div className="toolbar_togglebutton">
				<DrawerToggleButton click={props.drawerClickHandler} />{" "}
				{/* send button click function to the sidedrawer button */}
			</div>
			<div className="spacer" />
		</nav>
	</header>
);

export default toolbar;
