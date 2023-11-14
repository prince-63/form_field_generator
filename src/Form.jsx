import React, { useState } from "react";
import "./form.css";

const FormBuilder = () => {
    const [fields, setFields] = useState([]);
    const [formType, setFormType] = useState("");
    const [label, setLabel] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [options, setOptions] = useState([]);
    const [getPadding, setPadding] = useState("0px");
    const generateHtmlCode = () => {
        return fields
            .map((field, index) => {
                if (field.type === "radio" || field.type === "checkbox") {
                    return `<div class="form-group">\n    <label>${
                        field.label
                    }</label>\n    ${field.options
                        .map(
                            (option, i) =>
                                `<input type="${field.type}" value="${option}" name="${field.label}" /> ${option}`
                        )
                        .join("\n    ")}\n</div>`;
                } else {
                    return `<div class="form-group">\n    <label>${field.label}</label>\n    <input type="${field.type}" placeholder="${field.placeholder}" />\n</div>`;
                }
            })
            .join("\n");
    };

    const addField = (type, label, placeholder, options, validation) => {
        setFields([
            ...fields,
            { type, label, placeholder, options, validation },
        ]);
    };

    const handleFormType = (e) => {
        setFormType(e.target.value);
    };

    const handleLabel = (e) => {
        setLabel(e.target.value);
    };

    const handlePlaceholder = (e) => {
        setPlaceholder(e.target.value);
    };

    const handleOptions = (e) => {
        setOptions(e.target.value.split(","));
    };

    return (
        <div className="container" style={{}}>
            <div className="form-intro">
                <h2 className="form-title">Form Builder: code generator</h2>
                <p className="form-description">
                    This is a simple form builder. You can add fields by
                    selecting the type of field from the dropdown and entering
                    the label and placeholder. You can add as many fields as you
                    want. The form will be generated on the left side of the
                    screen.
                </p>
            </div>
            <div className="child_container">
                <div className="form_generator" style={{ padding: getPadding }}>
                    <div className="form-body">
                        {fields.map((field, index) => {
                            if (field.type === "radio") {
                                return (
                                    <div className="form-group" key={index}>
                                        <label className="form-label">
                                            {field.label}
                                        </label>
                                        {field.options.map((option, i) => (
                                            <div
                                                key={i}
                                                className="radio-option"
                                            >
                                                <input
                                                    className="form-control"
                                                    type={field.type}
                                                    value={option}
                                                    name={field.label}
                                                />
                                                <label>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                );
                            } else if (field.type === "checkbox") {
                                return (
                                    <div className="form-group" key={index}>
                                        <label className="form-label">
                                            {field.label}
                                        </label>
                                        {field.options.map((option, i) => (
                                            <div
                                                key={i}
                                                className="checkbox-option"
                                            >
                                                <input
                                                    className="form-control"
                                                    type={field.type}
                                                    value={option}
                                                    name={field.label}
                                                />
                                                <label>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="form-group" key={index}>
                                        <label className="form-label">
                                            {field.label}
                                        </label>
                                        <input
                                            className="form-control"
                                            type={field.type}
                                            placeholder={field.placeholder}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="form">
                    <div className="select-group">
                        <p>Enter form type</p>
                        <select onChange={handleFormType}>
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="password">Password</option>
                            <option value="tel">Phone Number</option>
                            <option value="date">Date</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                        </select>
                    </div>
                    {formType === "radio" || formType === "checkbox" ? (
                        <>
                            <div className="input-group">
                                <p>Enter options (comma separated)</p>
                                <input type="text" onChange={handleOptions} />
                            </div>
                            <div className="input-group">
                                <p>Enter label</p>
                                <input type="text" onChange={handleLabel} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="input-group">
                                <p>Enter label</p>
                                <input type="text" onChange={handleLabel} />
                            </div>
                            <div className="input-group">
                                <p>Enter placeholder</p>
                                <input
                                    type="text"
                                    onChange={handlePlaceholder}
                                />
                            </div>
                        </>
                    )}
                    <button
                        className="button"
                        onClick={() => {
                            addField(formType, label, placeholder, options, {});
                            setFormType("");
                            setPadding("20px");
                        }}
                    >
                        Add Field
                    </button>
                </div>
            </div>
            <div className="intro">
                <div>
                    <div className="code_output">
                        <h3>Generated HTML Code:</h3>
                        <textarea readOnly value={generateHtmlCode()} />
                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    generateHtmlCode()
                                )
                            }
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormBuilder;
