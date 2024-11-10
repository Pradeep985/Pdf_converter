param(
    [string]$xlsxPath,
    [string]$pdfPath
)

# Create a new Excel application
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false

# Open the workbook
$workbook = $excel.Workbooks.Open($xlsxPath)

# Save as PDF
$workbook.ExportAsFixedFormat([Microsoft.Office.Interop.Excel.XlFixedFormatType]::xlTypePDF, $pdfPath)

# Close the workbook and Excel application
$workbook.Close($false)
$excel.Quit()
