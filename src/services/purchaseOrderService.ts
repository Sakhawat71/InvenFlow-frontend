"use server";

import { cookies } from "next/headers";
import type { FieldValues } from "react-hook-form";

type ApiResult<T = unknown> = { success: boolean; message?: string; data?: T };
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const getHeaders = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return { "Content-Type": "application/json", ...(accessToken && { Authorization: `Bearer ${accessToken}` }) };
};

export const getPurchaseOrders = async (): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/purchase-order`, { headers: await getHeaders(), cache: "no-store" });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to load purchase orders." };
  }
};

export const getPurchaseOrderById = async (id: string): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/purchase-order/${id}`, { headers: await getHeaders(), cache: "no-store" });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to load purchase order." };
  }
};

export const createPurchaseOrder = async (orderData: FieldValues): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/purchase-order`, { method: "POST", headers: await getHeaders(), body: JSON.stringify(orderData) });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to create purchase order." };
  }
};

export const updatePurchaseOrder = async (id: string, orderData: FieldValues): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/purchase-order/${id}`, { method: "PATCH", headers: await getHeaders(), body: JSON.stringify(orderData) });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to update purchase order." };
  }
};

export const deletePurchaseOrder = async (id: string): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/purchase-order/${id}`, { method: "DELETE", headers: await getHeaders() });
    if (response.status === 204) return { success: true };
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to delete purchase order." };
  }
};
