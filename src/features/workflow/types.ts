export type PR = {
    id: string;
    item: {
        id?: string;
        name: string;
    };
    quantity: number;
    urgency: string;
    status: string;
    createdAt: string;
    requester?: {
        name: string;
    };
};
export type Approval = {
    id: string;
    purchaseRequest: {
        id: string;
        item: {
            name: string;
        };
        quantity: number;
    };
    requester: {
        name: string;
    };
    status: string;
};
export type Supplier = {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
};
export type Quotation = {
    id: string;
    supplier: {
        id: string;
        name: string;
    };
    purchaseRequest: {
        id: string;
    };
    amount: number;
    deliveryTime?: string;
    terms?: string;
    status: string;
};
export type PO = {
    id: string;
    poNumber: string;
    supplier: {
        name: string;
    };
    quotation?: {
        id: string;
    };
    totalAmount: number;
    status: string;
};
export type GR = {
    id: string;
    purchaseOrder: {
        poNumber: string;
    };
    receivedItems: {
        inventoryId: string;
        itemName: string;
        quantity: number;
    }[];
    receivedDate: string;
};
