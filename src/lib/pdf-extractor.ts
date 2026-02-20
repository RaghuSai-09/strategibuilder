import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup } from 'pdf-lib';
import { AcordFormConfig } from '@/config/acord-forms';

export interface ExtractedField {
    pdfFieldName: string;
    label: string;
    value: string | boolean;
    type: 'text' | 'checkbox' | 'dropdown' | 'radio';
}

export interface ExtractionResult {
    success: boolean;
    formId: string;
    fields: ExtractedField[];
    totalFields: number;
    filledFields: number;
    emptyFields: number;
    error?: string;
}

/**
 * Extract form field data from a filled ACORD PDF
 */
export async function extractPdfFields(
    pdfBytes: ArrayBuffer,
    formConfig: AcordFormConfig
): Promise<ExtractionResult> {
    try {
        const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
        const form = pdfDoc.getForm();
        const pdfFields = form.getFields();

        const fields: ExtractedField[] = [];
        let filledCount = 0;
        let emptyCount = 0;

        for (const field of pdfFields) {
            const name = field.getName();
            const label = formConfig.fieldLabels[name] || name;

            let value: string | boolean = '';
            let type: ExtractedField['type'] = 'text';

            if (field instanceof PDFTextField) {
                type = 'text';
                value = field.getText() || '';
            } else if (field instanceof PDFCheckBox) {
                type = 'checkbox';
                value = field.isChecked();
            } else if (field instanceof PDFDropdown) {
                type = 'dropdown';
                const selected = field.getSelected();
                value = selected.length > 0 ? selected[0] : '';
            } else if (field instanceof PDFRadioGroup) {
                type = 'radio';
                value = field.getSelected() || '';
            }

            // Track fill status
            const isFilled = type === 'checkbox' ? value === true : value !== '';
            if (isFilled) {
                filledCount++;
            } else {
                emptyCount++;
            }

            fields.push({ pdfFieldName: name, label, value, type });
        }

        return {
            success: true,
            formId: formConfig.id,
            fields,
            totalFields: pdfFields.length,
            filledFields: filledCount,
            emptyFields: emptyCount,
        };
    } catch (error) {
        return {
            success: false,
            formId: formConfig.id,
            fields: [],
            totalFields: 0,
            filledFields: 0,
            emptyFields: 0,
            error: error instanceof Error ? error.message : 'Failed to parse PDF',
        };
    }
}

/**
 * Get only the filled (non-empty) fields from extraction results
 */
export function getFilledFields(result: ExtractionResult): ExtractedField[] {
    return result.fields.filter(f => {
        if (f.type === 'checkbox') return f.value === true;
        return f.value !== '';
    });
}

/**
 * Group extracted fields by section based on field label patterns
 */
export function groupFieldsBySection(fields: ExtractedField[]): Record<string, ExtractedField[]> {
    const sections: Record<string, ExtractedField[]> = {
        'Company Information': [],
        'Coverage Details': [],
        'Security Controls': [],
        'Data Handling & Compliance': [],
        'Development Practices': [],
        'Contracts & Liability': [],
        'Claims History': [],
        'Signatures & Dates': [],
        'Other': [],
    };

    for (const field of fields) {
        const label = field.label.toLowerCase();

        if (label.includes('named insured') || label.includes('applicant') || label.includes('dba') ||
            label.includes('address') || label.includes('city') || label.includes('state') ||
            label.includes('zip') || label.includes('website') || label.includes('corporation') ||
            label.includes('llc') || label.includes('partnership') || label.includes('entity') ||
            label.includes('incorporation') || label.includes('established') || label.includes('fein') ||
            label.includes('tax id') || label.includes('sic') || label.includes('naics') ||
            label.includes('contact') || label.includes('phone') || label.includes('email') ||
            label.includes('nature of business') || label.includes('employee') || label.includes('revenue') ||
            label.includes('broker')) {
            sections['Company Information'].push(field);
        } else if (label.includes('new policy') || label.includes('renewal') || label.includes('carrier') ||
            label.includes('policy number') || label.includes('coverage') || label.includes('limit') ||
            label.includes('deductible') || label.includes('e&o') || label.includes('cyber') ||
            label.includes('media') || label.includes('technology products')) {
            sections['Coverage Details'].push(field);
        } else if (label.includes('firewall') || label.includes('antivirus') || label.includes('encryption') ||
            label.includes('intrusion') || label.includes('access control') || label.includes('mfa') ||
            label.includes('endpoint') || label.includes('patch') || label.includes('vulnerability') ||
            label.includes('ngav') || label.includes('edr') || label.includes('backup') ||
            label.includes('penetration') || label.includes('security') || label.includes('incident response') ||
            label.includes('remote access') || label.includes('privileged') || label.includes('pam') ||
            label.includes('segregation') || label.includes('least privilege')) {
            sections['Security Controls'].push(field);
        } else if (label.includes('pii') || label.includes('phi') || label.includes('pci') ||
            label.includes('hipaa') || label.includes('soc') || label.includes('iso') ||
            label.includes('gdpr') || label.includes('data') || label.includes('retention') ||
            label.includes('ccpa')) {
            sections['Data Handling & Compliance'].push(field);
        } else if (label.includes('sdlc') || label.includes('code review') || label.includes('qa') ||
            label.includes('staging') || label.includes('automated testing') || label.includes('development tool') ||
            label.includes('saas') || label.includes('cloud') || label.includes('managed service') ||
            label.includes('client') || label.includes('subcontractor')) {
            sections['Development Practices'].push(field);
        } else if (label.includes('contract') || label.includes('limitation of liability') ||
            label.includes('hold harmless') || label.includes('indemnification') ||
            label.includes('written contracts')) {
            sections['Contracts & Liability'].push(field);
        } else if (label.includes('claim') || label.includes('circumstance') || label.includes('breach history') ||
            label.includes('litigation') || label.includes('cancelled') || label.includes('declined')) {
            sections['Claims History'].push(field);
        } else if (label.includes('signature') || 
            /\b(signature\s+date|effective\s+date|date\s+of|date\s+signed|expiration\s+date)\b/.test(label) ||
            (label.includes('date') && (label.includes('signature') || label.includes('effective') || label.includes('signed') || label.includes('expiration')))) {
            sections['Signatures & Dates'].push(field);
        } else {
            sections['Other'].push(field);
        }
    }

    // Remove empty sections
    const result: Record<string, ExtractedField[]> = {};
    for (const [key, value] of Object.entries(sections)) {
        if (value.length > 0) {
            result[key] = value;
        }
    }

    return result;
}
