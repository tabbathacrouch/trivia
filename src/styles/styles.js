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
    margin: theme.spacing(2, 0, 2),
  },
  card_container: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card_div: {
    margin: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    minWidth: "250px",
    minHeight: "150px",
    "&:hover": { transform: "scale3d(1.15, 1.15, 1)" },
    "&:nth-child(1)": { background: "#bbdefb" },
    "&:nth-child(2)": { background: "#e1bee7" },
    "&:nth-child(3)": { background: "#f8bbd0" },
    "&:nth-child(4)": { background: "#f5f5f5" },
    "&:nth-child(5)": { background: "#ffcdd2" },
    "&:nth-child(6)": { background: "#b2dfdb" },
    "&:nth-child(7)": { background: "#fff9c4" },
    "&:nth-child(8)": { background: "#c8e6c9" },
  },
  card: {
    paddingTop: theme.spacing(1),
  },
}));
