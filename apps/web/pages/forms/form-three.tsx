import { useState } from "react";
import { Sections } from "../";
import * as data from "../data.json";
import * as Yup from "yup";
import Form from "../../components/form";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  webDevelopment: Yup.boolean(),
  appDevelopment: Yup.boolean()
});

export default function FormThree() {
const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    webDevelopment: false,
    appDevelopment: false
  });

  const handleSubmit = (values) => {
    dispatch({ type: 'SET_STEP_INDEX', payload: 3 });
  };

  const section = data[Sections.AppDevelopmentNeeds];

  return (
    <div>
      <Form
        id="form-three"
        values={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        title={section.question}
        options={section.options}
      />
    </div>
  );
}