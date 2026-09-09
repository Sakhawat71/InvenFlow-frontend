"use server";

import { cookies } from "next/headers";
import type { FieldValues } from "react-hook-form";

type ApiResult<T = unknown> = { success: boolean; message?: string; data?: T };
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const getHeaders = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return { "Content-Type": "application/json", ...(accessToken && { Authorization: `Bearer ${accessToken}` }) };
};

export const getSuppliers = async (): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/supplier`, { headers: await getHeaders(), cache: "no-store" });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to load suppliers." };
  }
};

export const getSupplierById = async (id: string): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/supplier/${id}`, { headers: await getHeaders(), cache: "no-store" });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to load supplier." };
  }
};

export const createSupplier = async (supplierData: FieldValues): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/supplier`, { method: "POST", headers: await getHeaders(), body: JSON.stringify(supplierData) });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to create supplier." };
  }
};

export const updateSupplier = async (id: string, supplierData: FieldValues): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/supplier/${id}`, { method: "PATCH", headers: await getHeaders(), body: JSON.stringify(supplierData) });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to update supplier." };
  }
};

export const deleteSupplier = async (id: string): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/supplier/${id}`, { method: "DELETE", headers: await getHeaders() });
    if (response.status === 204) return { success: true };
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to delete supplier." };
  }
};
