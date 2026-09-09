"use server";

import { cookies } from "next/headers";
import type { FieldValues } from "react-hook-form";

type ApiResult<T = unknown> = { success: boolean; message?: string; data?: T };
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

const getHeaders = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    return { "Content-Type": "application/json", ...(accessToken && { Authorization: `Bearer ${accessToken}` }) };
};

export const getApprovals = async (): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/approval`, { headers: await getHeaders(), cache: "no-store" });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "Unable to load approvals." };
    }
};

export const getApprovalById = async (id: string): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/approval/${id}`, { headers: await getHeaders(), cache: "no-store" });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "Unable to load approval." };
    }
};

export const approvePurchaseRequest = async (id: string, approvalData: FieldValues = {}): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/approval/${id}/approve`, { method: "PATCH", headers: await getHeaders(), body: JSON.stringify(approvalData) });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "Unable to approve request." };
    }
};

export const rejectPurchaseRequest = async (id: string, approvalData: FieldValues = {}): Promise<ApiResult> => {
    try {
        const response = await fetch(`${BASE_API}/approval/${id}/reject`, { method: "PATCH", headers: await getHeaders(), body: JSON.stringify(approvalData) });
        return (await response.json()) as ApiResult;
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "Unable to reject request." };
    }
};
