# Pattern Groups Audit

This document catalogues tool groups that share handler/UI/output patterns across the 1516 tools, identifying the shared code location, deficiencies, and resolutions.

## Group 1: Builtin Single Tools (ToolRunner.tsx)
- **Count**: 20 tools
- **Location**: `app-source/src/components/tools/ToolRunner.tsx`
- **Scope**: Core single-purpose tools (word counter, case converter, qr generator, json formatter, etc.)

## Group 2: Text Formatting & Analysis Batch (Batch1TextToolsRunner.tsx)
- **Count**: 121 tools
- **Location**: `app-source/src/components/tools/Batch1TextToolsRunner.tsx`
- **Scope**: Text manipulation, capitalization, analysis, regex, unicode, encodings.

## Group 3: Calculators & Converters (ComprehensiveCalculatorToolsRunner.tsx)
- **Count**: 195 tools
- **Location**: `app-source/src/components/tools/ComprehensiveCalculatorToolsRunner.tsx`
- **Scope**: Everyday, math, financial, measurement and scientific converters.

## Group 4: Math & Finance Tools (ComprehensiveMathFinanceToolsRunner.tsx)
- **Count**: 349 tools
- **Location**: `app-source/src/components/tools/ComprehensiveMathFinanceToolsRunner.tsx`
- **Scope**: Math equations, business ROI, productivity timers, date-time, fitness metrics, unit conversions.

## Group 5: Media, SEO & Web Utilities (ComprehensiveMediaWebToolsRunner.tsx)
- **Count**: 210 tools
- **Location**: `app-source/src/components/tools/ComprehensiveMediaWebToolsRunner.tsx`
- **Scope**: Audio tools, video calculation, SERP, sitemaps, UTM tags, metadata generators.

## Group 6: Industry & Domain Tools (ComprehensiveIndustryToolsRunner.tsx)
- **Count**: 169 tools
- **Location**: `app-source/src/components/tools/ComprehensiveIndustryToolsRunner.tsx`
- **Scope**: Real estate, accounting, HR, engineering, construction, solar, food service, lifestyle.

## Group 7: Developer & Schema Tools (ComprehensiveDevToolsRunner.tsx)
- **Count**: 110 tools
- **Location**: `app-source/src/components/tools/ComprehensiveDevToolsRunner.tsx`
- **Scope**: Code formatters, schema generators, API testers, SQL/JSON parsers.

## Group 8: Image Utilities (ComprehensiveImageToolsRunner.tsx)
- **Count**: 108 tools
- **Location**: `app-source/src/components/tools/ComprehensiveImageToolsRunner.tsx`
- **Scope**: Image filters, canvas transformations, compressors, aspect ratio resizers.

## Group 9: PDF Operations (ComprehensivePdfToolsRunner.tsx)
- **Count**: 82 tools
- **Location**: `app-source/src/components/tools/ComprehensivePdfToolsRunner.tsx`
- **Scope**: PDF analysis, text extraction, page splitting, merging, client-side PDF document manipulations.

## Group 10: Color & Palette Tools (ComprehensiveColorToolsRunner.tsx)
- **Count**: 82 tools
- **Location**: `app-source/src/components/tools/ComprehensiveColorToolsRunner.tsx`
- **Scope**: Color space conversions, gradient builders, contrast checkers, harmony palettes.

## Group 11: Security & Cryptography (ComprehensiveSecurityToolsRunner.tsx)
- **Count**: 70 tools
- **Location**: `app-source/src/components/tools/ComprehensiveSecurityToolsRunner.tsx`
- **Scope**: Password generation, hashing algorithms, encryption primitives, strength analyzers.
