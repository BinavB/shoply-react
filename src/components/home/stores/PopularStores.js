import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { removeDuplicates } from "utils/CustomFunctions";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import StoreCard from "../../cards/StoreCard";
import DotSpin from "../../DotSpin";
import useGetPopularStore from "../../../api-manage/hooks/react-query/store/useGetPopularStore";

const PopularStores = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { selectedFilterValue, configData, totalDataCount, setTotalDataCount } =
    props;
  const [offset, setOffSet] = useState(1);
  const [page_limit, setPage_Limit] = useState(12);
  const [storeData, setStoreData] = useState([]);
  const { ref, inView } = useInView();
  const prevSelectedFilter = useRef();
  let queryKey = "homepage-popular-stores";
  const pageParams = {
    queryKey,
    type: selectedFilterValue,
    offset,
    limit: page_limit,
  };
  const { data, refetch, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPopularStore(pageParams);
  useEffect(() => {
    setOffSet(1);
  }, [selectedFilterValue]);
  const handleAPiCallOnSuccess = (item) => {
    setTotalDataCount(item.total_size);
    if (selectedFilterValue === prevSelectedFilter?.current) {
      setStoreData((prev) =>
        removeDuplicates([...new Set([...prev, ...item?.stores])], "id")
      );
    } else {
      setStoreData(item?.stores);
    }

    prevSelectedFilter.current = selectedFilterValue;
  };
  const handleStoreData = () => {
    if (data && data?.pages?.length > 0) {
      data?.pages?.forEach((item) => {
        handleAPiCallOnSuccess(item);
      });
    }
  };
  useEffect(() => {
    handleStoreData();
  }, [data]);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
      // if (!isLoading) {
      //   setOffSet((prevState) => prevState + 1);
      // }
    }
  }, [inView]);
  // useEffect(() => {
  //   if (offset === 1) {
  //     refetch();
  //   } else {
  //     fetchNextPage();
  //   }
  // }, [offset]);
  return (
    <CustomBoxFullWidth>
      <Grid container spacing={2}>
        {storeData?.length > 0 &&
          storeData?.map((item, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <StoreCard item={item} imageUrl={item?.cover_photo_full_url} />
              </Grid>
            );
          })}
        {(isLoading || isFetchingNextPage) && (
          <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            mt={storeData?.length === 0 ? (isSmall ? "7rem" : "10rem") : "3rem"}
          >
            <DotSpin />
          </CustomStackFullWidth>
        )}
      </Grid>
      {totalDataCount !== storeData.length && (
        <CustomBoxFullWidth ref={ref}></CustomBoxFullWidth>
      )}
    </CustomBoxFullWidth>
  );
};

PopularStores.propTypes = {};

export default React.memo(PopularStores);
