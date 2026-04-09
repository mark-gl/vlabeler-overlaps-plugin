# vLabeler fixed/cutoff overlap checker

This repository contains a macro plugin for [vLabeler](https://github.com/sdercolin/vlabeler) that identifies and highlights UTAU `oto.ini` entries where the _Fixed_ consonant boundary overlaps with the _Cutoff_.

These entries can cause errors when used with [OpenUTAU](https://github.com/stakira/openutau), so this plugin makes it easier to identify issues compared to manually reviewing entries.

## Installation

1. Clone this repository or [download it as a .zip](https://github.com/mark-gl/vlabeler-overlaps-plugin/archive/refs/heads/main.zip) and extract.
2. Copy the `check-for-fixed-cutoff-overlaps` folder to your `vLabeler/plugins/macro` folder (on Windows, this will be `C:/Users/<username>/vLabeler/plugins/macro`).

## Usage

To run the plugin, click **Tools** -> **Batch Edit** in the vLabeler menu bar and click **Check for fixed/cutoff overlaps**. You can also choose to add tags to erroneous entries.

After clicking **Execute**, a dialog will appear that lists entries containing overlaps.

## Notes

This plugin has been tested with **vLabeler 1.5.0**.
