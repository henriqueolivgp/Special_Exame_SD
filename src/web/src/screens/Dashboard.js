import '../styles/Dashboard.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";
import Menu from "../Layout/Menu";
import Content from "../Layout/Content";
import Sections from "../Layout/Sections";

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
  },
});

export const Dashboard = () => {
  
  const [selectedTab, setSelectedTab] = useState(Sections[0].id);
  
  return (
    <>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="App">
                <Menu selectedTab={selectedTab} changeSelectedTab={(e, v) => setSelectedTab(v)}/>
                <Content selected={selectedTab}/>
            </div>
        </ThemeProvider>
    </>
  )
}