import JSZip from "jszip";
import { saveAs } from 'file-saver';

const cleanDate = date => date.split(".")[0].replaceAll(":", "-");

const populateFilesForExercise = (zipRootFolder, exercise) => {
  const dc = cleanDate(exercise.dateCollected);
  const folderName = `${exercise.user.email}_inhale_${exercise.bpmIn}_exhale_${exercise.bpmOut}_collected_${dc}`;
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

  const dataFileName = `rr_intervals_${folderName}.txt`;
  const dataContent = exercise.data.join(",");
  folder.file(dataFileName, dataContent);

  return zipRootFolder;
}

const zipDownload = (data) => {
  if (!data.exercise && (!data.exercises || data.exercises.length < 1)) return;

  const zip = new JSZip();
  const rootFolderName = `heartbit_exercise_download_${cleanDate((new Date).toISOString())}`;
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

// const fileName = `exercise_${data.exercise.user.givenName}_${data.exercise.user.surname}_${data.exercise.id}.json`;
// const json = JSON.stringify(data);
// const blob = new Blob([json],{type:'application/json'});
// const href = URL.createObjectURL(blob);
// const link = document.createElement('a');
// link.href = href;
// link.download = fileName;
// document.body.appendChild(link);
// link.click();
// document.body.removeChild(link);