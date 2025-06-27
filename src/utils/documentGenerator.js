import { Document, Packer, Paragraph, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { sectionsTemplate } from '../data/sectionsTemplate';

export const generateWordDocument = async (reportData) => {
  const { title, author, date, selectedSections, formValues } = reportData;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title Page
          new Paragraph({
            text: title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: '',
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: `Author: ${author}`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Date: ${new Date(date).toLocaleDateString()}`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 800 },
          }),

          // Table of Contents (simplified)
          new Paragraph({
            text: 'Contents',
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
          }),
          ...Array.from(selectedSections).map((section, index) => 
            new Paragraph({
              text: `${index + 1}. ${section}`,
              spacing: { after: 100 },
            })
          ),

          // Report Sections
          ...Array.from(selectedSections).map((section, sectionIndex) => [
            new Paragraph({
              text: `${sectionIndex + 1}. ${section}`,
              heading: HeadingLevel.HEADING_1,
              pageBreakBefore: sectionIndex > 0,
              spacing: { after: 400 },
            }),

            // Create a table for each section
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              rows: [
                // Header row
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Property',
                          heading: HeadingLevel.HEADING_3,
                        })
                      ],
                      width: { size: 40, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Value / Notes',
                          heading: HeadingLevel.HEADING_3,
                        })
                      ],
                      width: { size: 60, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                // Data rows - now use sectionsTemplate structure
                ...sectionsTemplate[section].map(fieldObj => {
                  const fieldName = fieldObj.name;
                  const isRequired = fieldObj.required;
                  const value = formValues[section]?.[fieldName];
                  
                  let displayValue;
                  if (value && value.trim() !== '') {
                    displayValue = value;
                  } else if (isRequired) {
                    displayValue = 'Required - Not Provided';
                  } else {
                    displayValue = 'Not specified';
                  }
                  
                  const isMissing = isRequired && (!value || value.trim() === '');
                  
                  return new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ 
                            text: `${fieldName}${isRequired ? ' *' : ''}`,
                            // Make required fields bold if missing
                            bold: isMissing
                          })
                        ],
                        width: { size: 40, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ 
                            text: displayValue,
                            // Highlight missing required fields
                            color: isMissing ? 'FF0000' : undefined,
                            italics: isMissing,
                            spacing: { after: 100 }
                          })
                        ],
                        width: { size: 60, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  });
                }),
              ],
            }),

            new Paragraph({
              text: '',
              spacing: { after: 400 },
            }),
          ]).flat(),

          // Footer
          new Paragraph({
            text: 'Report generated by Flow Battery Reporting Template',
            alignment: AlignmentType.CENTER,
            spacing: { before: 800, after: 200 },
          }),
          new Paragraph({
            text: 'https://github.com/rfb-data-hub/reporting-template',
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  try {
    const blob = await Packer.toBlob(doc);
    const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.docx`;
    saveAs(blob, fileName);
    return true;
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Failed to generate Word document');
  }
};
