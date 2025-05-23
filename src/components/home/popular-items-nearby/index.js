import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetPopularItemsNearby from "../../../api-manage/hooks/react-query/useGetPopularItemsNearby";

import { Grid, Skeleton } from "@mui/material";
import Slider from "react-slick";

import { useTranslation } from "react-i18next";

import { useGetFlashSales } from "api-manage/hooks/react-query/useGetFlashSales";
import { getLanguage } from "helper-functions/getLanguage";
import { setPopularItemsNearby } from "redux/slices/storedData";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "styled-components/CustomStyles.style";
import ProductCard from "../../cards/ProductCard";
import CampaignSimmerTimmer from "../../Shimmer/CampaignSimmerTimmer";
import ProductCardSimmerHorizontal from "../../Shimmer/ProductCardSimmerHorizontal";
import H2 from "../../typographies/H2";
import Subtitle1 from "../../typographies/Subtitle1";
import { NextFood, PrevFood } from "../best-reviewed-items/SliderSettings";
import { HomeComponentsWrapper } from "../HomePageComponents";
import ItemsCampaign from "./items-campaign-slide";

const PopularItemsNearby = ({ title, subTitle }) => {
  const { popularItemsNearby } = useSelector((state) => state.storedData);
  const { t } = useTranslation();
  const limit = 2;
  const offset = 1;
  const { data, refetch, isLoading, isFetching } = useGetPopularItemsNearby({
    offset: 1,
    type: "all",
  });
  const {
    data: flashSales,
    refetch: flashSalesRefetch,
    isLoading: flashSalesIsLoading,
  } = useGetFlashSales({ limit, offset });
  const dispatch = useDispatch();
  useEffect(() => {
    if (popularItemsNearby.products.length === 0) {
      refetch();
    }
  }, [popularItemsNearby]);

  useEffect(() => {
    flashSalesRefetch();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setPopularItemsNearby(data));
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);

  const flashSaleslength = () => {
    if (
      (flashSales &&
        typeof flashSales === "object" &&
        Object.keys(flashSales).length === 0) ||
      flashSales?.active_products?.length < 1
    ) {
      return false;
    } else {
      return true;
    }
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesPerRow: 1,
    rows: 3,
    slidesToShow: flashSaleslength() ? 2 : 2.7,
    slidesToScroll: 1,
    cssEase: "linear",
    rtl: getLanguage() === "rtl",
    responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1.1,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.2,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1.5,
          slidesPerRow: 2,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 1.55,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1.75,
          slidesPerRow: 1,
          rows: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1.8,
          slidesPerRow: 1,
          rows: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: flashSaleslength() ? 2 : 2.5,
          slidesPerRow: 1,
          rows: 3,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <PrevFood />,
    nextArrow: <NextFood />,
  };
  return (
    <HomeComponentsWrapper>
      {popularItemsNearby && popularItemsNearby?.products?.length > 0 && (
        <>
          <CustomStackFullWidth
            alignItems="center"
            justyfyContent="center"
            mt={{ xs: "10x", md: "16px" }}
            spacing={1}
          >
            {isFetching ? (
              <Skeleton varient="text" width="110px" />
            ) : (
              <H2 text={title} component="h2" />
            )}
            {isFetching ? (
              <Skeleton varient="text" width="310px" />
            ) : (
              <Subtitle1 text={t(subTitle)} component="p" />
            )}
            <CustomBoxFullWidth>
              <Grid container spacing={2} sx={{ marginTop: "1px" }}>
                {isFetching ? (
                  <Grid item xs={12} sm={12} md={9}>
                    <SliderCustom
                      nopadding="true"
                      sx={{
                        "& .slick-slide": {
                          marginY: "-15px",
                        },
                      }}
                    >
                      <Slider {...settings}>
                        {[...Array(15)].map((item, index) => {
                          return <ProductCardSimmerHorizontal key={index} />;
                        })}
                      </Slider>
                    </SliderCustom>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={12} md={flashSaleslength() ? 9 : 12}>
                    <SliderCustom
                      nopadding="true"
                      sx={{
                        "& .slick-slide": {
                          marginY: "-15px",
                        },
                      }}
                    >
                      <Slider currentSlide={0} {...settings}>
                        {popularItemsNearby?.products?.map((item, index) => {
                          return (
                            <ProductCard
                              key={index}
                              item={item}
                              cardheight="160px"
                              horizontalcard="true"
                              cardFor="popular items"
                            />
                          );
                        })}
                      </Slider>
                    </SliderCustom>
                  </Grid>
                )}

                {flashSalesIsLoading ? (
                  <Grid item xs={12} sm={5} md={3}>
                    <CampaignSimmerTimmer />
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={5} md={3}>
                    {flashSaleslength() && (
                      <ItemsCampaign flashSales={flashSales} />
                    )}
                  </Grid>
                )}
              </Grid>
            </CustomBoxFullWidth>
          </CustomStackFullWidth>
        </>
      )}
    </HomeComponentsWrapper>
  );
};

export default PopularItemsNearby;
