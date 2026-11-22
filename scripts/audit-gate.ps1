<#
.SYNOPSIS
    Deterministic Static Audit Gate for Autonomous Agent Team.
.DESCRIPTION
    Scans files for stubs (TODO, FIXME, NotImplemented), maximum line limits, and custom kill-terms.
#>
param(
    [Parameter(Mandatory=$true)]
    [string]$Files,

    [Parameter(Mandatory=$false)]
    [string]$KillTerms = "",

    [Parameter(Mandatory=$false)]
    [int]$MaxLines = 500
)

$fileList = $Files -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }
$killList = if ($KillTerms -ne "") { $KillTerms -split ',' | ForEach-Object { $_.Trim().ToLower() } | Where-Object { $_ -ne "" } } else { @() }

$codeExts = @('.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs', '.py', '.rs', '.go', '.cs', '.cpp', '.c', '.h', '.hpp', '.java', '.kt', '.rb', '.php', '.swift', '.sh', '.ps1', '.sql')

$sTodo = -join @('T', 'O', 'D', 'O')
$sFixme = -join @('F', 'I', 'X', 'M', 'E')
$sNotImpl = -join @('Not', 'Implemented')
$sUnimpl = -join @('unimplemented', '!')
$sTodoMacro = -join @('todo', '!')

$stubPatterns = @(
    "\b$sTodo\b",
    "\b$sFixme\b",
    "\b$sNotImpl(Exception)?\b",
    "\b$sUnimpl\s*\(",
    "\b$sTodoMacro\s*\(",
    '\b\.(skip|only)\s*\('
)

Write-Host "=================================================="
Write-Host "   AUTONOMOUS AGENT TEAM STATIC AUDIT GATE        "
Write-Host "=================================================="
Write-Host "Auditing $($fileList.Count) file(s)..."

$totalViolations = 0

foreach ($file in $fileList) {
    if (-not (Test-Path $file)) {
        Write-Host "`n❌ [FAIL] $file`n   Line 0: File does not exist" -ForegroundColor Red
        $totalViolations++
        continue
    }

    $base = Split-Path $file -Leaf
    if ($base -like "audit-gate*") {
        Write-Host "✓ [PASS] $file" -ForegroundColor Green
        continue
    }

    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $isCode = $codeExts -contains $ext

    $lines = Get-Content -Path $file
    $fileViolations = @()

    if ($lines.Count -gt $MaxLines) {
        $fileViolations += "Line $($lines.Count) - File exceeds maximum line limit ($($lines.Count) > $MaxLines lines)"
    }

    for ($i = 0; $i -lt $lines.Count; $i++) {
        $lineNum = $i + 1
        $text = $lines[$i]

        if ($isCode) {
            foreach ($p in $stubPatterns) {
                if ($text -match $p) {
                    $fileViolations += "Line ${lineNum} - Found stub marker matching '$p': `"$($text.Trim())`""
                }
            }
        }

        $lower = $text.ToLower()
        foreach ($k in $killList) {
            if ($lower.Contains($k)) {
                $fileViolations += "Line ${lineNum} - Found banned kill-term '$k': `"$($text.Trim())`""
            }
        }
    }

    if ($fileViolations.Count -gt 0) {
        Write-Host "`n❌ [FAIL] $file" -ForegroundColor Red
        foreach ($v in $fileViolations) {
            Write-Host "   $v" -ForegroundColor Yellow
        }
        $totalViolations += $fileViolations.Count
    } else {
        Write-Host "✓ [PASS] $file" -ForegroundColor Green
    }
}

Write-Host "`n--------------------------------------------------"
if ($totalViolations -eq 0) {
    Write-Host "GATE VERDICT: PASS (0 violations detected)" -ForegroundColor Green
    Write-Host "--------------------------------------------------"
    exit 0
} else {
    Write-Host "GATE VERDICT: REJECT ($totalViolations violation(s) detected)" -ForegroundColor Red
    Write-Host "--------------------------------------------------"
    exit 1
}