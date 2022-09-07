import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
    // хранилище для данных полей
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    // хранилище для ошибок
    const [errors, setErrors] = useState({});
    // обработчик событий в поле input
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // объект с правилами валидации и месседжами
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    // момент, когда запускается валидатор, всякий раз при обновлении данных полей
    useEffect(() => {
        validate();
    }, [data]);
    // функция валидатор, получает ошибки с помощью метода validator из utils, а также записывает state ошибок, возвращает true или false;
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    // эта перемен для передачи в disabled, может быть true или false
    const isValid = Object.keys(errors).length === 0;
    // это обработчик отправки формы на сервер, здесь второй раз вызывается валидатор, если его значение false, то возвращается полученное значение и кнопка блокируется?
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return isValid;
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
