param(
    [string]$pptxPath,
    [string]$pdfPath
)

# Create a new PowerPoint application
$powerPoint = New-Object -ComObject PowerPoint.Application
$presentation = $powerPoint.Presentations.Open($pptxPath, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)

# Save the presentation as PDF
$presentation.SaveAs($pdfPath, [Microsoft.Office.Interop.PowerPoint.PpSaveAsFileType]::ppSaveAsPDF)

# Close the presentation and PowerPoint application
$presentation.Close()
$powerPoint.Quit()
