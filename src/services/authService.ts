"use server";

import { cookies } from "next/headers";
import type { FieldValues } from "react-hook-form";

type ApiResult<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const requestError = (error: unknown): ApiResult => ({
  success: false,
  message: error instanceof Error ? error.message : "Something went wrong.",
});

export const loginUser = async (
  userData: FieldValues,
): Promise<ApiResult> => {
  try {
    const response = await fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      cache: "no-store",
    });

    const result = (await response.json()) as ApiResult<{ token?: string }>;

    if (result.success && result.data?.token) {
      (await cookies()).set("accessToken", result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return result;
  } catch (error) {
    return requestError(error);
  }
};

export const getCurrentUser = async (): Promise<ApiResult | null> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) return null;

    const response = await fetch(`${BASE_API}/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    const result = (await response.json()) as ApiResult;

    if (!result.success) return null;

    return result;
  } catch {
    return null;
  }
};

export const logoutUser = async (): Promise<ApiResult> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      await fetch(`${BASE_API}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });
    }

    cookieStore.delete("accessToken");

    return { success: true, message: "Logged out successfully." };
  } catch (error) {
    return requestError(error);
  }
};
