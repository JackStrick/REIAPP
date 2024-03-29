import { useState } from "react";
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
	ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../Misc/FlexBetween";
import {
	AppBar,
	Button,
	Box,
	Typography,
	IconButton,
	InputBase,
	Toolbar,
	Menu,
	MenuItem,
	useTheme,
	Icon,
} from "@mui/material";
import { logout, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../assets/ProfileImage.jpeg";
import Duck from "../../assets/Duck.jpeg";
import { setMode } from "../../features/mode/modeSlice";

/**
 * Navbar component with various actions and user information.
 * @param {Object} props - React component properties.
 * @param {boolean} props.isSidebarOpen - Flag indicating whether the sidebar is open.
 * @param {function} props.setIsSidebarOpen - Function to toggle the sidebar.
 * @returns {JSX.Element} - Rendered Navbar component.
 */
const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const theme = useTheme();

	const { user } = useSelector((state) => state.auth);

	const [anchorEl, setAnchorEl] = useState(null);
	const isOpen = Boolean(anchorEl);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	/**
	 * Handle logout action.
	 */
	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};

	return (
		<AppBar
			sx={{
				position: "static",
				background: "none",
				boxShadow: "none",
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{/* LEFT SIDE */}
				<FlexBetween>
					<IconButton
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					>
						<MenuIcon />
					</IconButton>
					<FlexBetween
						backgroundColor={theme.palette.background.alt}
						borderRadius="9px"
						gap="3rem"
						p="0.1rem 1.5rem"
					></FlexBetween>
				</FlexBetween>

				{/* Right Side */}
				<FlexBetween gap="1.5rem">
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkModeOutlined
								sx={{
									fontSize: "25px",
									color: theme.palette.secondary[500],
								}}
							/>
						) : (
							<LightModeOutlined
								sx={{
									fontSize: "25px",
									color: theme.palette.secondary[500],
								}}
							/>
						)}
					</IconButton>
					<IconButton
						onClick={() => {
							navigate(`/profile`);
						}}
					>
						<SettingsOutlined sx={{ fontSize: "25px" }} />
					</IconButton>
					<FlexBetween>
						<Button
							variant=""
							color="secondary"
							onClick={handleClick}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								textTransform: "none",
								gap: "1rem",
							}}
						>
							<Box
								component="img"
								alt="profile"
								src={
									user.fname !== "Victor"
										? profileImage
										: Duck
								}
								height="32px"
								width="32px"
								borderRadius="50%"
								sx={{ objectFit: "cover" }}
							/>
							<Box textAlign="left">
								{theme.palette.mode === "dark" ? (
									<Typography
										fontWeight="bold"
										fontSize="0.85rem"
										sx={{ color: theme.palette.primary }}
									>
										{user.fname} {user.lname}
									</Typography>
								) : (
									<Typography
										fontWeight="bold"
										fontSize="0.85rem"
										sx={{ color: "#214752" }}
									>
										{user.fname} {user.lname}
									</Typography>
								)}

								{theme.palette.mode === "dark" ? (
									<Typography
										fontSize="0.75rem"
										sx={{ color: theme.palette.grey[200] }}
									>
										{user.fname !== "Victor"
											? "Real Estate Investor"
											: "Professor"}
									</Typography>
								) : (
									<Typography
										fontSize="0.75rem"
										sx={{ color: "#214752" }}
									>
										{user.fname !== "Victor"
											? "Real Estate Investor"
											: "Professor"}
									</Typography>
								)}
							</Box>

							{theme.palette.mode === "dark" ? (
								<ArrowDropDownOutlined
									sx={{
										color: theme.palette.grey[300],
										fontSize: "25px",
									}}
								/>
							) : (
								<ArrowDropDownOutlined
									sx={{
										color: theme.palette.secondary[300],
										fontSize: "25px",
									}}
								/>
							)}
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={isOpen}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
						>
							<MenuItem onClick={onLogout}>Log Out</MenuItem>
						</Menu>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
