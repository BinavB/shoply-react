import {
	Alert,
	alpha,
	Badge,
	Box,
	Button,
	Chip,
	Container,
	Divider,
	Fab,
	FormControlLabel,
	Grid,
	InputBase,
	List,
	ListItem,
	OutlinedInput,
	Paper,
	Select,
	Stack,
	styled,
	Tabs,
	TextareaAutosize,
	TextField,
	Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
// import imgB from '../../public/static/Privacy/RectangleP.png'
//import { Link } from 'react-router-dom'

export const FlexContainerCol = styled(Box)({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
});
export const FlexContainerSpaceBetween = styled(Box)({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
});
export const FlexContainerCenter = styled(Box)({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
	maxWidth: "1400px",
	width: "100%",
	marginRight: "auto",
	marginLeft: "auto",
});
export const FlexContainer = styled(Box)({
	display: "flex",
	gap: ".5rem",
	overflowX: "auto",
	whiteSpace: "nowrap",
	flexWrap: "nowrap",
	padding: "8px 0px 8px 5px",
	typography: "body1",
	"& :not(style) + :not(style)": {
		ml: 1,
		// mr:2
	},
});
export const CustomTextField = styled(TextField)(({ theme }) => ({
	borderRadius: "13px",
	"& .MuiInputBase-input": {
		padding: "15px 10px",
		"& .MuiOutlinedInput-input": {
			padding: "4px 10px",
			borderRadius: "5px",
		},
	},
}));
export const CustomTextArea = styled(TextareaAutosize)(({ theme }) => ({
	padding: "10px",
	borderRadius: "8px",
	border: `1px solid ${theme.palette.primary.main}`,
	backgroundColor: theme.palette.neutral[100],
	color: theme.palette.neutral[1000],
}));
export const CustomPaper = styled(Paper)(({ theme, width, height }) => ({
	//backgroundColor: '#D1D5DB',
	padding: "2rem",
	maxWidth: width ? width : "600px",
	width: "100%",
	minHeight: "100px",
	height: height ? height : "100%",
	borderRadius: "20px",
	justifyContent: "center",
	textAlign: "center",
}));

export const CustomPaperBigCard = styled(Paper)(
	({
		theme,
		nopadding,
		minheight,
		height,
		backgroundcolor,
		padding,
		width,
		noboxshadow,
	}) => ({
		backgroundColor: backgroundcolor
			? backgroundcolor
			: theme.palette.background.paper,
		padding: nopadding === "true" ? "none" : padding ? padding : "1.875rem",
		width: width ? width : "100%",
		height: height ? height : "100%",
		minHeight: minheight && minheight,
		borderRadius: "10px",
		boxShadow:
			noboxshadow === "true"
				? "none"
				: theme.palette.mode === "light"
				? `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`
				: "none",
		// marginBottom: '30px',
	})
);

export const CustomButton = styled(Button)(({ theme }) => ({
	[theme.breakpoints.up("sm")]: {},
}));
export const CustomFullDivider = styled(Divider)(({ theme }) => ({
	width: "100%",
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
	borderRadius: "0.125rem",
	position: "relative",
	"& img": {
		width: "100%",
		height: "300px",
		objectFit: "contain",
	},
}));
export const CustomColouredTypography = styled(Typography)(
	({ theme, color }) => ({
		color: color ? color : theme.palette.primary.main,
	})
);
export const CustomColouredTypographySubtitle = styled(Typography)(
	({ theme }) => ({
		marginTop: "0.563rem",
		textTransform: "none",
		color: theme.palette.neutral[700],
	})
);

export const CenteringSingleComponentOnLayout = styled(Box)({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100%",
	width: "100%",
});

export const CustomTabs = styled(Tabs)(({ theme }) => ({
	border: "1px solid",
	borderColor: theme.palette.primary.main,
	padding: "5px",
	borderRadius: "15px",
	"& .MuiTabs-scrollButtons.Mui-disabled": {
		opacity: 0.3,
	},
}));
export const CloseIconWrapper = styled("div")(
	({ theme, right, language_direction }) => ({
		top: 0,
		right: right ? right : 0,
		height: "100%",
		position: "absolute",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "red",
	})
);

export const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	color: theme.palette.neutral[500],
}));

export const CustomBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		fontWeight: "bold",
	},
}));
export const CustomTypographyBold = styled(Typography)(
	({ theme, marginTop }) => ({
		fontWeight: "bold",
	})
);
export const CustomTypographyAlign = styled(Typography)(({ theme, align }) => ({
	textAlign: align,
}));

export const CustomChip = styled(Chip)(({ theme }) => ({
	fontWeight: "bold",
}));

export const CustomIconButton = styled(Box)(({ theme, marginTop, align }) => ({
	display: "flex",
	justifyContent: align ? align : "center",
	alignItems: "center",
	color: theme.palette.neutral[700],
	cursor: "pointer",
	gap: "8px",
}));

export const CustomBoxFullWidth = styled(Box)(({ theme }) => ({
	width: "100%",
}));
export const CustomStackFullWidth = styled(Stack)(
	({ theme, marginBottom, justifyContent }) => ({
		width: "100%",
		justifyContent: justifyContent,
	})
);
export const CustomBoxWithSpacing = styled(Box)(
	({ theme, marginTopBottom }) => ({
		width: "100%",
		marginTop: marginTopBottom && `${marginTopBottom}rem`,
		marginBottom: marginTopBottom && `${marginTopBottom}rem`,
	})
);

export const CustomSearch = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#F3F2F2",
	color: "black",
	//alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		//backgroundColor: alpha(theme.palette.common.white, 0.25),
		backgroundColor: "#F3F2F2",
	},
	marginLeft: 0,
	marginRight: "10px",
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));
export const StyledInputBase = styled(InputBase)(({ theme, width }) => ({
	color: "inherit",
	width: "120px",
	border: "2px solid #EF7822",
	padding: "5px 0",
	marginLeft: "5px",
	borderRadius: "5px",
	"& .MuiInputBase-input": {
		fontSize: "1.3rem",
		textAlign: "center",
	},
}));

export const Logo = styled("div")(({ theme, height, width }) => ({
	width: width,
	height: height,
	justifyContent: "center",

	position: "relative",
	cursor: "pointer",
	"& img": {
		width: "100%",
		height: "100%",
		objectFit: "contained",
	},
}));

export const CustomLink = styled(Link)(({ theme, color }) => ({
	color: color ? color : "primary.main",
	cursor: "pointer",
	fontWeight: "700",
	"&:hover": {
		//backgroundColor: alpha(theme.palette.common.white, 0.25),
		color: theme.palette.primary.dark,
		textDecoration: "none",
	},
}));

export const CustomTextFieldContainer = styled(Box)(
	({ theme, background, noheight }) => ({
		width: "100%",
		height: !noheight && "5rem",
		color: theme.palette.neutral[1000],
	})
);
export const CustomStackForLoaction = styled(Stack)(({ theme }) => ({
	justifyContent: "center",
	cursor: "pointer",
	alignItems: "center",
}));
export const CustomOverlayBox = styled(Box)(({ theme, height, top }) => ({
	position: "absolute",
	bottom: 0,
	left: 0,
	top: top ? top : 0,
	width: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.54)",
	color: "white",
	// padding: '10px',
	height: height ? height : "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: "999",
}));

export const CustomFab = styled(Fab)(({ theme, module_type }) => ({
	width: "30px",
	height: "30px",
	minHeight: "30px",

	[theme.breakpoints.down("sm")]: {
		width: "30px",
		height: "30px",
	},
}));
export const CustomImageContainerStyled = styled(Box)(
	({
		theme,
		sm_width,
		max_width,
		margin_bottom,
		width,
		smheight,
		height,
		objectfit,
		minwidth,
		border_radius,
		sm_mb,
		sm_max_width,
		mdHeight,
		cursor,
		aspect_ratio,
		padding,
		bg
	}) => ({
		//maxWidth:'20rem',
		display: "inline-flex",
		backgroundColor: bg || "transparent",
		width: width ? width : "100%",
		height: height ? height : "100%",
		minWidth: minwidth,
		maxWidth: max_width,
		padding: padding ? padding : "",
		marginBottom: margin_bottom,
		position: "relative",
		borderRadius: border_radius || "none",
		[theme.breakpoints.down("md")]: {
			height: mdHeight ? mdHeight : "",
		},

		[theme.breakpoints.down("sm")]: {
			marginBottom: sm_mb ? sm_mb : "",
			height: smheight ? smheight : "",
			maxWidth: sm_max_width ? sm_max_width : "",
			width: sm_width ? sm_width : "",
		},
		"& img": {
			width: "100%",
			height: "100%",
			objectFit: objectfit ? objectfit : "cover",
			objectPosition: "50% 50%",
			borderRadius: border_radius,
			aspectRatio: aspect_ratio ? aspect_ratio : "",
		},
	})
);
export const CustomListItem = styled(ListItem)(
	({ theme, display, cursor, border }) => ({
		display: display,
		cursor: cursor && "pointer",
		border: border,
		borderRadius: "10px",

		paddingInline: "5px",
		justifyContent: "flex-start",
	})
);

export const CustomBoxAbsoluteCenter = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
}));
export const ccsSelect = styled(Select)(({ theme }) => ({
	select: {
		"&:before": {
			borderColor: (theme) => theme.palette.primary.main,
		},
		"&:after": {
			borderColor: (theme) => theme.palette.primary.main,
		},
	},
	icon: {
		fill: (theme) => theme.palette.primary.main,
	},
}));

export const CustomList = styled(List)(({ theme, border }) => ({
	paddingTop: "0px",
}));
export const SliderCustom = styled(Stack)(
	({
		float,
		theme,
		language_direction,
		nopadding,
		paddingBottom,
		padding,
	}) => ({
		position: "relative",
		width: "100%",
		paddingY: "10px",
		"& .slick-slider": {
			"& .slick-slide": {
				padding: padding ?? "6px",
			},
			"& .slick-list": {
				paddingY: nopadding !== "true" && "8px",
				//transform: "translate3d(0px, 0px, 0px) !important",
				//paddingBottom: "1rem !important",
				"& .slick-track": {
					float: float
						? float
						: theme.direction === "ltr"
						? "left"
						: "right",
					gap: "5px",
					
					//paddingBottom: paddingBottom && "1rem !important",
				},
			},
		},
	})
);

export const CustomTypographyGray = styled(Typography)(
	({ theme, nodefaultfont, textdecoration }) => ({
		color: theme.palette.neutral[400],
		fontWeight: "normal",
		fontSize: nodefaultfont !== "true" && "14px",
		textDecoration: textdecoration,
	})
);
export const CustomBoxForTips = styled(Box)(({ theme, active }) => ({
	paddingInline: "10px",
	height: "50px",
	width: "auto",
	minWidth: "50px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	border: "1px solid ",
	borderColor: theme.palette.primary.main,
	cursor: "pointer",
	borderRadius: "5px",
	background: active && theme.palette.primary.main,
	position: "relative",
	[theme.breakpoints.down("sm")]: {
		height: "30px",
		paddingInline: "5px",
	},
}));

export const StoreDetailsNavButton = styled(Button)(
	({
		theme,
		color,
		background,
		language_direction,
		borderRigthTop,
		borderRightBottom,
		borderLeftBottom,
		borderLeftTop,
	}) => ({
		backgroundColor: background ? theme.palette.primary.main : "inherit",
		color: background
			? theme.palette.whiteContainer.main
			: theme.palette.neutral[1000],
		borderRadius: "15px",
		borderBottomLeftRadius: borderLeftBottom && borderLeftBottom,

		"&:hover": {
			backgroundColor: background && theme.palette.primary.deep,
		},
	})
);
export const CustomModalWrapper = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	borderRadius: "8px",
	backgroundColor: "background.paper",
	p: 2,
	outline: "none",
}));

export const StoreImageBox = styled(Box)(
	({ theme, borderraduis, padding, border }) => ({
		padding: padding ? padding : "12px",
		border: border,
		borderRadius: borderraduis ? borderraduis : "5px",
		display: "flex",
		alignItems: "center",
		position: "relative",
		width: "76px",
		[theme.breakpoints.down("md")]: {
			padding: "18px",
			width: "81px",
		},
	})
);

export const AddressTypeStack = styled(Stack)(
	({ theme, addressType, value }) => ({
		padding: "10px",
		border:
			value === addressType
				? `1px solid ${theme.palette.primary.main}`
				: `1px solid ${alpha(theme.palette.neutral[400], 0.5)}`,
		borderRadius: "5px",
		background:
			value === addressType && alpha(theme.palette.primary.main, 0.2),
		cursor: "pointer",
	})
);

export const UserInfoGrid = styled(Grid)(({ theme, page, userToken }) => ({
	position: "relative",
	zIndex: 99,
	minHeight: "100px",
	"&::before": {
		content: '""',
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: userToken ? "42%" : "0%",
		backgroundColor: alpha(theme.palette.primary.main, 0.1),
		zIndex: -1,
		[theme.breakpoints.down("md")]: {
			bottom:
				page === "profile-settings"
					? "81%"
					: page === "inbox"
					? "0%"
					: "37%",
		},
	},

	"&::after": {
		content: '""',
		position: "absolute",
		left: 0,
		bottom: userToken ? "42%" : "0%",
		top: 0,
		right: 0,
		backgroundColor: alpha(theme.palette.primary.main, 0.1),
		zIndex: -1,
		[theme.breakpoints.down("md")]: {
			bottom:
				page === "profile-settings"
					? "81%"
					: page === "inbox"
					? "0%"
					: "37%",
		},
	},
}));
export const UserProfileTabs = styled(Tabs)(({ theme, isActive }) => ({
	"& .MuiTabs-scroller": {
		"& .MuiTabs-flexContainer": {
			flexWrap: "nowrap",
		},
	},
	"& .MuiButtonBase-root": {
		minHeight: "42px",
		color: theme.palette.neutral[600],
		textTransform: "capitalize",
		[theme.breakpoints.down("sm")]: {
			minHeight: "32px",
		},
	},
}));

export const UserProfileTab = styled(Button)(
	({ theme, page, item, marginright, fontSize, borderRadius }) => ({
		background:
			item?.name === page && alpha(theme.palette.primary.main, 0.1),
		paddingInlineEnd: "15px",
		paddingInlineStart: "15px",
		marginInlineEnd: marginright ? marginright : "25px",
		paddingBlockEnd: "0px",
		paddingBlockStart: "0px",
		borderRadius: borderRadius ? borderRadius : "10px",
		[theme.breakpoints.down("sm")]: {
			marginInlineEnd: "10px",
			paddingInlineEnd: "7px",
			paddingInlineStart: "7px",
		},
	})
);

export const RoundedStack = styled(Stack)(
	({ theme, width, height, background, smwidth, smheight }) => ({
		width: width,
		height: height,
		backgroundColor: background,
		borderRadius: "50%",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		[theme.breakpoints.down("md")]: {
			width: smwidth,
			height: smheight,
		},
	})
);
export const CouponStyle = styled(Stack)(({ theme }) => ({
	position: "relative",
	"&::after": {
		position: " absolute",
		content: '""',
		display: "block",
		width: "22px",
		height: "22px",
		backgroundColor: "#D9D9D9",
		top: "-20px",
		right: "-9px",
		zIndex: 1,
		borderRadius: "50%",
	},
	"&::before": {
		position: " absolute",
		content: '""',
		display: "block",
		width: "22px",
		height: "22px",
		backgroundColor: "#D9D9D9",
		bottom: "-20px",
		right: "-10px",
		zIndex: 1,
		borderRadius: "50%",
	},
}));
export const PageDetailsWrapper = styled(CustomStackFullWidth)(({ theme }) => ({
	marginTop: "1rem",
}));
export const CustomStackForFoodModal = styled(Stack)(({ theme, padding }) => ({
	padding: padding ? padding : "18px",
	position: "absolute",
	bottom: "0",
	background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(18 18 18 / 94%) 100%)`,
}));
export const CustomSpan = styled("span")(({ theme }) => ({
	color: theme.palette.text.secondary,
}));
