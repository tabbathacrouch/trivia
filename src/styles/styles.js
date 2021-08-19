import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: { padding: "2em" },
  score: { fontSize: "2em", display: "flex", justifyContent: "flex-end" },
  container: {
    display: "flex",
    justifyContent: "center",
    marginBlock: "5em",
  },
  questionNumber: { fontSize: "1.5em" },
  question: {
    fontSize: "1.25em",
    paddingLeft: theme.spacing(4),
  },
  answersContainer: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    width: "75vw",
  },
  answerChoice: {
    margin: theme.spacing(1),
    lineHeight: theme.spacing(0.5),
    justifyContent: "flex-start",
    background: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#fff9c4",
    },
    "&:disabled": { color: "black" },
  },
  response: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(-1.5),
    fontSize: "1.25em",
  },
  controls: {
    display: "flex",
    justifyContent: "flex-end",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
