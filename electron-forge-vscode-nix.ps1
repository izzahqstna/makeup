#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
$ret=0
if (Test-Path "$basedir/bash$exe") {
  # Support pipeline input
  if ($MyInvocation.ExpectingInput) {
    $input | & "$basedir/bash$exe"  "$basedir/../@electron-forge/cli/script/vscode.sh" $args
  } else {
    & "$basedir/bash$exe"  "$basedir/../@electron-forge/cli/script/vscode.sh" $args
  }
  $ret=$LASTEXITCODE
} else {
  # Support pipeline input
  if ($MyInvocation.ExpectingInput) {
    $input | & "bash$exe"  "$basedir/../@electron-forge/cli/script/vscode.sh" $args
  } else {
    & "bash$exe"  "$basedir/../@electron-forge/cli/script/vscode.sh" $args
  }
  $ret=$LASTEXITCODE
}
exit $ret
