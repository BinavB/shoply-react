import {
	alpha,
	Grid,
	Skeleton,
	styled,
	Tab,
	Tabs,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useGetCommonConditions } from "api-manage/hooks/react-query/common-conditions/useGetCommonConditions";
import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
	CustomBoxFullWidth,
	CustomFullDivider,
	CustomStackFullWidth,
	SliderCustom,
} from "styled-components/CustomStyles.style";
import useGetCommonConditionProducts from "../../../../../api-manage/hooks/react-query/common-conditions/useGetCommonConditionProducts";
import ProductCard from "../../../../cards/ProductCard";
import DotSpin from "../../../../DotSpin";
import EmptySearchResults from "../../../../EmptySearchResults";
import H2 from "../../../../typographies/H2";
import { HomeComponentsWrapper } from "../../../HomePageComponents";
import { Next, Prev } from "../../../popular-items-nearby/SliderSettings";
import { useQueryClient } from "react-query";

const StyledCustomSlider = styled(SliderCustom)(({ theme, active }) => ({
	color: active === "true" ? theme.palette.primary.main : "inherit",
	cursor: "pointer",
	"& .slick-slide": {
		marginY: "-25px",
		paddingY: "20px",
	},
	"& .slick-dots": {
		// marginTop: "100px",
		marginBottom: "-40px",
		"& li": {
			backgroundColor: alpha(theme.palette.primary.main, 0.2),
			width: "6px",
			height: "6px",
			borderRadius: "50%",
			"& button::before": {
				color: "transparent",
			},
		},
		"& li.slick-active button::before": {
			top: "-2px",
			backgroundColor: theme.palette.primary.main,
			width: "10px",
			height: "10px",
			borderRadius: "50%",
		},
	},
}));

const CommonConditions = (props) => {
	const { title } = props;
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("md"));
	const [selected, setSelected] = useState(0);
	const [conditionId, setConditionId] = useState(null);
	const [commonConditionData,setCommonConditionData] = useState([])
	const page_limit = "20";
	const offset = 1;

   const queryClient = useQueryClient()
  const handleSuccess = (res) => {
    setCommonConditionData(res)
  }

	const {
		data: conditions,
		refetch: conditionRefetch,
		isLoading: conditionsIsLoading,
		isRefetching: conditionsIsrefetching,
	} = useGetCommonConditions();

	const { data, refetch, isLoading, isRefetching } =
		useGetCommonConditionProducts({
			conditionId,
			page_limit,
			offset,
		},handleSuccess);

	useEffect(() => {
		setConditionId(conditions?.data[0]?.id);
	}, [conditions]);

	useEffect(() => {
		conditionRefetch();
	}, []);

	// useEffect(() => {
	// 	if (conditionId) {
	// 		refetch();
	// 	}
	// }, [conditionId]);

	const handleClick = (id, index) => {
		setSelected(index);
		setConditionId(id);
	};

	const handleCheckData = useCallback(() => {
		const queryState=queryClient.getQueryState(`[common-condition-products-${conditionId}]`)
		
		if(!queryState || queryState.isStale){
			 refetch()
		}else{
			setCommonConditionData(queryState?.data)
		}
	 },[commonConditionData])
   
	useEffect(() => {
	 handleCheckData()
   }, [conditionId]);

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		slidesPerRow: 1,
		rows: data?.total_size > 7 ? 2 : 1,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1450,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					rows: data?.total_size > 7 ? 2 : 1,
				},
			},
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					rows: data?.total_size > 3 ? 2 : 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					rows: data?.total_size > 4 ? 2 : 1,
				},
			},
			{
				breakpoint: 590,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					rows: data?.total_size > 2 ? 2 : 1,
					dots: false,
				},
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					rows: data?.total_size > 3 ? 2 : 1,
					dots: false,
				},
			},
			{
				breakpoint: 360,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					rows: 4,
					dots: false,
				},
			},
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					rows: 5,
					dots: false,
				},
			},
		],
		prevArrow: <Prev />,
		nextArrow: <Next />,
	};

	return (
		<HomeComponentsWrapper sx={{ marginBottom: "20px" }}>
			<H2 text={title} textAlign="flex-start" component="h2" />
			<CustomFullDivider sx={{ marginY: "5px" }} />
			<Grid container spacing={{ xs: 1, sm: 1, md: 3 }}>
				<Grid item xs={12} sm={0} md={3}>
					<CustomStackFullWidth spacing={1}>
						{conditionsIsLoading && conditionsIsrefetching ? (
							<>
								{[...Array(8)].map((item, index) => {
									return (
										<Skeleton
											key={index}
											variant="text"
											width={`${Math.floor(Math.random() * 300)}px`}
										/>
									);
								})}
							</>
						) : (
							<SimpleBar style={{ maxHeight: "50vh" }}>
								<Tabs
									orientation={isSmall ? "horizontal" : "vertical"}
									variant={isSmall && "scrollable"}
									scrollButtons
									sx={{
										[theme.breakpoints.down("md")]: {
											"& .MuiTabs-root": {
												minHeight: "0px !important",
											},
										},
									}}
								>
									{conditions?.data?.map((item, index) => {
										return (
											<Tab
												key={index}
												textAlign="flex-start"
												onClick={() => handleClick(item.id, index)}
												label={item?.name}
												sx={{
													alignItems: "flex-start",
													marginLeft: isSmall
														? "24px !important"
														: "0px !important",
													fontSize:
														selected === index ? "700" : "400",
													color:
														selected === index
															? "primary.main"
															: "text.secondary",
													cursor: "pointer",
													[theme.breakpoints.down("md")]: {
														padding: "0px 16px !important",
														minHeight: "0px !important",
													},
												}}
											/>
										);
									})}
								</Tabs>
							</SimpleBar>
						)}
					</CustomStackFullWidth>
				</Grid>
				<Grid item xs={12} sm={12} md={9}
				 sx={{
					//margin: { xs: "-4px", md: "-7.5px" },
					opacity: isLoading ? ".5" : "",
					transition: "all ease .3s",
					position: "relative",
					"&::before": {
					  position: "absolute",
					  inset: "0",
					  content: '""',
					  zIndex: "999",
					  display: isLoading ? "block" : "none",
					},
				  }}
				>
					{isLoading ? (
						<CustomStackFullWidth
						sx={{ height: "100%" ,position:"absolute",
							inset: "0",
							zIndex: "9999",
						   
							}}
							alignItems="center"
							justifyContent="center"
						>
							<DotSpin />
						</CustomStackFullWidth>
					) : null}
					<>
							{commonConditionData?.products?.length === 0 ? (
								<CustomStackFullWidth
									sx={{ height: "100%", padding: "2rem" }}
									alignItems="center"
									justifyContent="center"
								>
									<EmptySearchResults
										text="Items Not Found!"
										isItems
									/>
								</CustomStackFullWidth>
							) : (
								<CustomBoxFullWidth>
									<StyledCustomSlider>
										<Slider {...settings}>
											{commonConditionData?.products?.length > 0 &&
												commonConditionData?.products?.map((item) => (
													<ProductCard
														key={item?.id}
														item={item}
														cardheight="340px"
														cardFor="vertical"
														cardType="vertical-type"
														noMargin="true"
														pharmaCommon={true}
													/>
												))}
										</Slider>
									</StyledCustomSlider>
								</CustomBoxFullWidth>
							)}
						</>
				</Grid>
			</Grid>
		</HomeComponentsWrapper>
	);
};

CommonConditions.propTypes = {};

export default CommonConditions;
