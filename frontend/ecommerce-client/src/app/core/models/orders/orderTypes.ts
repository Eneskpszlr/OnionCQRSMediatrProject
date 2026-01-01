// Backend'e veri gönderirken (Create/Update) sadece ID yeterli
export interface OrderItemRequest {
    productId: number;
    quantity: number;
}

// Backend'den veri okurken (Response) isim ve fiyat da gelir
export interface OrderItemResponse {
    productId: number;
    productName: string;
    unitPrice: number;
    quantity: number;
}