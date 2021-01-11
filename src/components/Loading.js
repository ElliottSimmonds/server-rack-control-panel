import React from "react";
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-width: 100vw;
    background-color: #EEEEEE;
    flex-direction: column;
`

const StyledLabel = styled.label`
    color: #6C757D;
    padding-bottom : 20px;
`;

function Loading() {

    return (
        <StyledWrapper>
            <StyledLabel>Loading...</StyledLabel>
            <CircularProgress size="5rem" variant="indeterminate"/>
        </StyledWrapper>
    );
}

export default Loading;