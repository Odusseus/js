$version = Get-Content .\version.txt
[int]$versionNr = [convert]::ToInt32($version, 10)
$versionNr++
Write-Output $versionNr
$versionNr > .\version.txt
$variable = "const VERSION = " + $versionNr +";"
$variable > ..\\version.js
