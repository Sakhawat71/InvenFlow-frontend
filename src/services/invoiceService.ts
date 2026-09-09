"use server";

import { cookies } from "next/headers";
import type { FieldValues } from "react-hook-form";

type ApiResult<T = unknown> = { success: boolean; message?: string; data?: T };
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const getHeaders = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return { "Content-Type": "application/json", ...(accessToken && { Authorization: `Bearer ${accessToken}` }) };
};

export const getInvoices = async (): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/invoice`, { headers: await getHeaders(), cache: "no-store" });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to load invoices." };
  }
};

export const getInvoiceById = async (id: string): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/invoice/${id}`, { headers: await getHeaders(), cache: "no-store" });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to load invoice." };
  }
};

export const createInvoice = async (invoiceData: FieldValues): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/invoice`, { method: "POST", headers: await getHeaders(), body: JSON.stringify(invoiceData) });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to create invoice." };
  }
};

export const updateInvoice = async (id: string, invoiceData: FieldValues): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/invoice/${id}`, { method: "PATCH", headers: await getHeaders(), body: JSON.stringify(invoiceData) });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to update invoice." };
  }
};

export const deleteInvoice = async (id: string): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/invoice/${id}`, { method: "DELETE", headers: await getHeaders() });
    if (response.status === 204) return { success: true };
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to delete invoice." };
  }
};
