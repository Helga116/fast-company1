import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualitiesService from "../services/qualities.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [qualities, setQualities] = useState();
    const [error, setError] = useState(null);
    useEffect(() => {
        getQualitiesList();
        getQualities();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getQualitiesList() {
        try {
            const { content } = await qualitiesService.get();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getQualities(users, qualities) {
        return users.map((user) => {
            // return qualities.filter((q) => q._id === user.qualities.id);
        });
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    console.log(qualities);
    return (
        <QualitiesContext.Provider
            value={{ isLoading, qualities, getQualities }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
