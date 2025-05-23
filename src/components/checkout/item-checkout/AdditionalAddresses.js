import React, { useEffect, useState } from "react";

import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	Typography,
} from "@mui/material";

import {
	CustomStackFullWidth,
	CustomTextField,
} from "../../../styled-components/CustomStyles.style";
import { useTheme } from "@emotion/react";
import { ACTIONS } from "../../address/states";

const AdditionalAddresses = (props) => {
	const {
		t,
		additionalInformationStates,
		additionalInformationDispatch,
		saveAddress,
		address,
		setAddress,
		orderType,
	} = props;
	const [street, setStreet] = useState(
		additionalInformationStates.streetNumber
	);
	const [house, setHouse] = useState(additionalInformationStates.houseNumber);
	const [floor, setFloor] = useState(additionalInformationStates.floor);
	useEffect(() => {
		address?.road && setStreet(address?.road);
		address?.house && setHouse(address?.house);
		address?.floor && setFloor(address?.floor);
	}, [address?.house, address?.road, address?.floor]);
	const handleStreetChange = (e) => {
		setStreet(e.target.value);
		additionalInformationDispatch({
			type: ACTIONS.setStreetNumber,
			payload: e.target.value,
		});
	};
	const handleHouseChange = (e) => {
		setHouse(e.target.value);
		additionalInformationDispatch({
			type: ACTIONS.setHouseNumber,
			payload: e.target.value,
		});
	};
	const handleFloorChange = (e) => {
		setFloor(e.target.value);
		additionalInformationDispatch({
			type: ACTIONS.setFloor,
			payload: e.target.value,
		});
	};

	const theme = useTheme();
	const handleSave = (e) => {
		if (e.target.checked) {
			saveAddress();
		}
	};
	useEffect(() => {
		if (orderType !== "take_away") {
			setAddress({ ...address, road: street, house: house, floor: floor });
		}
		// return () => {
		// 	setAddress({ ...address, road: "", house: "", floor: "" });
		// };
	}, [street, house, floor]);
	return (
		// eslint-disable-next-line react/jsx-no-undef
		<CustomStackFullWidth>
			<CustomStackFullWidth>
				<FormGroup>
					<Grid container spacing={{ xs: 1, sm: 2, md: 2 }}>
						<Grid item xs={12}>
							<CustomTextField
								label={t("Street number")}
								value={street}
								fullWidth
								onChange={(e) => handleStreetChange(e)}
							/>
						</Grid>
						<Grid item xs={6}>
							<CustomTextField
								label={t("House number")}
								value={house}
								fullWidth
								onChange={(e) => handleHouseChange(e)}
							/>
						</Grid>
						<Grid item xs={6}>
							<CustomTextField
								label={t("Floor")}
								value={floor}
								fullWidth
								onChange={(e) => handleFloorChange(e)}
							/>
						</Grid>
					</Grid>
					<FormControlLabel
						onChange={(e) => handleSave(e)}
						control={<Checkbox />}
						label={
							<Typography
								fontWeight="400"
								fontSize="13px"
								color={theme.palette.primary.main}
							>
								{t("Save this Address")}
							</Typography>
						}
					/>
				</FormGroup>
			</CustomStackFullWidth>
		</CustomStackFullWidth>
	);
};

AdditionalAddresses.propTypes = {};

export default AdditionalAddresses;
