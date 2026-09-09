export const ROLES = [
    'ADMIN',
    'INVENTORY_MANAGER',
    'DEPARTMENT_STAFF',
    'APPROVER',
    'PROCUREMENT_OFFICER',
    'FINANCE_OFFICER',
] as const;
export type Role = (typeof ROLES)[number];
export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
};
export type LoginResponse = {
    user: User;
    token: string;
};
