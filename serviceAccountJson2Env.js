const fs = require('fs/promises');

(async () => {
  const path = process.argv[2];

  if (path) {
    const fileContents = await fs.readFile(path, { encoding: 'utf-8' });
    const transformed = JSON.stringify(JSON.parse(fileContents));
    await fs.appendFile(
      './.env',
      '\nGOOGLE_SERVICE_ACCOUNT_JSON=' + transformed,
      {
        encoding: 'utf-8',
      }
    );
    console.log('✅ done !');
  } else {
    console.log(
      'Missing json path\nusage : node serviceAccountJson2Env myServiceAccountFile.json'
    );
  }
})();
