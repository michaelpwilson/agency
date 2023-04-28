import { Sections } from "../";
import * as data from "../data.json";
import * as Yup from "yup";
import Form from "../../components/form";
import { useDispatch } from "react-redux";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  webDevelopment: Yup.boolean(),
  appDevelopment: Yup.boolean()
});

export default function FormOne() {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({ webDevelopment: false, appDevelopment: false });

    const handleSubmit = (values) => {
        dispatch({ type: 'SET_STEP_INDEX', payload: 1 });
    };

    const section = data[Sections.ServicesRequired];

    return (
        <div>
            <Form
                id="form-one"
                values={formValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                title={section.question}
                options={section.options}
            />
        </div>
    );
}