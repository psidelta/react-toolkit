// given an array of files, assigns id to all of them based on
// uuid function provided
export default function assignFileUniqueIds(files, uuidFunction, config={}) {
  const key = config.key || 'id';

  files.forEach((file, index)=>{
    file[key] = uuidFunction(file, index, files, config);
  });

  return files;
}
