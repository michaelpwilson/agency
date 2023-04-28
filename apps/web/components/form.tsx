import { useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "../pages/index.module.scss";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface FormProps {
    id: string,
    values: Record<string, boolean>;
    validationSchema: Yup.Schema<Record<string, boolean>>;
    onSubmit: (values: Record<string, boolean>) => void;
    title: string;
    options: { id: string; answer: string }[];
    lastStep?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function Form({ values, validationSchema, onSubmit, title, options, lastStep }: FormProps) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState<FormErrors>({});
    const router = useRouter();
    const { query } = router;

  const handleChange = (event, item) => {
    const { name, checked } = event.target;

    dispatch({ type: 'SET_SELECTED_OPTIONS', payload: item });
  
    // Get the current list of items from the query object
    let itemList: string[] = [];

    if (Array.isArray(query.items)) {
      itemList = query.items;
    } else if (typeof query.items === 'string') {
      itemList = query.items.split(',');
    }

    // Add a new item to the list
    itemList.push(item.id);

    // Combine the items into a comma-separated string
    const updatedItems = itemList.join(',');

    // Update the URL with the new query parameters
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        items: updatedItems,
      },
    });

    console.log(itemList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        // Submit the form
        onSubmit(values);
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          console.log(error);

          if (error.path === "options") {
            newErrors[error.path] = error.message;
          } else {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      });
  };

  const optionList = options.map((item, index) => (
    <div key={index} className={styles.checkbox}>
        <input type="checkbox" id={item.id} name={item.id} checked={values[item.id]} onChange={(event) => handleChange(event, item)}/>
        <label htmlFor={item.id}>{item.answer}</label>
    </div>
  ));

  return (
    <form onSubmit={handleSubmit} className={styles['section--quote']}>
      <h3>{title}</h3>
      <p>Tick all the below which apply.</p>

      <div className={styles['section__body']}>
          {optionList}
      </div>

      <div className={styles['section__footer']}>
        {Object.keys(errors).length > 0 && (
          <div className={styles.error}>Please select at least one option</div>
        )}
        <button type="submit" className="button">
            {lastStep ? (
                <span>Generate Quote</span>
            ) : (
                <span>Next Step</span>
            )}
        </button>
      </div>
    </form>
  );
}