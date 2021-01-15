import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Tile from "../components/Tile";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link, useLocation, useHistory } from "react-router-dom";

const StyledTextField = styled(TextField)`
	&& {
		width: 80%;
		margin: 0 10% 16px 10%;
		.MuiInputBase-root {
			background-color: white;
		}
	}
`;

const StyledButton = styled(Button)`
    && {
        margin: 10px;
    }
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

function SystemForm(props) {

    const { createSystem, readSystem, updateSystem } = props;

    const location = useLocation();
    let history = useHistory();
    const [foundSystem, setSystem] = useState({});

    // add yup method to validate IP addresses
    function ipv4(message = 'Invalid IP address') {
        return this.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
            message,
            excludeEmptyString: true
        }).test('ip', message, value => {
            return value === undefined || value.trim() === '' ? true : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
        });
    }
    yup.addMethod(yup.string, 'ipv4', ipv4);

    useEffect(() => {
        if (location.query) {
            const getSystem = async () => {
                const aSystem = await readSystem(location.query.id);
                let system = aSystem.data();
                setSystem(system);
            }
            getSystem()
        }
    }, [])

    const systemFormSchema = yup.object().shape({
        name: yup.string().required("Enter a nickname for the system"),
        systemIp: yup.string().ipv4().required("Enter the system's IP address"),
        systemUsername: yup.string().required("Enter the system's login username"),
        systemPassword: yup.string().required("Enter the system's login password"),
        ipmiIp: yup.string().ipv4().required("Enter the IPMI tool IP address"),
        ipmiUsername: yup.string().required("Enter the IPMI tool's login username"),
        ipmiPassword: yup.string().required("Enter the IPMI tool's login password")
    });

	const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(systemFormSchema) });

    const onSubmit = data => {
        if (location.query) {
            console.log("updating", data, location.query.id);
            updateSystem(location.query.id, data)
        } else {
            console.log("creating", data);
            createSystem(data);
        }
        history.push('/');
    };

    return (
        <React.Fragment>
        {(Object.keys(foundSystem).length > 0 || !location.query) && ( // if there's a query, only load when system data is recieved. defaultValue only loads on render and cant be updated.
            <form onSubmit={handleSubmit(onSubmit)}>

                <StyledTextField
                    name="name"
                    label="System Name"
                    type="text"
                    variant="outlined"
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : ""}
                    inputRef={register}
                    defaultValue={foundSystem.name}
                />

                <StyledTextField
                    name="systemIp"
                    label="System IP"
                    type="text"
                    variant="outlined"
                    error={Boolean(errors.systemIp)}
                    helperText={errors.systemIp ? errors.systemIp.message : ""}
                    inputRef={register}
                    defaultValue={foundSystem.systemIp}
                />

                <StyledTextField
                    name="systemUsername"
                    label="System Username"
                    type="text"
                    variant="outlined"
                    error={Boolean(errors.systemUsername)}
                    helperText={errors.systemUsername ? errors.systemUsername.message : ""}
                    inputRef={register}
                    defaultValue={foundSystem.systemUsername}
                />

                <StyledTextField
                    name="systemPassword"
                    label="System Password"
                    type="text"
                    variant="outlined"
                    error={Boolean(errors.systemPassword)}
                    helperText={errors.systemPassword ? errors.systemPassword.message : ""}
                    inputRef={register}
                    defaultValue={foundSystem.systemPassword}
                />

                <StyledTextField
                    name="ipmiIp"
                    label="IPMI IP"
                    type="text"
                    variant="outlined"
                    error={Boolean(errors.ipmiIp)}
                    helperText={errors.ipmiIp ? errors.ipmiIp.message : ""}
                    inputRef={register}
                    defaultValue={foundSystem.ipmiIp}
                />

                <StyledTextField
                    name="ipmiUsername"
                    label="IPMI Username"
                    type="text"
                    variant="outlined"
                    error={Boolean(errors.ipmiUsername)}
                    helperText={errors.ipmiUsername ? errors.ipmiUsername.message : ""}
                    inputRef={register}
                    defaultValue={foundSystem.ipmiUsername}
                />

                <StyledTextField
                    name="ipmiPassword"
                    label="IPMI Password"
                    type="text"
                    variant="outlined"
                    error={Boolean(errors.ipmiPassword)}
                    helperText={errors.ipmiPassword ? errors.ipmiPassword.message : ""}
                    inputRef={register}
                    defaultValue={foundSystem.ipmiPassword}
                />

                <StyledButtonWrapper>
                    <StyledButton type="submit" variant="contained" color="primary">Confirm</StyledButton>
                    <StyledButton variant="contained" component={Link} to="/">Cancel</StyledButton>
                </StyledButtonWrapper>

            </form>
        )}

        </React.Fragment>
    );
};

SystemForm.propTypes = {
    createSystem: PropTypes.func.isRequired,
    readSystem: PropTypes.func.isRequired,
    updateSystem: PropTypes.func.isRequired,
};

export default SystemForm;