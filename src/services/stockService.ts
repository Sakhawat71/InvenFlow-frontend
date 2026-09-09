"use server";

import { cookies } from "next/headers";
import type { FieldValues } from "react-hook-form";

type ApiResult<T = unknown> = { success: boolean; message?: string; data?: T };
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const getHeaders = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

export const getStockTransactions = async (): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/stock`, { headers: await getHeaders(), cache: "no-store" });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to load stock transactions." };
  }
};

export const getStockTransactionById = async (id: string): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/stock/${id}`, { headers: await getHeaders(), cache: "no-store" });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to load stock transaction." };
  }
};

export const createStockTransaction = async (stockData: FieldValues): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/stock`, { method: "POST", headers: await getHeaders(), body: JSON.stringify(stockData) });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to create stock transaction." };
  }
};

export const updateStockTransaction = async (id: string, stockData: FieldValues): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/stock/${id}`, { method: "PATCH", headers: await getHeaders(), body: JSON.stringify(stockData) });
    return (await response.json()) as ApiResult;
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to update stock transaction." };
  }
};
