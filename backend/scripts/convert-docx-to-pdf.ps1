# PowerShell script: convert-docx-to-pdf.ps1

param (
    [string]$docxPath,
    [string]$pdfPath
)

# Create a new Word Application COM object
$wordApp = New-Object -ComObject Word.Application
$wordApp.Visible = $false  # Set to false to run in the background

# Open the Word document
$doc = $wordApp.Documents.Open($docxPath)

# Save the document as a PDF (17 is the PDF format)
$doc.SaveAs([ref] $pdfPath, [ref] 17)

# Close the document and quit the Word application
$doc.Close()
$wordApp.Quit()
