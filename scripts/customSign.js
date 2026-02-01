/* eslint-disable  @typescript-eslint/no-require-imports */
const ossign = require('@ossign/ossign');

const signedFilePaths = new Set();

/**
 * Example paths that should be signed, as seen in CI logs:
 * - NSIS Installer: `D:\a\launcher\launcher\dist\Invoke Community Edition Setup 1.7.0-alpha.10.exe`
 * - NSIS Uninstaller: `D:\a\launcher\launcher\dist\__uninstaller-nsis-invoke-community-edition.exe`
 * - Main Launcher Executable: `D:\a\launcher\launcher\dist\win-unpacked\Invoke Community Edition.exe`
 */
const INVOKE_EXE_REGEX = /[iI]nvoke[\s-][cC]ommunity[\s-][eE]dition.*\.exe$/;

/**
 * Custom signing script for DigiCert KeyLocker integration with electron-builder
 * This script handles the DigiCert signing process for Windows builds
 *
 * @param {import('app-builder-lib').CustomWindowsSignTaskConfiguration} configuration
 * @returns {Promise<void>}
 */
function sign(configuration) {
  const { path: filePath } = configuration;

  if (signedFilePaths.has(filePath)) {
    console.log(`Skipping already signed binary: ${filePath}`);
    return;
  }

  // electron-builder will attempt to sign _all_ executables, including things like win-pty.exe.
  // We only want to sign the NSIS installer, uninstaller, and main executable.
  if (!INVOKE_EXE_REGEX.test(filePath)) {
    console.log(`Skipping signing for binary: ${filePath}`);
    return;
  }

  console.log(`Starting signing for: ${filePath}`);

  try {

    ossign.SignSync(filePath, filePath, 'pecoff');


    console.log('Signing successful. Verifying signature...');

    signedFilePaths.add(filePath);
  } catch (error) {
    console.error('Signing process failed:', error.message);
    throw error;
  }
}

module.exports = { sign };
