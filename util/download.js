import JSZip from "jszip";
import { saveAs } from 'file-saver';

const cleanDate = date => date.split(".")[0].replaceAll(":", "-");

const cleanPeriods = str => str.replaceAll(".", "-");

const populateFilesForExercise = (zipRootFolder, exercise) => {
  const cleanDC = cleanDate(exercise.dateCollected);
  const cleanE = cleanPeriods(exercise.user.email);
  const cleanBI = cleanPeriods(exercise.bpmIn.toFixed(2));
  const cleanBO = cleanPeriods(exercise.bpmOut.toFixed(2));
  const folderName = `${cleanE}_${cleanDC}_in${cleanBI}_ex${cleanBO}`;
  const folder = zipRootFolder.folder(folderName);

  const userFileName = `user_${exercise.user.email}.txt`;
  const userContent = `
    Email:            ${exercise.user.email}
    Name:             ${exercise.user.givenName} ${exercise.user.surname}
    Smoking History:  ${exercise.user.smoking}
    Vaping History:   ${exercise.user.vaping}
    Weight:           ${exercise.user.weight}
    Sex:              ${exercise.user.sex}
    Gender:           ${exercise.user.gender}
    Race:             ${exercise.user.race}
    Date of Birth:    ${exercise.user.dob}
  `;
  folder.file(userFileName, userContent);

  const dataFileName = `RR_${folderName}.txt`;
  const dataContent = exercise.data.join(",");
  folder.file(dataFileName, dataContent);

  return zipRootFolder;
}

const zipDownload = (data) => {
  if (!data.exercise && (!data.exercises || data.exercises.length < 1)) return;

  const zip = new JSZip();
  const rootFolderName = `heartbit_data_download_${cleanDate((new Date).toISOString())}`;
  const rootFolder = zip.folder(rootFolderName);
  if (data.exercise) {
    populateFilesForExercise(rootFolder, data.exercise);
  } else if (data.exercises) {
    data.exercises.forEach(exercise => populateFilesForExercise(rootFolder, exercise));
  }

  zip.generateAsync({type:"blob"})
  .then(function(content) {
    saveAs(content, `${rootFolderName}.zip`);
  });
}
 
export default zipDownload;
