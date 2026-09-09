"use server";

import { cookies } from "next/headers";

type ApiResult<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

export const getDashboardData = async (): Promise<ApiResult> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const response = await fetch(`${BASE_API}/dashboard`, {
      method: "GET",
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: "no-store",
    });

    return (await response.json()) as ApiResult;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unable to load dashboard data.",
    };
  }
};
