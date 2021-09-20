import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  score: { fontSize: "2em", display: "flex", justifyContent: "flex-end" },
  container: {
    display: "flex",
    justifyContent: "center",
    marginBlock: "5vw",
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  card_container: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card_div: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    border: "none",
    boxShadow: "0 3px 6px 0 rgba(0,0,0,0.4)",
    transition: "0.3s",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "25vw",
    "&:hover": {
      transform: "scale3d(1.15, 1.15, 1)",
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },
    "&:nth-child(1)": {
      background:
        "linear-gradient(0deg, rgba(23,103,170,1) 0%, rgba(187,222,251,1) 100%)",
    },
    "&:nth-child(2)": {
      background:
        "linear-gradient(0deg, rgba(203,78,224,1) 0%, rgba(225,190,231,1) 100%)",
    },
    "&:nth-child(3)": {
      background:
        "linear-gradient(0deg, rgba(255,41,115,1) 0%, rgba(248,187,208,1) 100%)",
    },
    "&:nth-child(4)": {
      background:
        "linear-gradient(0deg, rgba(115,115,115,1) 0%, rgba(245,245,245,1) 100%)",
    },
    "&:nth-child(5)": {
      background:
        "linear-gradient(0deg, rgba(29,105,98,1) 0%, rgba(178,223,219,1) 100%)",
    },
    "&:nth-child(6)": {
      background:
        "linear-gradient(0deg, rgba(182,26,41,1) 0%, rgba(255,205,210,1) 100%)",
    },
    "&:nth-child(7)": {
      background:
        "linear-gradient(0deg, rgba(217,196,14,1) 0%, rgba(255,249,196,1) 100%)",
    },
    "&:nth-child(8)": {
      background:
        "linear-gradient(0deg, rgba(26,168,30,1) 0%, rgba(200,230,201,1) 100%)",
    },
  },
  card: {
    paddingTop: theme.spacing(1),
    fontWeight: "650",
    fontSize: "1.25rem",
  },
  card_score: {
    fontWeight: "650",
    fontSize: "1.25rem",
    display: "flex",
    justifyContent: "flex-end",
  },
}));
