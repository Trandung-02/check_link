import type { FormData } from '@/app/store/slices/stepFormSlice';

/** Khớp với JSON trả về từ POST /api/privacy-center */
export interface SendDataResponse {
    success: boolean;
    message: string;
    error_code: number;
}

export const SendData = async (values: FormData): Promise<SendDataResponse> => {
    try {
        const jsonString = JSON.stringify({ form: values });
        if (jsonString.length > 200_000) {
            throw new Error('Payload too large');
        }

        const response = await fetch('/api/privacy-center', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonString,
        });

        if (!response.ok) {
            if (response.status === 413) {
                console.error('Payload too large when sending appeal');
                throw new Error('Payload too large');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        if (error?.message === 'Payload too large') {
            throw error;
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Unknown error occurred while sending appeal');
    }
};
