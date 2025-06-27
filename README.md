# Flow Battery Reporting Template

A modern, interactive web application for generating standardized flow battery study reports. Built with React and deployable to GitHub Pages.

## 🚀 Features

- **Interactive Template Selection**: Choose from 12+ predefined reporting sections
- **Dynamic Forms**: Forms appear based on your section selections
- **Progress Tracking**: Visual progress indicators for form completion
- **Word Document Export**: Generate professional `.docx` reports
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **GitHub Pages Ready**: Easy deployment configuration included

## 📋 Available Report Sections

- **A. Molecules & Redox Couples**: Active species, molecular structure, redox potentials
- **B. Electrolyte Formulation**: Posolyte, negolyte, supporting electrolytes
- **C. Physicochemical Properties**: Density, viscosity, conductivity, pH
- **D. Flow-Cell Design & Materials**: Cell geometry, membranes, electrodes
- **E. Operating Conditions**: Temperature, flow rates, current density
- **F. Characterization Methods**: Spectroscopy, electrochemical methods
- **G. State-of-Charge (SOC) Metrics**: Coulomb counting, spectroscopic methods
- **H. State-of-Health (SOH) Metrics**: Capacity retention, composition analysis
- **I. Electrolyte Degradation**: Side reactions, crossover, precipitation
- **J. Performance & Efficiencies**: Coulombic, voltage, energy efficiencies
- **K. Operation & Regeneration Strategies**: Rebalancing, reconditioning
- **L. Battery Management System (BMS)**: SOC tracking, safety systems

## 🛠️ Installation & Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### GitHub Pages Deployment
```bash
# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js              # Application header with hero section
│   ├── SectionSelector.js     # Checkbox grid for template sections
│   ├── FormSection.js         # Dynamic form components
│   └── DownloadSection.js     # Report generation and download
├── data/
│   └── sectionsTemplate.js    # Template definitions and field lists
├── utils/
│   └── documentGenerator.js   # Word document generation logic
├── App.js                     # Main application component
├── index.js                   # React app entry point
└── index.css                  # Tailwind CSS and custom styles
```

## 🎨 Technology Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS with custom design system
- **Document Generation**: docx library for Word export
- **File Handling**: FileSaver.js for download functionality
- **Deployment**: GitHub Pages with automated builds

## 🔧 Configuration

### Update GitHub Pages URL
1. Edit `package.json` and update the `homepage` field:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/reporting-template"
   ```

2. Update the footer link in `src/App.js`:
   ```javascript
   href="https://github.com/YOUR_USERNAME/reporting-template"
   ```

### Customize Template Sections
Edit `src/data/sectionsTemplate.js` to modify available sections and fields.

## 📖 Usage

1. **Select Sections**: Check the boxes for the report sections you need
2. **Fill Forms**: Complete the dynamically generated forms for each selected section
3. **Add Metadata**: Enter report title, author name, and study date
4. **Download**: Generate and download your Word document report

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Flow battery research community for standardization efforts
- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Contributors to the docx and FileSaver.js libraries

---

**Live Demo**: [View on GitHub Pages](https://YOUR_USERNAME.github.io/reporting-template)

**Repository**: [GitHub](https://github.com/YOUR_USERNAME/reporting-template)
A reporting template for flow battery publications with an GitHub Page online tool for easy compilation of .docx files to attach as supporting information to a publication.
