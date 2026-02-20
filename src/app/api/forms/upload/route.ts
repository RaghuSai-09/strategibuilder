import { NextRequest, NextResponse } from 'next/server';
import { extractPdfFields, getFilledFields, groupFieldsBySection } from '@/lib/pdf-extractor';
import { getAcordForm } from '@/config/acord-forms';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const formId = formData.get('formId') as string | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No file uploaded' },
                { status: 400 }
            );
        }

        if (!formId) {
            return NextResponse.json(
                { success: false, message: 'Form ID is required' },
                { status: 400 }
            );
        }

        // Validate file type
        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { success: false, message: 'Only PDF files are accepted' },
                { status: 400 }
            );
        }

        // Validate file size (max 20MB)
        const maxSize = 20 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, message: 'File size exceeds 20MB limit' },
                { status: 400 }
            );
        }

        // Extract arrayBuffer and verify PDF magic bytes
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        
        // Check for PDF magic bytes: "%PDF-"
        const pdfMagic = [0x25, 0x50, 0x44, 0x46, 0x2D]; // %PDF-
        const hasPdfMagic = pdfMagic.every((byte, index) => bytes[index] === byte);
        
        if (!hasPdfMagic) {
            return NextResponse.json(
                { success: false, message: 'File is not a valid PDF (invalid file signature)' },
                { status: 400 }
            );
        }

        // Get form config
        const formConfig = getAcordForm(formId);
        if (!formConfig) {
            return NextResponse.json(
                { success: false, message: 'Unknown form type' },
                { status: 400 }
            );
        }

        // Extract fields from PDF
        const result = await extractPdfFields(arrayBuffer, formConfig);

        if (!result.success) {
            return NextResponse.json(
                { success: false, message: result.error || 'Failed to extract data from PDF' },
                { status: 422 }
            );
        }

        // Get filled fields and group by section
        const filledFields = getFilledFields(result);
        const grouped = groupFieldsBySection(filledFields);

        // Guard against division by zero
        const completionPercentage = result.totalFields > 0
            ? Math.round((result.filledFields / result.totalFields) * 100)
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                formId: result.formId,
                totalFields: result.totalFields,
                filledFields: result.filledFields,
                emptyFields: result.emptyFields,
                completionPercentage,
                fields: result.fields,
                filledFieldsOnly: filledFields,
                groupedFields: grouped,
            },
            message: `Successfully extracted ${result.filledFields} of ${result.totalFields} fields`,
        });
    } catch (error) {
        console.error('Form upload error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
