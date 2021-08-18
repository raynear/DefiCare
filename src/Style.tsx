import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DiaMain from "./dia_main.jpg";
import Img4 from "./dia4.jpg";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootcontainer: {
      spacing: theme.spacing(0),
      margin: theme.spacing(0),
      padding: theme.spacing(1),
      maxWidth: "100%",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      textAlign: "center"
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto"
    },
    appBar: {
      background: "transparent",
      boxShadow: "none"
    },
    appBarColored: {
      background: "#dddddd"
    },
    list: {
      width: 250,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    fullList: {
      width: 'auto',
    },
    tablehead: {
      backgroundColor: "#aaaaaa",
      color: "#FFFFFF",
      fontWeight: "bold"
    },
    pagination: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    },
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    listImg: {
      margin: theme.spacing(1),
      borderRadius: "10px",
      backgroundImage: `url(${Img4})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "calc(100%-16px)",
      height: "100px",
      display: "flex",
      alignItems: "center"
    },
    listText: {
      color: "#FFFFFF",
      textShadow: "2px 2px 1px #000000"
    },
    container: {
      width: "100%",
      spacing: theme.spacing(0),
      margin: theme.spacing(0),
      padding: theme.spacing(0),
      display: "flex",
      flexWrap: "wrap",
      textAlign: "center"

    },
    gridContents: {
      margin: theme.spacing(0),
      padding: theme.spacing(1),
      textAlign: "center",
      verticalAlign: "middle"
    },
    grid: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
      textAlign: "center",
      verticalAlign: "middle"
    },
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    img: {
      width: "100%"
    },
    title: {
      flexGrow: 1
    },
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      justifyContent: 'space-between',
      overflowX: 'auto',
      textAlign: 'center',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    mainCopy: {
      color: "#ffffff",
      textShadow: "-1px -1px 0 #888, 1px -1px 0 #888,-1px 1px 0 #888, 1px 1px 0 #888"
    },
    mainImg: {
      backgroundImage: `url(${DiaMain})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "500px",
      textAlign: "center",
      verticalAlign: "middle",
      alignItems: "center"
    },
    parallax: {
      height: "90vh",
      maxHeight: "1000px",
      overflow: "hidden",
      position: "relative",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      margin: "0",
      padding: "0",
      border: "0",
      display: "flex",
      alignItems: "center"
    },
    small: {
      height: "380px"
    }
  })
);

export default useStyles;
