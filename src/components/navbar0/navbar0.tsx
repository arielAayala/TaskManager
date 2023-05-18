import React, { useState } from "react";
import style from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineBars3} from "react-icons/hi2"
import Logo from "../../../public/Logo.png";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import CommentRoundedIcon from "@mui/icons-material/CommentRounded"
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded"

const Navbar0 = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const menuOptions = [
        {
            text :"Home",
            icon:<HomeIcon/>
        },
        {
            text :"Acerca De",
            icon:<InfoIcon/>
        },
        {
            text :"Comentarios",
            icon:<CommentRoundedIcon/>
        },
        {
            text :"Contactenos",
            icon:<PhoneRoundedIcon/>
        },
    ]
    
    return <nav>
        <div className="navbar-logo-container">
            <Image src={Logo} alt=""/>
            </div>
        <div className="navbar-links-container">
            <Link href=""> Home </Link>
            <Link href=""> Acerca De </Link>
            <Link href=""> Comentarios </Link>
            <Link href=""> Contactenos </Link>
            <button className="primary-button"> Haga su consulta </button>
        </div>
        <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={()=> setOpenMenu(true) }></HiOutlineBars3>
        </div>
         <Drawer open={openMenu} onClose={()=> setOpenMenu(false)} anchor="right">
            <Box sx={{ width: 250}}
            role='presentation'
            onClick={()=>setOpenMenu(false)}
            onKeyDown={()=>setOpenMenu(false)}
            >
                <List>
                    {menuOptions.map((item) => (
                    <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text}></ListItemText>
                    </ListItemButton>
                ))}
                </List>
            </Box>
         </Drawer>
    </nav>
};
export default Navbar0;