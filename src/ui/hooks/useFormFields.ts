import { useState, ChangeEvent } from "react";

export function useFormFields<T extends Record<string, any>>(initialValues: T) {
  const [fields, setFields] = useState<T>(initialValues);

  // Generic onChange handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const setField = (name: keyof T, value: any) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const resetFields = () => setFields(initialValues);

  return { fields, handleChange, setField, resetFields };
}
