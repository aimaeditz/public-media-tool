import { WORKING_TOOLS } from '../src/lib/tools-data/index';
import { evaluateTool } from './test-engine';

async function main() {
  const batchSize = 50;
  const totalTools = WORKING_TOOLS.length;
  const totalBatches = Math.ceil(totalTools / batchSize);

  console.log(`Starting execution for all ${totalTools} tools in ${totalBatches} batches...\n`);

  let totalPassed = 0;
  let totalFailed = 0;

  for (let b = 0; b < totalBatches; b++) {
    const startIdx = b * batchSize;
    const endIdx = Math.min(startIdx + batchSize, totalTools);
    const batchTools = WORKING_TOOLS.slice(startIdx, endIdx);

    console.log(`========================================================================`);
    console.log(`BATCH ${b + 1} (Tools ${startIdx + 1}–${endIdx})`);
    console.log(`========================================================================`);

    for (let i = 0; i < batchTools.length; i++) {
      const toolIndex = startIdx + i + 1;
      const tool = batchTools[i];
      const result = evaluateTool(tool, toolIndex);

      if (result.status === 'Pass') totalPassed++;
      else totalFailed++;

      console.log(`[Tool ${toolIndex}] ${result.name} | Input: ${result.testInput} | ${result.status} | Output: ${result.outputSummary}`);
    }
    console.log(`--- End of Batch ${b + 1}: ${batchTools.length} tools verified ---\n`);
  }

  console.log(`========================================================================`);
  console.log(`FINAL COMPLETE SUMMARY:`);
  console.log(`Total Tools: ${totalTools}`);
  console.log(`Total Batches: ${totalBatches}`);
  console.log(`Total Passed: ${totalPassed}`);
  console.log(`Total Failed: ${totalFailed}`);
  console.log(`========================================================================`);
}

main().catch(console.error);
