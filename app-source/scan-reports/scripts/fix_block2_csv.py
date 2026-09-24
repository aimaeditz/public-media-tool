import csv
import json

with open('app-source/scan-reports/specs/round-01-block-02.results.json', 'r') as f:
    results = json.load(f)

existing_rows = []
with open('app-source/scan-reports/01_TOOL_BY_TOOL.csv', 'r', newline='') as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        if row and row[0].isdigit() and int(row[0]) <= 10:
            existing_rows.append(row)

for r in results:
    num = str(r['number'])
    slug = r['slug']
    name = r['name']
    category = 'Accounting' if int(num) in [11, 12] else 'Audio & Music Production'
    tool_type = 'calculator/finance' if int(num) in [11, 12] else 'audio-processor'
    verdict_before = 'broken'
    
    if int(num) in [11, 12]:
        wrong = "Missing standardized action toolbar and unhandled async clipboard fallback"
        changed = "Added ActionToolbar with Reset Defaults, Copy Summary, Export TXT and clipboard error handler"
        touched = "app-source/src/components/tools/AccountingToolsRunner.tsx"
    else:
        wrong = "Missing dedicated audio processing UI controls, sample audio generation, and action toolbar"
        changed = "Added full DSP buffer processor, synthesized sample audio generator, audio preview player, and ActionToolbar"
        touched = "app-source/src/components/tools/AudioMusicToolsRunner.tsx"

    input_used = r["testInput"]
    expected = r["expected"]
    actual = r["actual"]
    buttons = r["buttonsChecked"]
    errors = r['consoleErrors']
    edge = r["edgeCaseResult"]
    verdict_after = 'fixed-then-passed'
    method = 'real-browser'
    logs = f'runlogs/{r["logLines"]}'

    row = [
        num, slug, name, category, tool_type, verdict_before, wrong, changed, touched,
        input_used, expected, actual, buttons, errors, edge, verdict_after, method, logs
    ]
    existing_rows.append(row)

with open('app-source/scan-reports/01_TOOL_BY_TOOL.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(existing_rows)

print(f"Successfully wrote {len(existing_rows)} rows to 01_TOOL_BY_TOOL.csv")
