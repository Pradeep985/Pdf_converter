
# PDF Converter

This is a web application that allows users to upload various file types (Word, PowerPoint, Excel, images) and convert them into PDF format. It also includes features to merge and split PDFs. The application consists of both frontend (React) and backend (Node.js with Express) components, handling the file conversion process and providing an intuitive user interface.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Pradeep985/Pdf_converter.git
cd pdf-converter
```

### 2. Install Dependencies

For the frontend:

```bash
cd client
npm install
```

For the backend:

```bash
cd backend
npm install
```

### 3. Start the Backend Server

Navigate to the `backend` folder and run:

```bash
node index.js
```

This will start the backend API, which listens on `http://localhost:5000`.

### 4. Start the Frontend Server

Navigate to the `client` folder and run:

```bash
npm start
```

This will start the React application on `http://localhost:3000`.

### 5. Open the App in Your Browser

Once both servers are running, open `http://localhost:3000` in your web browser to interact with the PDF Converter.

## Usage
1. **Choose the conversion option** you need:
   Select one of the following options based on the file type you're working with:
    - **Merge PDFs**
    - **Split PDF**
    - **Word to PDF**
    - **Excel to PDF**
    - **Image to PDF**
    - **PPT to PDF**

2. **Select a file** from your computer or drag and drop the file into the designated area. The supported file types for each option are:
   - **Word (.doc, .docx)**
   - **PowerPoint (.ppt, .pptx)**
   - **Excel (.xls, .xlsx)**
   - **Images (.jpg, .png, .jpeg, .gif)**
   - **PDF files** (for merging and splitting)
   
3. **Click on the Covert Button**:
   - **Convert to PDF**: Converts the selected file (Word, PowerPoint, Excel, Image) to a PDF file.
   - **Merge PDFs**: Upload multiple PDF files to merge into a single PDF.
   - **Split PDFs**: Upload a PDF and specify the page ranges to split it into separate PDF files.
   
3. **Download the Converted File:**:After the conversion process completes, the PDF will be automatically downloaded to your device.

**Features:**
- **Merge PDFs**: This feature allows you to upload multiple PDF files and combine them into one PDF. Useful when you need to consolidate documents.
- **Split PDFs**: This feature enables you to upload a PDF file and specify the page range to split it into separate PDFs. For example, you can split a document into individual pages or specific sections.

## Project Structure

```
/client                  # Frontend React application
  /src
    /components           # React components (FileUploader, etc.)
    App.js                # Main React component
    index.js              # React entry point

/backend                  # Backend API (Node.js + Express)
  /controllers            # Controller for handling conversion logic
  /routes                 # API routes for file conversion
  index.js               # Express server entry point
  /scripts               # scripts services (Word to PDF, PPT to PDF, Merge, Split)
  /uploads                # Directory for storing uploaded files temporarily
```



## Testing

Make sure to test each of the file conversion, merging, and splitting functions thoroughly. Ensure that all the supported file types (Word, PowerPoint, Excel, Image, PDF) work as expected and that the UI handles errors properly.

## Contributing

We welcome contributions to improve this project! If you find a bug or want to add a new feature, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.


## Contact

If you have any questions, feel free to reach out via GitHub Issues.
