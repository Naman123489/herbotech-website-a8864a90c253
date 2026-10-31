import type { FormEvent } from "react";
import { useState } from "react";
import { api, type PostEnquiryRequest, type PostEnquiryResponse } from "../api/generated";
import { useAction, errorMessage } from "../lib/useAction";
import { Button, Field, TextArea, Select, Alert } from "./ui";

const industries: PostEnquiryRequest["industry"][] = [
  "Ayurveda",
  "Nutraceuticals",
  "Cosmetics",
  "Herbal Teas",
  "Botanical Extracts",
  "Herbal Wellness Brands",
  "Other",
];

const productForms: PostEnquiryRequest["productForm"][] = [
  "Cleaned and Graded Whole Herbs",
  "Cut and Sifted Herbs",
  "Herbal Powders",
];

type FormValues = PostEnquiryRequest & { website: string };

export default function EnquiryForm({
  defaultHerb = "",
  defaultForm = "Cleaned and Graded Whole Herbs",
  onSuccess,
}: {
  defaultHerb?: string;
  defaultForm?: PostEnquiryRequest["productForm"];
  onSuccess?: (result: PostEnquiryResponse) => void;
}) {
  const initial: FormValues = {
    fullName: "",
    companyName: "",
    businessEmail: "",
    phoneNumber: "",
    industry: "Ayurveda",
    requiredHerb: defaultHerb,
    productForm: defaultForm,
    estimatedQuantity: "",
    requiredSpecifications: "",
    additionalMessage: "",
    website: "",
  };

  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof PostEnquiryRequest, string>>>({});
  const [result, setResult] = useState<PostEnquiryResponse | undefined>();
  const submit = useAction((body: PostEnquiryRequest) => api.postEnquiry(body));

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    const next: Partial<Record<keyof PostEnquiryRequest, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!values.companyName.trim()) next.companyName = "Company name is required.";
    if (!values.businessEmail.trim()) next.businessEmail = "Business email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.businessEmail.trim())) next.businessEmail = "Enter a valid email address.";
    if (!values.phoneNumber.trim()) next.phoneNumber = "Phone number is required.";
    else if (values.phoneNumber.trim().length < 7) next.phoneNumber = "Enter a valid phone number.";
    if (!values.requiredHerb.trim()) next.requiredHerb = "Required herb is required.";
    if (!values.estimatedQuantity.trim()) next.estimatedQuantity = "Estimated quantity is required.";
    if (!values.requiredSpecifications.trim()) next.requiredSpecifications = "Required specifications are required.";
    else if (values.requiredSpecifications.trim().length < 10) next.requiredSpecifications = "Please provide at least 10 characters.";
    if (!values.additionalMessage.trim()) next.additionalMessage = "Additional message is required.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(undefined);
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (values.website.trim()) {
      setErrors({ additionalMessage: "Submission could not be processed." });
      return;
    }
    const body: PostEnquiryRequest = {
      fullName: values.fullName.trim(),
      companyName: values.companyName.trim(),
      businessEmail: values.businessEmail.trim(),
      phoneNumber: values.phoneNumber.trim(),
      industry: values.industry,
      requiredHerb: values.requiredHerb.trim(),
      productForm: values.productForm,
      estimatedQuantity: values.estimatedQuantity.trim(),
      requiredSpecifications: values.requiredSpecifications.trim(),
      additionalMessage: values.additionalMessage.trim(),
    };
    const output = await submit.run(body);
    if (output) {
      setResult(output);
      setValues(initial);
      setErrors({});
      onSuccess?.(output);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {submit.status === 401 && <Alert tone="error">Your session has expired. Please log in and try again.</Alert>}
      {submit.error && submit.status !== 401 && <Alert tone="error">{submit.error}</Alert>}
      {result && <Alert tone="success">Thank you. Your enquiry has been recorded with reference {result.enquiryId}. Our team will respond using your business email.</Alert>}

      <div style={{ position: "absolute", left: "-9999px", top: "auto" }} aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </label>
      </div>

      <div className="grid" style={{ "--min": "240px" } as React.CSSProperties}>
        <Field label="Full name" error={errors.fullName} value={values.fullName} onChange={(e) => update("fullName", e.target.value)} />
        <Field label="Company name" error={errors.companyName} value={values.companyName} onChange={(e) => update("companyName", e.target.value)} />
      </div>
      <div className="grid" style={{ "--min": "240px" } as React.CSSProperties}>
        <Field label="Business email" type="email" error={errors.businessEmail} value={values.businessEmail} onChange={(e) => update("businessEmail", e.target.value)} />
        <Field label="Phone number" type="tel" error={errors.phoneNumber} value={values.phoneNumber} onChange={(e) => update("phoneNumber", e.target.value)} />
      </div>
      <Select
        label="Industry"
        options={industries.map((item) => [item, item])}
        value={values.industry}
        onChange={(e) => update("industry", e.target.value as PostEnquiryRequest["industry"])}
      />
      <div className="grid" style={{ "--min": "240px" } as React.CSSProperties}>
        <Field label="Required herb" error={errors.requiredHerb} value={values.requiredHerb} onChange={(e) => update("requiredHerb", e.target.value)} />
        <Select
          label="Product form"
          options={productForms.map((item) => [item, item])}
          value={values.productForm}
          onChange={(e) => update("productForm", e.target.value as PostEnquiryRequest["productForm"])}
        />
      </div>
      <Field label="Estimated quantity" error={errors.estimatedQuantity} value={values.estimatedQuantity} onChange={(e) => update("estimatedQuantity", e.target.value)} hint="Include units, for example 500 kg or 2 tonnes." />
      <TextArea label="Required specifications" error={errors.requiredSpecifications} value={values.requiredSpecifications} onChange={(e) => update("requiredSpecifications", e.target.value)} />
      <TextArea label="Additional message" error={errors.additionalMessage} value={values.additionalMessage} onChange={(e) => update("additionalMessage", e.target.value)} />

      <Button type="submit" loading={submit.pending} className="btn-block">Submit Business Enquiry</Button>
    </form>
  );
}
