import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: { padding: "2em" },
  score: { fontSize: "2em", display: "flex", justifyContent: "flex-end" },
  container: {
    display: "flex",
    justifyContent: "center",
    marginBlock: "5em",
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
    padding: theme.spacing(0),
    margin: theme.spacing(1),
    lineHeight: theme.spacing(0.5),
    justifyContent: "flex-start",
    background: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#fff9c4",
    },
    "&:disabled": { color: "black" },
  },

  controls: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
