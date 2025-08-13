import React, { FunctionComponent } from "react";

import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import $ from "./Form.module.css";

import { ButtonType } from "@/types";

interface FormEntry {
  name: string;
  placeholder: string;
  // TODO: Defined a suitable type for extra props
  // This type should cover all different of attribute types
  extraProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

interface FormProps {
  label: string;
  loading: boolean;
  formEntries: FormEntry[];
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitText: string;
  submitType?: ButtonType;
}

const Form: FunctionComponent<FormProps> = ({
  label,
  loading,
  formEntries,
  onFormSubmit,
  submitText,
  submitType = "submit",
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>{label}</legend>
        {formEntries.map(({ name, placeholder, extraProps }, index) => (
          <div key={`${name}-${index}`} className={$.formRow}>
            <InputText
              key={`${name}-${index}`}
              name={name}
              placeholder={placeholder}
              {...extraProps}
            />
          </div>
        ))}

        <Button loading={loading} type={submitType}>
          {submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
