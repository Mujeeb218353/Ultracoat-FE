import { useCallback, useMemo, useState } from "react";
import { buildQuotationSchema, toCreatePayload } from "../schemas/quotation.schema";
import {
  initialQuotationForm,
  type ProductConfig,
  type QuotationFormState,
} from "../types/quotations.types";

const useQuotationForm = (config: ProductConfig | null) => {
  const [form, setForm] = useState<QuotationFormState>(initialQuotationForm);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback((patch: Partial<QuotationFormState>) => setForm((prev) => ({ ...prev, ...patch })), []);

  const changeProduct = useCallback((productId: string) => update({ productId, specs: {}, features: [] }), [update]);

  const result = useMemo(() => buildQuotationSchema(config).safeParse(form), [form, config]);

  const errors = useMemo(() => {
    if (!submitted || result.success) return {};
    return Object.fromEntries(result.error.issues.map((i) => [i.path.join("."), i.message]));
  }, [result, submitted]);

  const validate = useCallback(() => {
    setSubmitted(true);
    return result.success;
  }, [result]);

  const getPayload = useCallback(() => (result.success ? toCreatePayload(result.data) : null), [result]);

  const reset = useCallback(() => {
    setForm(initialQuotationForm);
    setSubmitted(false);
  }, []);

  return { form, update, changeProduct, errors, validate, getPayload, reset, isValid: result.success };
};

export default useQuotationForm;