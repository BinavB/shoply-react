import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Stack, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";

import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useResetPassword } from "../../../api-manage/hooks/react-query/forgot-password/useResetPassword";
import { useDispatch } from "react-redux";
import { setOpenForgotPasswordModal } from "redux/slices/utils";

const NewPassword = ({ data, goBack,phoneOrEmail }) => {
  const dispatch=useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const newPassFormik = useFormik({
    initialValues: {
      reset_token: data.reset_token,
      phone: data.phone,
      email:data?.email,
      password: "",
      confirm_password: "",
      verification_method:phoneOrEmail
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required(t("No password provided."))
        .min(6, t("Password is too short - should be 6 chars minimum.")),
      confirm_password: Yup.string()
        .required(t("No Confirm Password provided."))
        .oneOf([Yup.ref("password"), null], t("Passwords must match")),
    }),
    onSubmit: async (values, helpers) => {
      try {
        formSubmitHandler(values);
      } catch (err) {}
    },
  });
  const onSuccessHandler = (res) => {
    if (res) {
      toast.success(res.message, {
        id: "success",
      });
     dispatch(setOpenForgotPasswordModal(false))
      //router.push("/home", undefined, { shallow: true });
    }
  };
  const { mutate, isLoading } = useResetPassword(onSuccessHandler);
  const formSubmitHandler = (values) => {
    mutate(values, { onSuccess: onSuccessHandler });
  };
  return (
    <Box>
      <CustomStackFullWidth sx={{maxWidth:"370px"}}>

        <Stack mt="2rem" padding="0 20px">
          <form noValidate onSubmit={newPassFormik.handleSubmit}>
            <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                {t("Password")}
              </InputLabel>
              <OutlinedInput
                require
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={newPassFormik.values.password}
                onChange={newPassFormik.handleChange}
                error={
                  newPassFormik.touched.password &&
                  Boolean(newPassFormik.errors.password)
                }
                helperText={
                  newPassFormik.touched.password &&
                  newPassFormik.errors.password
                }
                touched={newPassFormik.touched.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                      //   onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("Password")}
              />
              {newPassFormik.errors.password && (
                <FormHelperText sx={{ color: "#FF686A" }}>
                  {newPassFormik.errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                {t("Confirm Password")}
              </InputLabel>
              <OutlinedInput
                require
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                value={newPassFormik.values.confirm_password}
                onChange={newPassFormik.handleChange}
                error={
                  newPassFormik.touched.confirm_password &&
                  Boolean(newPassFormik.errors.confirm_password)
                }
                helperText={
                  newPassFormik.touched.confirm_password &&
                  newPassFormik.errors.confirm_password
                }
                touched={newPassFormik.touched.confirm_password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setConfirmShowPassword((prevState) => !prevState)
                      }
                      //   onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("Confirm Password")}
              />
              {newPassFormik.errors.confirm_password && (
                <FormHelperText sx={{ color: "#FF686A" }}>
                  {newPassFormik.errors.confirm_password}
                </FormHelperText>
              )}
            </FormControl>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // loading={isLoading}
            >
              {t("Done")}
            </LoadingButton>
          </form>
        </Stack>
      </CustomStackFullWidth>
    </Box>
  );
};
export default NewPassword;
