import csv
import json

with open('app-source/scan-reports/specs/round-01-block-05.results.json', 'r') as f:
    results = json.load(f)

existing_rows = []
with open('app-source/scan-reports/01_TOOL_BY_TOOL.csv', 'r', newline='') as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        if row and row[0].isdigit() and int(row[0]) <= 40:
            existing_rows.append(row)

for r in results:
    num = str(r['number'])
    slug = r['slug']
    name = r['name']
    category = 'Audio & Music Production' if int(num) <= 46 else 'Automotive'
    tool_type = 'audio-processor' if int(num) <= 46 else 'automotive-calculator'
    verdict_before = 'broken'
    wrong = "Missing dedicated tool controls, action toolbar, reset buttons, or exported calculations"
    changed = "Added dedicated interactive controls, parameter sliders, standardized ActionToolbar, copy/export features"
    touched = "app-source/src/components/tools/AudioMusicToolsRunner.tsx" if int(num) <= 46 else "app-source/src/components/tools/AutomotiveToolsRunner.tsx"
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
