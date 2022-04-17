import { useLazyQuery } from "@apollo/client";
import { Button, Container, Table } from "react-bootstrap";
import { BsDownload } from "react-icons/bs"
import zipDownload from "../util/download";
import ONE_EXERCISE_DOWNLOAD from "../external/queries/oneExerciseDownload";

const ExercisesTable = ({ geLoading, geData }) => {
  const [downloadOneExercise] = useLazyQuery(ONE_EXERCISE_DOWNLOAD, {
    fetchPolicy: "no-cache", // Performance hit, but solves lack of overwrite on new fetch
    skip: !geData,
    onCompleted: data => zipDownload(data)
  });

  if (geData?.exercises?.length > 0) {
    return ( 
      <div className="et-container">
        <Table striped className="et">
          <thead className="et-head">
            <tr>
              <th className="et-head-date-collected">Collected</th>
              <th className="et-head-email">Email</th>
              <th className="et-head-dob">Date of Birth</th> 
              <th className="et-head-sex">Sex</th>
              <th className="et-head-gender">Gender</th>
              <th className="et-head-race">Race</th>
              <th className="et-head-weight">Weight</th>
              <th className="et-head-tobacco">Tobacco</th>
              <th className="et-head-vape">Vape</th>
              <th className="et-head-bpm-in">Inhale</th>
              <th className="et-head-bpm-out">Exhale</th>
              <th className="et-head-raw-hrv">Raw HRV</th>
              <th className="et-head-clean-hrv">Clean HRV</th>
              <th className="et-head-bpm">Average HR</th>
              <th className="et-head-data">Data</th>
            </tr>
          </thead>
          <tbody className="et-body">
            {geData?.exercises?.map(exercise => (
              <tr key={exercise.id} value={exercise.id}>
                <td className="et-body-date-collected">
                  {exercise.dateCollected.replace("T", ", ").slice(0, -8)}
                </td>
                <td className="et-body-email">{exercise.user.email}</td>
                <td className="et-body-dob">{exercise.user.dob.split("T")[0]}</td>
                <td className="et-body-sex">{exercise.user.sex}</td>
                <td className="et-body-gender">{exercise.user.gender.replace(/_/g, " ").replace("GENDER ", "")}</td>
                <td className="et-body-race">{exercise.user.race.replace(/_/g, " ")}</td>
                <td className="et-body-weight">{exercise.user.weight}lbs</td>
                <td className="et-body-tobacco">{exercise.user.smoking}</td>
                <td className="et-body-vape">{exercise.user.vaping}</td>
                <td className="et-body-bpm-in">{exercise.bpmIn.toFixed(2)}bpm</td>
                <td className="et-body-bpm-out">{exercise.bpmOut.toFixed(2)}bpm</td>
                <td className="et-body-raw-hrv">{exercise.hrv ? exercise.hrv.toFixed(2) + "ms" : "---"}</td>
                <td className="et-body-clean-hrv">{exercise.cleanHrv ? exercise.cleanHrv.toFixed(2) + "ms" : "---"}</td>
                <td className="et-body-bpm">{exercise.bpm ? exercise.bpm.toFixed(2) + "bpm" : "---"}</td>
                <td className="et-body-data">
                  <Button variant="primary" onClick={() => {
                    const eId = exercise.id;
                    downloadOneExercise({variables: {id: eId}})
                  }}>
                    <BsDownload />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  } else {
    if (geLoading) {
      return ( 
        <div className="et-message-container">
          <div className="et-message">Loading...</div>
        </div>
      );
    } else {
      return (
        <div className="et-message-container">
          <div className="et-message">No Query Results to Display</div>
        </div>
      );
    }
  }
}
 
export default ExercisesTable;