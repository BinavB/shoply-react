import React, { useEffect, useState } from "react";
import CustomSideDrawer from "../../../side-drawer/CustomSideDrawer";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../../styled-components/CustomStyles.style";
import {
  alpha,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MapComponent from "../../../Map/location-view/MapComponent";
import { Box, Stack, styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import CustomDivider from "../../../CustomDivider";
import { t } from "i18next";
import DeliveryManInfoCard from "../../../checkout/parcel/DeliveryManInfo";
import ParcelTrackOderStepper from "../../../parcel/ParcelTrackOderStepper";
import useGetTrackOrderData from "../../../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import CustomEmptyResult from "../../../custom-empty-result";
import { getGuestId, getToken } from "helper-functions/getToken";
import { getAmountWithSign } from "helper-functions/CardHelpers";
import emptyImage from "../../../../assets/empty.png";
import { CustomCloseIconButton } from "../../../added-cart-view/Cart.style";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/router";

const CustomLine = styled(Box)(({ theme }) => ({
  borderLeft: "1px dashed",
  borderColor: alpha(theme.palette.neutral[500], 0.5),
  height: "81px",
  marginLeft: "8px",
}));

const TrackParcelOrderDrawer = (props) => {
  const theme = useTheme();
  const router = useRouter();

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [orderData, setOrderData] = useState(null);
  const { sideDrawerOpen, orderId, setSideDrawerOpen, phoneOrEmail } = props;
  const [actStep, setActStep] = useState(1);
  const guestId = getGuestId();
  const phone = phoneOrEmail;

  const handleSuccess = (res) => {
    setOrderData(res);
  };
  const {
    error,
    refetch,
    data: trackOrderData,
    isLoading,
    isRefetching,
  } = useGetTrackOrderData(orderId, phone, guestId, handleSuccess);
  useEffect(() => {
    if (orderId) {
      refetch();
    }
  }, [orderId]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (orderId && orderData && orderData?.order_status !== "delivered") {
        refetch();
      }
    }, 10000); // Refetch every 10 seconds (10,000 milliseconds)

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [refetch]);
  const handleStepper = () => {
    if (trackOrderData?.order_status === "pending") {
      setActStep(1);
    } else if (trackOrderData?.order_status === "confirmed") {
      setActStep(2);
    } else if (trackOrderData?.order_status === "picked_up") {
      setActStep(3);
    } else if (trackOrderData?.order_status === "delivered") {
      setActStep(4);
    }
  };
  useEffect(() => {
    handleStepper();
  }, [actStep, trackOrderData, orderId]);
  const steps = [
    {
      label: "Order Placed",
      time: trackOrderData?.pending,
    },
    {
      label: "Order Confirmed",
      time: trackOrderData?.confirmed,
    },
    {
      label: "On the Way",
      time: trackOrderData?.picked_up,
    },
    {
      label: "Delivered",
      time: trackOrderData?.delivered,
    },
  ];
  const closeHandler = () => {
    setOrderData(null);
    setSideDrawerOpen(false);
  };
  const handleClick = () => {
    router.push(
      {
        pathname: "/profile",
        query: { orderId: trackOrderData?.id, page: "my-orders" },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <CustomSideDrawer
      anchor="right"
      open={sideDrawerOpen}
      onClose={closeHandler}
      variant="temporary"
      maxWidth="420px"
      width="100%"
      height="100vh"
      sx={{ position: "relative" }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ position: "absolute", top: "1rem", right: ".5rem" }}
      >
        <CustomCloseIconButton onClick={closeHandler}>
          <ClearIcon fontSize="16px" />
        </CustomCloseIconButton>
      </Stack>
      {orderData && !isLoading && (
        <>
          <CustomStackFullWidth padding="30px 24px 0px 24px">
            <Stack
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              mb="10px"
            >
              <Typography fontSize="16px" fontWeight="600" textAlign="center">
                {"Order ID:"}{" "}
                <Typography component="span" fontSize="16px" fontWeight="600">
                  {trackOrderData?.id}
                </Typography>
              </Typography>
            </Stack>

            <CustomStackFullWidth sx={{ position: "relative" }}>
              <MapComponent
                latitude={trackOrderData?.delivery_address?.latitude}
                longitude={trackOrderData?.delivery_address?.longitude}
                deliveryManLat={
                  trackOrderData?.order_status === "picked_up"
                    ? trackOrderData?.delivery_man?.lat
                    : trackOrderData?.receiver_details?.latitude
                }
                deliveryManLng={
                  trackOrderData?.order_status === "picked_up"
                    ? trackOrderData?.delivery_man?.lng
                    : trackOrderData?.receiver_details?.longitude
                }
              />
              <Stack
                position="absolute"
                bottom="-80px"
                width="280px"
                left={{ xs: "5%", sm: "8%", md: "16%" }}
              >
                <CustomPaperBigCard padding="10px">
                  <CustomStackFullWidth
                    spacing={1.5}
                    direction="row"
                    alignItems="center"
                    pl="10px"
                  >
                    <Stack>
                      <ShareLocationIcon
                        style={{ height: "20px", width: "16px" }}
                      />
                      <CustomLine />
                      <LocationOnIcon
                        style={{ height: "20px", width: "16px" }}
                      />
                    </Stack>
                    <Stack spacing={1}>
                      <Stack>
                        <Typography
                          fontSize="12px"
                          color={theme.palette.primary.main}
                        >
                          {t("Sender")}
                        </Typography>
                        <Typography fontSize="16px">
                          {
                            trackOrderData?.delivery_address
                              ?.contact_person_name
                          }
                        </Typography>
                        <Typography
                          fontSize="12px"
                          color={theme.palette.neutral[400]}
                        >
                          {trackOrderData?.delivery_address?.address}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          fontSize="12px"
                          color={theme.palette.primary.main}
                        >
                          {t("Receiver")}
                        </Typography>
                        <Typography fontSize="16px">
                          {
                            trackOrderData?.receiver_details
                              ?.contact_person_name
                          }
                        </Typography>
                        <Typography
                          fontSize="12px"
                          color={theme.palette.neutral[400]}
                        >
                          {trackOrderData?.receiver_details?.address}
                        </Typography>
                        {router.pathname !== "/profile" && (
                          <Button onClick={handleClick}>
                            {t("View Details")}
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </CustomStackFullWidth>
                </CustomPaperBigCard>
              </Stack>
            </CustomStackFullWidth>
            <Stack
              mt="100px"
              width="100%"
              justifyContent="center"
              pl="50px"
              pr="50px"
              mb="20px"
            >
              <ParcelTrackOderStepper steps={steps} activeStep={actStep} />
              {/*<TrackOrder />*/}
            </Stack>
            <CustomDivider border="1px" />
            <CustomStackFullWidth
              justifyContent="space-between"
              direction="row"
              mt="10px"
            >
              <Typography fontWeight="700" color={theme.palette.primary.main}>
                {t("Total")}
              </Typography>
              <Typography fontWeight="700" color={theme.palette.primary.main}>
                {getAmountWithSign(trackOrderData?.order_amount)}
              </Typography>
            </CustomStackFullWidth>
          </CustomStackFullWidth>
          {trackOrderData?.delivery_man && getToken() && (
            <DeliveryManInfoCard
              deliveryManInfo={trackOrderData?.delivery_man}
            />
          )}
        </>
      )}
      {isLoading && (
        <CustomStackFullWidth padding="70px 24px 0px 24px">
          <Skeleton variant="rectangular" width="100%" height="350px" />
        </CustomStackFullWidth>
      )}

      {!orderData && error && (
        <CustomStackFullWidth padding="100px 24px 0px 24px">
          <CustomEmptyResult
            image={emptyImage}
            label="Order not found"
            height="100px"
            width="100px"
          />
        </CustomStackFullWidth>
      )}
    </CustomSideDrawer>
  );
};

export default TrackParcelOrderDrawer;
