"use client";

import { useState } from "react";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  const submit = async (data: Record<string, unknown>) => {
    setState({ status: "loading", message: "" });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setState({ status: "error", message: result.error || "Une erreur est survenue." });
        return false;
      }

      setState({ status: "success", message: result.message });
      return true;
    } catch {
      setState({ status: "error", message: "Erreur de connexion. Veuillez réessayer." });
      return false;
    }
  };

  const reset = () => setState({ status: "idle", message: "" });

  return { state, submit, reset };
}

export function useFormDataSubmit(endpoint: string) {
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  const submit = async (formData: FormData) => {
    setState({ status: "loading", message: "" });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setState({ status: "error", message: result.error || "Une erreur est survenue." });
        return false;
      }

      setState({ status: "success", message: result.message });
      return true;
    } catch {
      setState({ status: "error", message: "Erreur de connexion. Veuillez réessayer." });
      return false;
    }
  };

  const reset = () => setState({ status: "idle", message: "" });

  return { state, submit, reset };
}
