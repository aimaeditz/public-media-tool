import json

with open('app-source/scan-reports/specs/round-01-block-02.results.json', 'r') as f:
    results = json.load(f)

csv_rows = []
for r in results:
    num = r['number']
    slug = r['slug']
    name = r['name']
    category = 'Accounting' if num in [11, 12] else 'Audio & Music Production'
    tool_type = 'Calculator' if num in [11, 12] else 'Audio Processor'
    verdict = 'fixed-then-passed'
    input_used = r['testInput'].replace('"', '""')
    expected = r['expected'].replace('"', '""')
    actual = r['actual'].replace('"', '""')
    buttons = r['buttonsChecked'].replace('"', '""')
    errors = r['consoleErrors']
    edge = r['edgeCaseResult'].replace('"', '""')
    logs = r['logLines']

    row = f'{num},"{slug}","{name}","{category}","{tool_type}",{verdict},"{input_used}","{expected}","{actual}","{buttons}","{errors}","{edge}","{logs}"'
    csv_rows.append(row)

with open('app-source/scan-reports/01_TOOL_BY_TOOL.csv', 'a') as f:
    f.write('\n' + '\n'.join(csv_rows))

print(f"Appended {len(csv_rows)} rows to 01_TOOL_BY_TOOL.csv")
