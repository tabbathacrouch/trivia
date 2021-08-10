import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginBlock: "5em",
  },
  root: {
    width: 650,
  },
  questionNumber: { fontSize: "1.5em", paddingBottom: theme.spacing(2) },
  question: {
    fontSize: "1.25em",
  },
  answersContainer: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  answerChoice: {
    marginTop: theme.spacing(2),
    alignContent: "center",
    justifyContent: "flex-start",
    background: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#fff9c4",
    },
  },
  controls: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
