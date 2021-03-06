Write-Output "Set-ExecutionPolicy RemoteSigned"

$version = Get-Content .\version.txt
[int]$versionNr = [convert]::ToInt32($version, 10)
$versionNr++
Write-Output $versionNr

Set-Content -Path .\version.txt -Encoding UTF8 -Value $versionNr.ToString()

$variable = "var VERSION = " + $versionNr +";"
Set-Content -Path ..\\version.js -Encoding UTF8 -Value $variable

