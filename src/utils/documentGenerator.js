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
          // Supporting Information Header
          new Paragraph({
            text: 'Supporting Information',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),
          
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

          // Overview/Table of Contents on separate page
          new Paragraph({
            text: 'Overview',
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
            spacing: { after: 400 },
          }),
          
          new Paragraph({
            text: 'This document contains the following sections:',
            spacing: { after: 300 },
          }),

          // Create a proper table for the overview
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
                        text: 'Section',
                        heading: HeadingLevel.HEADING_3,
                      })
                    ],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: 'Description',
                        heading: HeadingLevel.HEADING_3,
                      })
                    ],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: 'Page',
                        heading: HeadingLevel.HEADING_3,
                      })
                    ],
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              // Content rows for each section
              ...Array.from(selectedSections).map((section, index) => {
                const pageNumber = index + 3; // Starting from page 3 (after title and overview)
                // Extract just the letter part (e.g., "A" from "A. Molecules & Redox Couples")
                const sectionLetter = section.split('.')[0];
                return new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: sectionLetter,
                        })
                      ],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: section,
                        })
                      ],
                      width: { size: 70, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: `${pageNumber}`,
                          alignment: AlignmentType.CENTER,
                        })
                      ],
                      width: { size: 20, type: WidthType.PERCENTAGE },
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

          // Report Sections
          ...Array.from(selectedSections).map((section, sectionIndex) => [
            new Paragraph({
              text: section, // Just use the section name directly (e.g., "A. Molecules & Redox Couples")
              heading: HeadingLevel.HEADING_1,
              pageBreakBefore: true, // Each section starts on a new page
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
                  const isEssential = fieldObj.essential;
                  const value = formValues[section]?.[fieldName];
                  
                  let displayValue;
                  if (value && value.trim() !== '') {
                    displayValue = value;
                  } else if (isEssential) {
                    displayValue = 'Essential - Not Provided';
                  } else {
                    displayValue = 'Not specified';
                  }
                  
                  const isMissing = isEssential && (!value || value.trim() === '');
                  
                  return new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ 
                            text: `${fieldName}${isEssential ? ' *' : ''}`,
                            // Make essential fields bold if missing
                            bold: isMissing
                          })
                        ],
                        width: { size: 40, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({ 
                            text: displayValue,
                            // Highlight missing essential fields
                            color: isMissing ? 'FF6600' : undefined, // Orange color instead of red
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
