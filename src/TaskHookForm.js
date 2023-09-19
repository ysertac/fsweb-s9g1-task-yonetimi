import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const TaskHookForm = ({ kisiler, id, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
    mode: "onChange",
  });

  const formSubmit = (data, e) => {
    submitFn({
      ...data,
      status: "yapılacak",
      id: id,
    });
    e.target.reset();
  };

  const validatePeople = (value) => {
    if (value.length < 1) {
      return "En az 1 kişi seçmelisiniz";
    } else if (value.length > 3) {
      return "En fazla 3 kişi seçebilirsiniz";
    }
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(formSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required: "Başlık alanı zorunludur.",
            minLength: {
              value: 3,
              message: "En az 3 karakter",
            },
          })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Açıklama alanı zorunludur.",
            minLength: {
              value: 10,
              message: "En az 10 karakter",
            },
          })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", { validate: validatePeople })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
