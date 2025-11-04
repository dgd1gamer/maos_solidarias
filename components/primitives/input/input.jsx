import React from "react";
import * as S from "./style";

export const InputFloat = ({ type, name, placeholder, information, value, onChange, required }) => (

  <S.InputFloat >
    <div className="form-floating input-float  my-3">
      <input

        type={type}
        className="form-control"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        required={required}
      />
      <label className="label-float" htmlFor={name}>
        {information}
      </label>
    </div>
  </S.InputFloat>
);
