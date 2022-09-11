import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../form/textField";
import SelectField from "../../form/selectField";
import RadioField from "../../form/radioField";
import MultiSelectField from "../../form/multiSelectField";
import api from "../../../../api";
import { validator } from "../../../../utils/validator";

const EditUserPage = ({ props }) => {
    const params = useParams(props);
    const { userId } = params;
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });

        api.users
            .getById(userId)
            .then((data) => {
                const qualitiesList = data.qualities.map(
                    ({ name, _id, color }) => ({
                        label: name,
                        value: _id,
                        color: color
                    })
                );
                setData({
                    ...data,
                    profession: {
                        label: data.profession.name,
                        value: data.profession._id
                    },
                    qualities: qualitiesList
                });
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя пользователя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const history = useHistory();
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession.value),
            qualities: getQualities(qualities)
        });
        history.push(`/users/${userId}`);
    };
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    if (!isLoading) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h1>Редактирование профиля пользователя</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Напишите имя"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Укажите электронную почту"
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Измените профессию"
                                id={professions.value}
                                defaultOption={data.profession.label}
                                options={professions}
                                name={professions.label}
                                onChange={handleChange}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return "loading...";
    }
};

export default EditUserPage;

EditUserPage.propTypes = {
    props: PropTypes.object
};
