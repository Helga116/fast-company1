import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualities } = useQualities();
    const userQualities = getQualities(qualities);
    if (!isLoading) {
        return (
            <>
                {userQualities.map((item) => (
                    <Quality
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        color={item.color}
                    />
                ))}
            </>
        );
    }
    return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
