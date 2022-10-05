import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const initialData = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    // data состояние для одного нового коммента
    const [data, setData] = useState(initialData);
    // юзеры, из которых мы выбираем кто пишет коммент
    const [users, setUsers] = useState({});
    // объект ошибок
    const [errors, setErrors] = useState({});
    // обработчик на текст и выбор юзера, который помещает коммент в стейт
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // объект валидатора с месседжами
    const validatorConfig = {
        userId: {
            isRequired: {
                message:
                    "Выберите, от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    // функция валидации, вызывается из utils, туда коммент и объект валидатор, записываем объект ошибок
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);
    const isValid = Object.keys(errors).length === 0;
    // при загрузке загружает юзеров для селект
    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);
    // очищает форму после размещения коммента
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    // обработчик размещения сообщения, его валидации перед этим, записи в массив хранения, очистки окна
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate(data);
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    // создаем массив из юзеров для селект и опшионс
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    id="userId"
                    name="userId"
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    id="content"
                    name="content"
                    label="Сообщение"
                    rows="3"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
